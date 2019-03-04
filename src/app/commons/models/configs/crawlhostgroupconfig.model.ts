import {CrawlHostGroupConfigProto} from '../../../../api';
import {ConfigObject} from '../configobject.model';
import {IpRange} from './ip-range.model';


export class CrawlHostGroupConfig {
  ipRangeList: IpRange[];

  constructor({ipRangeList = []} = {}) {
    this.ipRangeList = ipRangeList;
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

  static createUpdateRequest(updateTemplate: ConfigObject,
                             pathList: string[],
                             configUpdate: ConfigObject,
                             mergedConfig: ConfigObject,
                             formControl: any,
                             options): void {
    const crawlHostGroupConfig = new CrawlHostGroupConfig();
    updateTemplate.crawlHostGroupConfig = crawlHostGroupConfig;

    const {addRange} = options;

    if (mergedConfig) {
      if (configUpdate.crawlHostGroupConfig.ipRangeList !== mergedConfig.crawlHostGroupConfig.ipRangeList) {
        crawlHostGroupConfig.ipRangeList = configUpdate.crawlHostGroupConfig.ipRangeList;
        if (addRange !== undefined) {
          if (addRange) {
            pathList.push('crawlHostGroupConfig.ipRange+');
          } else {
            pathList.push('crawlHostGroupConfig.ipRange-');
          }
        }
      }
    } else {
      crawlHostGroupConfig.ipRangeList = configUpdate.crawlHostGroupConfig.ipRangeList;
      if (addRange !== undefined) {
        if (addRange) {
          pathList.push('crawlHostGroupConfig.ipRange+');
        } else {
          pathList.push('crawlHostGroupConfig.ipRange-');
        }
      }
    }
  }
}


