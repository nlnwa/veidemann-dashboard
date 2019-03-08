import {CrawlScopeProto, SeedProto} from '../../../../api';
import {ConfigRef} from '../configref.model';
import {Kind} from '../kind.model';
import {ConfigObject} from '../configobject.model';


export class Seed {
  entityRef?: ConfigRef;
  scope: CrawlScope;
  jobRefList?: ConfigRef[];
  disabled: boolean;

  constructor({
                entityRef = new ConfigRef({kind: Kind.CRAWLENTITY}),
                scope = new CrawlScope(),
                jobRefList = [],
                disabled = false
              } = {}) {
    this.entityRef = entityRef;
    this.scope = scope;
    this.jobRefList = jobRefList;
    this.disabled = disabled;
  }

  static fromProto(proto: SeedProto): Seed {
    const entityRef = proto.getEntityRef() ? ConfigRef.fromProto(proto.getEntityRef()) : new ConfigRef({kind: Kind.CRAWLENTITY});
    return new Seed({
      entityRef,
      scope: CrawlScope.fromProto(proto.getScope()),
      jobRefList: proto.getJobRefList().map(ref => ConfigRef.fromProto(ref)),
      disabled: proto.getDisabled()
    });
  }

  static mergeConfigs(configObjects: ConfigObject[]): Seed {
    const seed = new Seed();
    const compareObj: Seed = configObjects[0].seed;

    const equalDisabledStatus = this.isDisabledEqual(configObjects);
    const commonCrawlJobs = this.commonCrawlJobs(configObjects);

    for (const crawlJob of commonCrawlJobs) {
      const gotCrawlJob = configObjects.every(function (cfg) {
        for (const job of cfg.seed.jobRefList) {
          if (job.id === crawlJob.id) {
            return true;
          }
        }
        return false;
      });
      if (gotCrawlJob) {
        seed.jobRefList.push(crawlJob);
      }
    }

    if (equalDisabledStatus) {
      seed.disabled = compareObj.disabled;
    } else {
      seed.disabled = undefined;
    }
    return seed;
  }

  static commonCrawlJobs(configObjects: ConfigObject[]) {
    const crawlJobs = [];
    for (const config of configObjects) {
      for (const job of config.seed.jobRefList) {
        if (job) {
          crawlJobs.push(job);
        }
      }
    }
    const unique = crawlJobs.filter(function ({id}) {
      return !this.has(id) && this.add(id);
    }, new Set);
    return unique;
  }

  static isDisabledEqual(configObjects: ConfigObject[]) {
    const compareSeed = configObjects[0].seed;
    const equalDisabledStatus = configObjects.every(function (cfg: ConfigObject) {
      return cfg.seed.disabled === compareSeed.disabled;
    });
    return equalDisabledStatus;
  }

  static toProto(seed: Seed): SeedProto {
    const proto = new SeedProto();
    const entityRef = new ConfigRef({kind: Kind.CRAWLENTITY, id: seed.entityRef.id});
    proto.setEntityRef(ConfigRef.toProto(entityRef));
    proto.setScope(CrawlScope.toProto(seed.scope));
    proto.setJobRefList(seed.jobRefList.map(ConfigRef.toProto));
    proto.setDisabled(seed.disabled);
    return proto;
  }

  static createUpdateRequest(configUpdate: ConfigObject, formControl: any, mergedConfig?: ConfigObject, addJobRef?: boolean) {
    const seed = new Seed();
    const pathList = [];

    if (configUpdate.seed.disabled !== undefined) {
      seed.disabled = configUpdate.seed.disabled;
      pathList.push('seed.disabled');
    }

    if (mergedConfig) {
      if (addJobRef !== undefined) {
        if (addJobRef) {
          if (configUpdate.seed.jobRefList !== mergedConfig.seed.jobRefList) {
            seed.jobRefList = configUpdate.seed.jobRefList;
            pathList.push('seed.jobRef+');
          }
        } else {
          seed.jobRefList = configUpdate.seed.jobRefList;
          pathList.push('seed.jobRef-');
        }
      }
    } else {
      if (formControl.jobRefList.dirty) {
        if (addJobRef !== undefined) {
          seed.jobRefList = configUpdate.seed.jobRefList;
          if (addJobRef) {
            pathList.push('seed.jobRef+');
          } else {
            pathList.push('seed.jobRef-');
          }
        }
      }
    }
    return {updateTemplate: seed, pathList: pathList};
  }
}

export class CrawlScope {
  surtPrefix?: string;

  constructor({
                surtPrefix = ''
              } = {}) {
    this.surtPrefix = surtPrefix;
  }

  static fromProto(proto: CrawlScopeProto): CrawlScope {
    return new CrawlScope({
      surtPrefix: proto.getSurtPrefix()
    });
  }

  static toProto(crawlScope: CrawlScope): CrawlScopeProto {
    const proto = new CrawlScopeProto() as any as CrawlScopeProto.AsObject;
    proto.surtPrefix = crawlScope.surtPrefix;

    return proto as any as CrawlScopeProto;
  }
}
