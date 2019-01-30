import * as config_pb from '../../../../api/config/v1/config_pb';
import {ConfigObject} from '../configobject.model';
import {IpRange} from './ip-range.model';

const CrawlHostGroupConfigProto = config_pb.CrawlHostGroupConfig;

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

  toProto() {
    const proto = new CrawlHostGroupConfigProto();
    proto.setIpRangeList(this.ipRangeList.map(ipRange => ipRange.toProto()));
    return proto;
  }

  createUpdateRequest(configUpdate: ConfigObject, formControl: any, addRange: boolean, mergedConfig?: ConfigObject) {
    const crawlHostGroupConfig = new CrawlHostGroupConfig();
    const pathList = [];

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
    return {updateTemplate: crawlHostGroupConfig, pathList: pathList};
  }
}


