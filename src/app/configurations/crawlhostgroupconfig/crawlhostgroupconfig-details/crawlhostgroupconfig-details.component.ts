import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CrawlHostGroupConfig, IpRange} from '../../../commons/models/config.model';
import {VALID_IP_PATTERN} from '../../../commons/validator';
import {DateTime} from '../../../commons/datetime';
import {RoleService} from '../../../auth';
import * as ipaddress from 'ip-address';


@Component({
  selector: 'app-crawlhostgroupconfig-details',
  templateUrl: './crawlhostgroupconfig-details.component.html',
  styleUrls: ['./crawlhostgroupconfig-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlHostGroupConfigDetailsComponent implements OnChanges {

  @Input()
  crawlHostGroupConfig: CrawlHostGroupConfig;

  @Output()
  save = new EventEmitter<CrawlHostGroupConfig>();
  @Output()
  update = new EventEmitter<CrawlHostGroupConfig>();
  @Output()
  delete = new EventEmitter<CrawlHostGroupConfig>();

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  get showSave(): boolean {
    return this.crawlHostGroupConfig && !this.crawlHostGroupConfig.id
  }

  get canSave(): boolean {
    return this.form.valid;
  }

  get canUpdate() {
    return (this.form.valid && this.form.dirty);
  }

  get canRevert() {
    return this.form.dirty;
  }

  get name() {
    return this.form.get('meta.name');
  }

  get ipFromControl() {
    return this.form.get('ip_range.ip_from');
  }

  get ipToControl() {
    return this.form.get('ip_range.ip_to');
  }

  get ipRangeControlArray() {
    return <FormArray>this.form.get('ip_range');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.crawlHostGroupConfig && !changes.crawlHostGroupConfig.currentValue) {
      this.form.reset();
      return;
    }
    if (this.crawlHostGroupConfig) {
      this.updateForm();
    }
  }

  onSave() {
    this.save.emit(this.prepareSave());
  }

  onUpdate(): void {
    this.update.emit(this.prepareSave());
  }

  onDelete(): void {
    this.delete.emit(this.crawlHostGroupConfig);
  }

  onRevert() {
    this.updateForm();
  }

  onAddIpRange() {
    this.ipRangeControlArray.push(this.initIpRange());
  }

  onRemoveIpRange(i: number) {
    this.ipRangeControlArray.removeAt(i);
    this.form.markAsDirty();
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      ip_range: this.fb.array([]),
      meta: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        description: '',
        created: {value: '', disabled: true},
        created_by: {value: '', disabled: true},
        last_modified: {value: '', disabled: true},
        last_modified_by: {value: '', disabled: true},
        label: []
      }),
    });

    if (!this.canEdit) {
      this.form.disable();
    }
  }

  private updateForm() {
    const ipRangeFG: FormGroup[] = this.crawlHostGroupConfig.ip_range.map(ipRange => this.fb.group(ipRange));
    const ipRangeFGArray: FormArray = this.fb.array(ipRangeFG);
    if (this.form.disabled) {
      ipRangeFGArray.disable();
    }
    this.form.patchValue({
      id: this.crawlHostGroupConfig.id,
      meta: {
        name: this.crawlHostGroupConfig.meta.name,
        description: this.crawlHostGroupConfig.meta.description,
        created: DateTime.formatTimestamp(this.crawlHostGroupConfig.meta.created),
        created_by: this.crawlHostGroupConfig.meta.created_by,
        last_modified: DateTime.formatTimestamp(this.crawlHostGroupConfig.meta.last_modified),
        last_modified_by: this.crawlHostGroupConfig.meta.last_modified_by,
        label: this.crawlHostGroupConfig.meta.label || [],
      }
    });
    // console.log('Burde ikke være gyldig:');
    // this.validRange('192.168.1.1', '2001:cdba:0000:0000:0000:0000:3257:9652');
    //  console.log('gyldig v4: ');
    //  this.validRange('192.168.1.1', '192.168.2.10');
    //  console.log('gyldig v6: ');
    //  this.validRange('2001:db8:a1b:12f0::0', '2001:db8:0a1b:f0:0000:0000:3257:9652');

    this.form.setControl('ip_range', ipRangeFGArray);
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  private prepareSave(): CrawlHostGroupConfig {
    const formModel = this.form.value;
    const iprangeDeepCopy: IpRange[] = formModel.ip_range.map(ipRange => ({...ipRange}));
    return {
      id: this.crawlHostGroupConfig.id,
      ip_range: iprangeDeepCopy,
      meta: {
        name: formModel.meta.name,
        description: formModel.meta.description,
        label: formModel.meta.label.map(label => ({...label})),
      }
    };
  }

  private initIpRange() {
    return this.fb.group({
      // ip_from: ['', [Validators.required, Validators.pattern(VALID_IP_PATTERN)]],
      ip_from: ['', [Validators.required]],
      ip_to: ['', [Validators.required]],
      // ip_to: ['', [Validators.required, Validators.pattern(VALID_IP_PATTERN)]],
    });
  }

  private isInRange(ipFrom: string, ipTo: string, isIpv6: boolean) {

    let ipFromArray;
    let ipToArray;
    let validCounter = 0;
    console.log('isInRange: ', ipFrom, ipTo );

    if (isIpv6) {
      ipFromArray = ipFrom.split(':');
      ipToArray = ipTo.split(':');
      if (ipFromArray.length >= 4 && ipToArray.length >= 4) {
        for (let i = 0; i < 4; i++) {
          console.log('ipv6 Arrays: ', ipFromArray[i], ipToArray[i]);
          if (ipFromArray[i] === ipToArray[i]) {
            validCounter++;
          } else {
            console.log('returnerner false matcher ikke på gruppe ;' + i);
            return false;
          }
        }
        if (validCounter = 4) {
          validCounter = 0;
          console.log('isinrange v6 true')
          return true;
        }
        console.log('Har ikke rett lengde på input, returnerer false');
        return false;
      }
    }

    if (!isIpv6) {
      console.log('ipv4 arrays');
      ipFromArray = ipFrom.split('.');
      console.log('from: ', ipFromArray, 'lengde; ', ipFromArray.length);
      ipToArray = ipTo.split('.');
      console.log('from: ', ipToArray, 'lengde; ', ipToArray.length);
      if (ipFromArray.length === ipToArray.length) {
        for (let i = 0; i < 3; i++) {
          console.log('ipv4 Arrays: ', ipFromArray[i], ipToArray[i]);
          if (ipFromArray[i] === ipToArray[i]) {
            validCounter++;
            console.log(validCounter);
          } else {
            console.log('returnerner false matcher ikke på gruppe ;' + i);
            return false;
          }
        }
        if (validCounter = 3) {
          validCounter = 0;
          return true;
        }
      }
      console.log('Har ikke rett lengde på input, returnerer false');
      return false;
    }
  }

  private isValidIp(ip: string): boolean {
    const ipv6 = ipaddress.Address6;
    const ipv4 = ipaddress.Address4;

    const ipv6Addr = new ipv6(ip);
    const ipv4Addr = new ipv4(ip);

    if (ipv6Addr.isValid()) {
      console.log('gyldig v6');
      return true;

    }
    if (ipv4Addr.isValid()) {
      console.log('gyldig v4');
      return true;
    } else {
      console.log('ingen gyldig addresse');
      return false;
    }
  }

  private validRange(fromIp: string, toIp: string): boolean {
    const ipv6 = ipaddress.Address6;
    const ipv4 = ipaddress.Address4;
    const ipv6From = new ipv6(fromIp);
    const ipv6To = new ipv6(toIp);
    const ipv4From = new ipv4(fromIp);
    const ipv4To = new ipv4(toIp);

    if (ipv6From.isValid() && ipv6To.isValid()) {
      console.log('Begge er valid ipv6 addresser, kjører videre sjekk');
      if (this.isInRange(ipv6From.correctForm(), ipv6To.correctForm(), true)) {
        console.log('v6 valid');
        return true;
      } else {
        return false;
      }

    }

    if (ipv4From.isValid() && ipv4To.isValid()) {
      console.log('Begge er gyldig v4 addresser, kjør sjekk');
      if (this.isInRange(ipv4From.correctForm(), ipv4To.correctForm(), false)) {
        return true;
      } else {
        return false;
      }
    }

    if (!(ipv4From.isValid() && ipv4To.isValid()) || !(ipv6From.isValid() && ipv4To.isValid())) {
      console.log('Ikke gyldig');
      return false;
    }

  }

}
