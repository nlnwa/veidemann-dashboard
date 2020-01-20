import {CrawlHostGroupConfig as CrawlHostGroupConfigProto} from '../../../api';
import {ConfigObject} from './configobject.model';
import {IpRange} from './ip-range.model';


export class CrawlHostGroupConfig {
  ipRangeList: IpRange[];

  constructor({
                ipRangeList = []
              }: Partial<CrawlHostGroupConfig> = {}) {
    this.ipRangeList = ipRangeList ? ipRangeList.map(ipRange => new IpRange(ipRange)) : [];
  }

  static fromProto(proto): CrawlHostGroupConfig {
    return new CrawlHostGroupConfig({
      ipRangeList: proto.getIpRangeList().map(ipRangeProto => new IpRange({ipFrom: ipRangeProto.getIpFrom(), ipTo: ipRangeProto.getIpTo()}))
    });
  }

  static mergeConfigs(configObjects: ConfigObject[]): CrawlHostGroupConfig {
    const crawlHostGroupConfig = new CrawlHostGroupConfig();

    crawlHostGroupConfig.ipRangeList = configObjects.reduce((acc: any[], curr: ConfigObject) => {
      if (acc.length < 1) {
        acc = [...curr.crawlHostGroupConfig.ipRangeList];
      } else {
        acc = IpRange.intersectIpRange(acc, curr.crawlHostGroupConfig.ipRangeList || []);
      }
      return acc;
    }, []);

    return crawlHostGroupConfig;
  }

  static toProto(crawlHostGroupConfig: CrawlHostGroupConfig) {
    const proto = new CrawlHostGroupConfigProto();
    proto.setIpRangeList(crawlHostGroupConfig.ipRangeList.map(ipRange => IpRange.toProto(ipRange)));
    return proto;
  }
}


