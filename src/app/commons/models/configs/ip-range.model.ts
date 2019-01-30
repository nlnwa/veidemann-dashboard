import * as config_pb from '../../../../api/config/v1/config_pb';
const IpRangeProto = config_pb.CrawlHostGroupConfig['IpRange'];

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

  static fromProto(proto): IpRange {
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

  toProto() {
    const proto = new IpRangeProto();
    proto.setIpFrom(this.ipFrom);
    proto.setIpTo(this.ipTo);
    return proto;
  }
}

