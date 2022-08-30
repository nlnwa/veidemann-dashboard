import {CrawlScheduleConfigProto} from '../../../api';
import {unmarshalTimestamp, marshalTimestamp} from '../../func';
import {ConfigObject} from './configobject.model';

export class CrawlScheduleConfig {
  cronExpression: string;
  validFrom?: string;
  validTo?: string;

  constructor({
                cronExpression = '',
                validFrom = '',
                validTo = '',
              }: Partial<CrawlScheduleConfig> = {}) {
    this.cronExpression = cronExpression;
    this.validFrom = validFrom;
    this.validTo = validTo;
  }

  static fromProto(proto: CrawlScheduleConfigProto): CrawlScheduleConfig {
    return new CrawlScheduleConfig({
      cronExpression: proto.getCronExpression(),
      validFrom: unmarshalTimestamp(proto.getValidFrom()),
      validTo: unmarshalTimestamp(proto.getValidTo())
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
    return configObjects.every(
      (cfg: ConfigObject) => cfg.crawlScheduleConfig.validFrom === compareObj.crawlScheduleConfig.validFrom);
  }

  static commonValidTo(configObjects: ConfigObject[]): boolean {
    const compareObj = configObjects[0];
    return configObjects.every(
      (cfg: ConfigObject) => cfg.crawlScheduleConfig.validTo === compareObj.crawlScheduleConfig.validTo);
  }

  static toProto(crawlScheduleConfig: CrawlScheduleConfig): CrawlScheduleConfigProto {
    const proto = new CrawlScheduleConfigProto();
    proto.setCronExpression(crawlScheduleConfig.cronExpression);
    proto.setValidFrom(marshalTimestamp(crawlScheduleConfig.validFrom));
    proto.setValidTo(marshalTimestamp(crawlScheduleConfig.validTo));
    return proto;
  }
}
