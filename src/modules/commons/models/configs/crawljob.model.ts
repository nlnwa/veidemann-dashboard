import {CrawlJobProto, CrawlLimitsConfigProto} from '../../../../api';
import {ConfigRef} from '../configref.model';
import {ConfigObject} from '../configobject.model';
import {Kind} from '../kind.model';

export class CrawlJob {
  scheduleRef?: ConfigRef;
  limits: CrawlLimitsConfig;
  crawlConfigRef?: ConfigRef;
  disabled: boolean;

  constructor({
                scheduleRef,
                crawlConfigRef,
                limits,
                disabled = false
              }: Partial<CrawlJob> = {}) {
    this.scheduleRef = new ConfigRef(scheduleRef || {kind: Kind.CRAWLSCHEDULECONFIG});
    this.crawlConfigRef = new ConfigRef(crawlConfigRef || {kind: Kind.CRAWLCONFIG});
    this.limits = new CrawlLimitsConfig(limits);
    this.disabled = disabled;
  }

  static fromProto(proto: CrawlJobProto): CrawlJob {
    return new CrawlJob({
      scheduleRef: proto.getScheduleRef() ? ConfigRef.fromProto(proto.getScheduleRef()) : undefined,
      limits: CrawlLimitsConfig.fromProto(proto.getLimits()),
      crawlConfigRef: proto.getCrawlConfigRef() ? ConfigRef.fromProto(proto.getCrawlConfigRef()) : undefined,
      disabled: proto.getDisabled(),
    });
  }

  static toProto(crawlJob: CrawlJob): CrawlJobProto {
    const proto = new CrawlJobProto();
    proto.setScheduleRef(ConfigRef.toProto(crawlJob.scheduleRef));
    proto.setLimits(CrawlLimitsConfig.toProto(crawlJob.limits));
    proto.setCrawlConfigRef(ConfigRef.toProto(crawlJob.crawlConfigRef));
    proto.setDisabled(crawlJob.disabled);
    return proto;
  }

  static mergeConfigs(configObjects: ConfigObject[]): CrawlJob {
    const crawlJob = new CrawlJob({});
    const compareObj: CrawlJob = configObjects[0].crawlJob;

    const equalDisabledStatus = configObjects.every(function (cfg: ConfigObject) {
      return cfg.crawlJob.disabled === compareObj.disabled;
    });

    const equalDepth = configObjects.every(function (cfg: ConfigObject) {
      return cfg.crawlJob.limits.depth === compareObj.limits.depth;
    });

    const equalMaxDuration = configObjects.every(function (cfg: ConfigObject) {
      return cfg.crawlJob.limits.maxDurationS === compareObj.limits.maxDurationS;
    });

    const equalMaxBytes = configObjects.every(function (cfg: ConfigObject) {
      return cfg.crawlJob.limits.maxBytes === compareObj.limits.maxBytes;
    });

    const equalSchedule = configObjects.every(function (cfg: ConfigObject) {
      return cfg.crawlJob.scheduleRef.id === compareObj.scheduleRef.id;
    });


    const equalCrawlConfig = configObjects.every(function (cfg: ConfigObject) {
      return cfg.crawlJob.crawlConfigRef.id === compareObj.crawlConfigRef.id;
    });

    if (equalDisabledStatus) {
      crawlJob.disabled = compareObj.disabled;
    } else {
      crawlJob.disabled = undefined;
    }

    if (equalDepth) {
      crawlJob.limits.depth = compareObj.limits.depth;
    }

    if (equalMaxDuration) {
      crawlJob.limits.maxDurationS = compareObj.limits.maxDurationS;
    }

    if (equalMaxBytes) {
      crawlJob.limits.maxBytes = compareObj.limits.maxBytes;
    }

    crawlJob.scheduleRef = equalSchedule ? compareObj.scheduleRef : crawlJob.scheduleRef = new ConfigRef({kind: Kind.CRAWLSCHEDULECONFIG});

    crawlJob.crawlConfigRef = equalCrawlConfig ? compareObj.crawlConfigRef : new ConfigRef({kind: Kind.CRAWLCONFIG});

    return crawlJob;
  }
}

export class CrawlLimitsConfig {
  depth?: number;
  maxDurationS?: number; // int64
  maxBytes?: number; // int64

  constructor({
                depth = 0,
                maxDurationS = 0,
                maxBytes = 0,
              }: Partial<CrawlLimitsConfig> = {}) {
    this.depth = depth;
    this.maxDurationS = maxDurationS;
    this.maxBytes = maxBytes;
  }

  static fromProto(proto: CrawlLimitsConfigProto): CrawlLimitsConfig {
    return new CrawlLimitsConfig({
      depth: proto.getDepth(),
      maxDurationS: proto.getMaxDurationS(),
      maxBytes: proto.getMaxBytes()
    });
  }

  static toProto(crawlLimitsConfig): CrawlLimitsConfigProto {
    const proto = new CrawlLimitsConfigProto();
    proto.setDepth(crawlLimitsConfig.depth || 0);
    proto.setMaxDurationS(crawlLimitsConfig.maxDurationS || 0);
    proto.setMaxBytes(crawlLimitsConfig.maxBytes || 0);
    return proto;
  }
}

