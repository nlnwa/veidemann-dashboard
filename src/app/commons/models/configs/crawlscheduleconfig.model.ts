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

    const equalCronExpressionMinute = configObjects.every(function (cfg: ConfigObject) {
      const cronSplit = cfg.crawlScheduleConfig.cronExpression.split(' ');
      const compareCronSplit = compareObj.cronExpression.split(' ');
      return cronSplit[0] === compareCronSplit[0];
    });

    const equalCronExpressionHour = configObjects.every(function (cfg: ConfigObject) {
      const cronSplit = cfg.crawlScheduleConfig.cronExpression.split(' ');
      const compareCronSplit = compareObj.cronExpression.split(' ');
      return cronSplit[1] === compareCronSplit[1];
    });

    const equalCronExpressionDOM = configObjects.every(function (cfg: ConfigObject) {
      const cronSplit = cfg.crawlScheduleConfig.cronExpression.split(' ');
      const compareCronSplit = compareObj.cronExpression.split(' ');
      return cronSplit[2] === compareCronSplit[2];
    });

    const equalCronExpressionMonth = configObjects.every(function (cfg: ConfigObject) {
      const cronSplit = cfg.crawlScheduleConfig.cronExpression.split(' ');
      const compareCronSplit = compareObj.cronExpression.split(' ');
      return cronSplit[3] === compareCronSplit[3];
    });
    const equalCronExpressionDOW = configObjects.every(function (cfg: ConfigObject) {
      const cronSplit = cfg.crawlScheduleConfig.cronExpression.split(' ');
      const compareCronSplit = compareObj.cronExpression.split(' ');
      return cronSplit[4] === compareCronSplit[4];
    });

    const equalValidFrom = this.commonValidFrom(configObjects);

    const equalValidTo = this.commonValidTo(configObjects);

    const equalCron = [];
    const splittedCron = configObjects[0].crawlScheduleConfig.cronExpression.split(' ');
    if (equalCronExpressionMinute) {
      equalCron[0] = splittedCron[0];
    } else {
      equalCron[0] = '';
    }
    if (equalCronExpressionHour) {
      equalCron[1] = splittedCron[1];
    } else {
      equalCron[1] = '';
    }

    if (equalCronExpressionDOM) {
      equalCron[2] = splittedCron[2];
    } else {
      equalCron[2] = '';
    }

    if (equalCronExpressionMonth) {
      equalCron[3] = splittedCron[3];
    } else {
      equalCron[3] = '';
    }

    if (equalCronExpressionDOW) {
      equalCron[4] = splittedCron[4];
    } else {
      equalCron[4] = '';
    }

    crawlScheduleConfig.cronExpression = equalCron.join(' ');

    if (equalValidFrom) {
      crawlScheduleConfig.validFrom = compareObj.validFrom;
    } else {
      crawlScheduleConfig.validFrom = '';
    }

    if (equalValidTo) {
      crawlScheduleConfig.validTo = compareObj.validTo;
    } else {
      crawlScheduleConfig.validTo = '';
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

  toProto(): CrawlScheduleConfigProto {
    const proto = new CrawlScheduleConfigProto();
    proto.setCronExpression(this.cronExpression);
    proto.setValidFrom(toTimestampProto(this.validFrom));
    proto.setValidTo(toTimestampProto(this.validTo));
    return proto;
  }


  createUpdateRequest(configUpdate: ConfigObject, formControl: any, mergedConfig?: ConfigObject) {
    const crawlScheduleConfig = new CrawlScheduleConfig();
    const pathList = [];

    if (mergedConfig) {
      if (formControl.cronExpression.dirty) {
        if (configUpdate.crawlScheduleConfig.cronExpression !== mergedConfig.crawlScheduleConfig.cronExpression) {
          crawlScheduleConfig.cronExpression = configUpdate.crawlScheduleConfig.cronExpression;
          pathList.push('crawlScheduleConfig.cronExpression');

          // Mulig å bare oppdatere hvert enkelt cron felt og beholde verdier for configer der de ikke var like etter merge=?
        }
      }

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
      if (formControl.cronExpression.dirty) {
        crawlScheduleConfig.cronExpression = configUpdate.crawlScheduleConfig.cronExpression;
        pathList.push('crawlScheduleConfig.cronExpression');
      }

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
