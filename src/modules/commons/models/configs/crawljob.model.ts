import {CrawlJobProto, CrawlLimitsConfigProto} from '../../../../api';
import {ConfigRef} from '../configref.model';
import {ConfigObject} from '../configobject.model';
import {Kind} from '../kind.model';

export class CrawlJob {
  scheduleRef?: ConfigRef;
  limits: CrawlLimitsConfig;
  crawlConfigRef?: ConfigRef;
  disabled: boolean;

  // constructor({
  //               scheduleRef = {
  //                 id: '',
  //                 kind: Kind.CRAWLSCHEDULECONFIG
  //               },
  //               crawlConfigRef = {
  //                 id: '',
  //                 kind: Kind.CRAWLCONFIG
  //               },
  //               disabled = false,
  //               limits = new CrawlLimitsConfig()
  //             } = {}) {
  constructor(crawlJob?: Partial<CrawlJob>) {
    if (crawlJob) {
      this.scheduleRef = new ConfigRef(crawlJob.scheduleRef || {kind: Kind.CRAWLSCHEDULECONFIG});
      this.limits = new CrawlLimitsConfig(crawlJob.limits || {});
      this.crawlConfigRef = new ConfigRef(crawlJob.crawlConfigRef || {kind: Kind.CRAWLCONFIG});
      this.disabled = crawlJob.disabled || false;
    }
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
    const crawlJob = new CrawlJob();
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

  // constructor({
  //               depth = 0,
  //               maxDurationS = 0,
  //               maxBytes = 0,
  //             } = {}) {
  constructor(crawlLimitsConfig?: Partial<CrawlLimitsConfig>) {
    if (crawlLimitsConfig) {
      this.depth = crawlLimitsConfig.depth || 0;
      this.maxDurationS = crawlLimitsConfig.maxDurationS || 0;
      this.maxBytes = crawlLimitsConfig.maxBytes || 0;
    }
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

