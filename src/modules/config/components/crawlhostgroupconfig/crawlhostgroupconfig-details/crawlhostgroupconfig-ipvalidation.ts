import {UntypedFormControl} from '@angular/forms';
import {Address4, Address6} from "ip-address";

export class CrawlHostGroupConfigIpValidation {

  static validRanges: boolean;

  static allRangesValid(): boolean {
    return this.validRanges;
  }

  /**
   * Custom validator
   */

  static ipAddressValidator(control: UntypedFormControl) {
    const ip = control.value;
    const version = CrawlHostGroupConfigIpValidation.getIpVersion(ip);
      const validIp = CrawlHostGroupConfigIpValidation.isValidIp(ip, version);
      return validIp ? null : {invalidIp: {value: control.value}};
  }

  /**
   * Checks if an IP address is a valid ipv4 or ipv6 address, using ip-address library
   */

  static isValidIp(ip: string, version: string): boolean {
    if (version === 'v6') {
      return Address6.isValid(ip)
    }
    if (version === 'v4') {
      return Address4.isValid(ip)
    }
    return false;
  }


  /**
   * Checks if the first group in the from and to address is the same.
   *
   * if the input address is ipv6 the groups gets split on ':'
   * for ipv4 groups are split on '.'
   */
  static isInRange(ipFrom: string, ipTo: string, isIpv6: boolean) {

    let ipFromArray;
    let ipToArray;

    if (isIpv6) {
      ipFromArray = ipFrom.split(':');
      ipToArray = ipTo.split(':');
      return ipFromArray[0] === ipToArray[0];
    }

    if (!isIpv6) {
      ipFromArray = ipFrom.split('.');
      ipToArray = ipTo.split('.');
      return ipFromArray[0] === ipToArray[0];
    }
  }

  /**
   * Checks if the from and to IP address is valid and that both are of the same version (ipv4 / ipv6)
   * Then it check if both addresses first groups is the same, and returns the result
   */
  static isValidRange(fromIp: string, toIp: string): boolean {
    const fromIpVersion = this.getIpVersion(fromIp);
    const toIpVersion = this.getIpVersion(toIp);

    if (fromIpVersion !== toIpVersion) {
      return false;
    }

    if (fromIpVersion === 'v6' && toIpVersion === 'v6') {
      const ipv6From = new Address6(fromIp);
      const ipv6To = new Address6(toIp);
      if (Address6.isValid(ipv6From.address) && Address6.isValid(ipv6To.address)) {
        if (this.isInRange(ipv6From.correctForm(), ipv6To.correctForm(), true)) {
          this.validRanges = true;
          return true;
        } else {
          this.validRanges = false;
          return false;
        }
      }
    }

    if (fromIpVersion === 'v4' && toIpVersion === 'v4') {
      let ipv4From;
      let ipv4To;

      try {
        ipv4From = new Address4(fromIp);
        ipv4To = new Address4(toIp);
      } catch (e) {
        return false;
      }

      if (Address4.isValid(ipv4From.address) && Address4.isValid(ipv4To.address)) {
        if (this.isInRange(ipv4From.correctForm(), ipv4To.correctForm(), false)) {
          this.validRanges = true;
          return true;
        } else {
          this.validRanges = false;
          return false;
        }
      }
    }
  }

  static getIpVersion(ip: string): string {
    if (ip.includes(':')) {
      return 'v6';
    }
    if (ip.includes('.')) {
      return 'v4';
    }
  }
}
