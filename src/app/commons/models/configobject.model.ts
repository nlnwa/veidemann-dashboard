import {ConfigObject as ConfigObjectProto} from '../../../api/config/v1/config_pb';
import {intersectLabel} from '../group-update/labels/common-labels';

import {Collection} from './collection/collection.model';
import {CrawlEntity} from './configs/crawlentity.model';
import {Seed} from './configs/seed.model';
import {CrawlJob} from './configs/crawljob.model';
import {CrawlConfig} from './configs/crawlconfig.model';
import {CrawlScheduleConfig} from './configs/crawlscheduleconfig.model';
import {BrowserConfig} from './configs/browserconfig.model';
import {PolitenessConfig} from './configs/politenessconfig.model';
import {BrowserScript} from './configs/browserscript.model';
import {CrawlHostGroupConfig} from './configs/crawlhostgroupconfig.model';
import {RoleMapping} from './configs/rolemapping.model';
import {Kind} from './kind.model';
import {Meta} from './meta/meta.model';


export class ConfigObject {
  id?: string;
  apiversion: string;
  kind: Kind;
  meta: Meta;
  crawlEntity?: CrawlEntity;
  seed?: Seed;
  crawlJob?: CrawlJob;
  crawlConfig?: CrawlConfig;
  crawlScheduleConfig?: CrawlScheduleConfig;
  browserConfig?: BrowserConfig;
  politenessConfig?: PolitenessConfig;
  browserScript?: BrowserScript;
  crawlHostGroupConfig?: CrawlHostGroupConfig;
  roleMapping?: RoleMapping;
  collection: Collection;

  constructor({
                id = '',
                apiversion = 'v1',
                kind = Kind.UNDEFINED,
                meta = new Meta(),
              } = {}) {
    this.id = id;
    this.apiversion = apiversion;
    this.kind = kind;
    this.meta = meta;
    switch (kind) {
      case Kind.UNDEFINED:
        break;
      case Kind.CRAWLENTITY:
        this.crawlEntity = new CrawlEntity();
        break;
      case Kind.SEED:
        this.seed = new Seed();
        break;
      case Kind.CRAWLJOB:
        this.crawlJob = new CrawlJob();
        break;
      case Kind.CRAWLCONFIG:
        this.crawlConfig = new CrawlConfig();
        break;
      case Kind.CRAWLSCHEDULECONFIG:
        this.crawlScheduleConfig = new CrawlScheduleConfig();
        break;
      case Kind.BROWSERCONFIG:
        this.browserConfig = new BrowserConfig();
        break;
      case Kind.POLITENESSCONFIG:
        this.politenessConfig = new PolitenessConfig();
        break;
      case Kind.BROWSERSCRIPT:
        this.browserScript = new BrowserScript();
        break;
      case Kind.CRAWLHOSTGROUPCONFIG:
        this.crawlHostGroupConfig = new CrawlHostGroupConfig();
        break;
      case Kind.ROLEMAPPING:
        this.roleMapping = new RoleMapping();
        break;
      case Kind.COLLECTION:
        this.collection = new Collection();
        break;
    }
  }

  static fromProto(proto: ConfigObjectProto): ConfigObject {

    const config = new ConfigObject();
    config.id = proto.getId();
    config.apiversion = proto.getApiversion();
    config.kind = proto.getKind().valueOf();
    config.meta = Meta.fromProto(proto.getMeta());

    if (proto.getCrawlEntity()) {
      config.crawlEntity = CrawlEntity.fromProto(proto.getCrawlEntity());

    } else if (proto.getSeed()) {
      config.seed = Seed.fromProto(proto.getSeed());

    } else if (proto.getCrawlJob()) {
      config.crawlJob = CrawlJob.fromProto(proto.getCrawlJob());

    } else if (proto.getCrawlConfig()) {
      config.crawlConfig = CrawlConfig.fromProto(proto.getCrawlConfig());

    } else if (proto.getCrawlScheduleConfig()) {
      config.crawlScheduleConfig = CrawlScheduleConfig.fromProto(proto.getCrawlScheduleConfig());

    } else if (proto.getBrowserConfig()) {
      config.browserConfig = BrowserConfig.fromProto(proto.getBrowserConfig());

    } else if (proto.getPolitenessConfig()) {
      config.politenessConfig = PolitenessConfig.fromProto(proto.getPolitenessConfig());

    } else if (proto.getBrowserScript()) {
      config.browserScript = BrowserScript.fromProto(proto.getBrowserScript());

    } else if (proto.getCrawlHostGroupConfig()) {
      config.crawlHostGroupConfig = CrawlHostGroupConfig.fromProto(proto.getCrawlHostGroupConfig());

    } else if (proto.getRoleMapping()) {
      config.roleMapping = RoleMapping.fromProto(proto.getRoleMapping());
    } else if (proto.getCollection()) {
      config.collection = Collection.fromProto(proto.getCollection());
    }
    return config;
  }

