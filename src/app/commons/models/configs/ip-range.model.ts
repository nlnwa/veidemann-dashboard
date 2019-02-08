import {CrawlHostGroupConfigProto} from '../../../../api';

export class IpRange {
  ipFrom: string;
  ipTo: string;

  constructor({
                ipFrom = '',
                ipTo = ''
              } = {}) {
    this.ipFrom = ipFrom;
    this.ipTo = ipTo;
  }

  static fromProto(proto: CrawlHostGroupConfigProto.IpRange): IpRange {
    return new IpRange({
      ipFrom: proto.getIpFrom(),
      ipTo: proto.getIpTo()
    });
  }

  static intersectIpRange(a: IpRange[], b: IpRange[]): IpRange[] {
    const setA = Array.from(new Set(a));
    const setB = Array.from(new Set(b));
    const intersection = new Set(setA.filter((x: IpRange) =>
      setB.find((range: IpRange) => x.ipFrom === range.ipFrom && x.ipTo === range.ipTo) !== undefined
    ));
    return Array.from(intersection) as IpRange[];
  }

  toProto(): CrawlHostGroupConfigProto.IpRange {
    const proto = new CrawlHostGroupConfigProto.IpRange();
    proto.setIpFrom(this.ipFrom);
    proto.setIpTo(this.ipTo);
    return proto;
  }
}

