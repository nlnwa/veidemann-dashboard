import {CrawlScheduleConfigProto} from '../../../../api';
import {fromTimestampProto, toTimestampProto} from '../../datetime/datetime';
import {ConfigObject} from '../configobject.model';

export class CrawlScheduleConfig {
  cronExpression: string;
  validFrom?: string;
  validTo?: string;

  constructor({
                cronExpression = '',
                validFrom = '',
                validTo = '',
              } = {}) {
    this.cronExpression = cronExpression;
    this.validFrom = validFrom;
    this.validTo = validTo;
  }

  static fromProto(proto: CrawlScheduleConfigProto): CrawlScheduleConfig {
    return new CrawlScheduleConfig({
      cronExpression: proto.getCronExpression(),
      validFrom: fromTimestampProto(proto.getValidFrom()),
      validTo: fromTimestampProto(proto.getValidTo())
    });
  }

  static mergeConfigs(configObjects: ConfigObject[]): CrawlScheduleConfig {
    const crawlScheduleConfig = new CrawlScheduleConfig();
    const compareObj: CrawlScheduleConfig = configObjects[0].crawlScheduleConfig;

    const equalValidFrom = this.commonValidFrom(configObjects);

    const equalValidTo = this.commonValidTo(configObjects);

    if (equalValidFrom) {
      crawlScheduleConfig.validFrom = compareObj.validFrom;
    } else {
      crawlScheduleConfig.validFrom = undefined;
    }

    if (equalValidTo) {
      crawlScheduleConfig.validTo = compareObj.validTo;
    } else {
      crawlScheduleConfig.validTo = undefined;
    }


    return crawlScheduleConfig;
  }

  static commonValidFrom(configObjects: ConfigObject[]): boolean {
    const compareObj = configObjects[0];
    const equalValidFrom = configObjects.every(function (cfg: ConfigObject) {
      return cfg.crawlScheduleConfig.validFrom === compareObj.crawlScheduleConfig.validFrom;
    });
    return equalValidFrom;
  }

  static commonValidTo(configObjects: ConfigObject[]): boolean {
    const compareObj = configObjects[0];
    const equalValidTo = configObjects.every(function (cfg: ConfigObject) {
      return cfg.crawlScheduleConfig.validTo === compareObj.crawlScheduleConfig.validTo;
    });
    return equalValidTo;
  }

  static toProto(crawlScheduleConfig: CrawlScheduleConfig): CrawlScheduleConfigProto {
    const proto = new CrawlScheduleConfigProto();
    proto.setCronExpression(crawlScheduleConfig.cronExpression);
    proto.setValidFrom(toTimestampProto(crawlScheduleConfig.validFrom));
    proto.setValidTo(toTimestampProto(crawlScheduleConfig.validTo));
    return proto;
  }


  static createUpdateRequest(updateTemplate: ConfigObject, paths: string[], configUpdate: ConfigObject, mergedConfig: ConfigObject, formControl: any) {
    const crawlScheduleConfig = new CrawlScheduleConfig();
    const pathList = [];

    if (mergedConfig) {
      if (formControl.validFrom.dirty) {
        if (configUpdate.crawlScheduleConfig.validFrom !== mergedConfig.crawlScheduleConfig.validFrom) {
          crawlScheduleConfig.validFrom = configUpdate.crawlScheduleConfig.validFrom;
          pathList.push('crawlScheduleConfig.validFrom');
        }
      }

      if (formControl.validTo.dirty) {
        if (configUpdate.crawlScheduleConfig.validTo !== mergedConfig.crawlScheduleConfig.validTo) {
          crawlScheduleConfig.validTo = configUpdate.crawlScheduleConfig.validTo;
          pathList.push('crawlScheduleConfig.validTo');
        }
      }

    } else {
      if (formControl.validFrom.dirty) {
        crawlScheduleConfig.validFrom = configUpdate.crawlScheduleConfig.validFrom;
        pathList.push('crawlScheduleConfig.validFrom');
      }
      if (formControl.validTo.dirty) {
        crawlScheduleConfig.validTo = configUpdate.crawlScheduleConfig.validTo;
        pathList.push('crawlScheduleConfig.validTo');
      }
    }
    return {updateTemplate: crawlScheduleConfig, pathList: pathList};
  }
}