  static mergeConfigs(configs: ConfigObject[]): ConfigObject {
    const configObject = new ConfigObject();
    configObject.meta = new Meta();

    // Please validators
    configObject.id = '123456';
    configObject.meta.name = 'update';

    configObject.meta.labelList = ConfigObject.mergeLabels(configs);

    const kind: Kind = configs[0].kind;

    switch (kind) {
      case Kind.UNDEFINED:
        break;
      case Kind.CRAWLENTITY:
        configObject.crawlEntity = CrawlEntity.mergeConfigs(configs);
        return configObject;
        break;
      case Kind.SEED:
        configObject.seed = Seed.mergeConfigs(configs);
        return configObject;
        break;
      case Kind.CRAWLJOB:
        configObject.crawlJob = CrawlJob.mergeConfigs(configs);
        return configObject;
        break;
      case Kind.CRAWLCONFIG:
        configObject.crawlConfig = CrawlConfig.mergeConfigs(configs);
        return configObject;
        break;
      case Kind.CRAWLSCHEDULECONFIG:
        configObject.crawlScheduleConfig = CrawlScheduleConfig.mergeConfigs(configs);
        return configObject;
        break;
      case Kind.BROWSERCONFIG:
        configObject.browserConfig = BrowserConfig.mergeConfigs(configs);
        return configObject;
        break;
      case Kind.POLITENESSCONFIG:
        configObject.politenessConfig = PolitenessConfig.mergeConfigs(configs);
        return configObject;
        break;
      case Kind.BROWSERSCRIPT:
        configObject.browserScript =  BrowserScript.mergeConfigs(configs);
        return configObject;
        break;
      case Kind.CRAWLHOSTGROUPCONFIG:
        configObject.crawlHostGroupConfig = CrawlHostGroupConfig.mergeConfigs(configs);
        return configObject;
        break;
      case Kind.ROLEMAPPING:
        configObject.roleMapping = RoleMapping.mergeConfigs(configs);
        return configObject;
        break;
      case Kind.COLLECTION:
        break;
    }
    return null;
  }

  static mergeLabels(configs: ConfigObject[]): any {
    const configObject = new ConfigObject();
    const label = configs.reduce((acc: ConfigObject, curr: ConfigObject) => {
      configObject.meta.labelList = intersectLabel(acc.meta.labelList, curr.meta.labelList);
      return configObject;
    });
    return configObject.meta.labelList;
  }

  toProto(): ConfigObjectProto {
    const proto = new ConfigObjectProto();
    proto.setApiversion('v1');
    proto.setId(this.id);
    proto.setMeta(this.meta.toProto());
    proto.setKind(this.kind.valueOf());

    if (this.crawlEntity) {
      proto.setCrawlEntity(this.crawlEntity.toProto());

    } else if (this.seed) {
      proto.setSeed(this.seed.toProto());

    } else if (this.crawlJob) {
      proto.setCrawlJob(this.crawlJob.toProto());

    } else if (this.crawlConfig) {
      proto.setCrawlConfig(this.crawlConfig.toProto());

    } else if (this.crawlScheduleConfig) {
      proto.setCrawlScheduleConfig(this.crawlScheduleConfig.toProto());

    } else if (this.browserConfig) {
      proto.setBrowserConfig(this.browserConfig.toProto());

    } else if (this.politenessConfig) {
      proto.setPolitenessConfig(this.politenessConfig.toProto());

    } else if (this.browserScript) {
      proto.setBrowserScript(this.browserScript.toProto());

    } else if (this.crawlHostGroupConfig) {
      proto.setCrawlHostGroupConfig(this.crawlHostGroupConfig.toProto());

    } else if (this.roleMapping) {
      proto.setRoleMapping(this.roleMapping.toProto());

    } else if (this.collection) {
      proto.setCollection(this.collection.toProto());
    }

    return proto;
  }

}



