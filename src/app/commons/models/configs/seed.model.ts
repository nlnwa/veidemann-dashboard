import {CrawlScopeProto, SeedProto} from '../../../../api';
import {ConfigRef} from '../configref.model';
import {Kind} from '../kind.model';
import {ConfigObject} from '../configobject.model';


export class Seed {
  entityRef?: ConfigRef;
  scope: Scope;
  jobRefList?: ConfigRef[];
  disabled: boolean;

  constructor({
                entityRef = new ConfigRef({kind: Kind.CRAWLENTITY}),
                scope = new Scope(),
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
      scope: Scope.fromProto(proto.getScope()),
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

  toProto(): SeedProto {
    const proto = new SeedProto();
    const entityRef = new ConfigRef({kind: Kind.CRAWLENTITY, id: this.entityRef.id});
    proto.setEntityRef(entityRef.toProto());
    proto.setScope(this.scope.toProto());
    proto.setJobRefList(this.jobRefList.map(ref => ref.toProto()));
    proto.setDisabled(this.disabled);
    return proto;
  }

  createUpdateRequest(configUpdate: ConfigObject, formControl: any, mergedConfig?: ConfigObject, addJobRef?: boolean) {
    const seed = new Seed();
    const pathList = [];

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

      if (configUpdate.seed.disabled !== undefined) {
        seed.disabled = configUpdate.seed.disabled;
        pathList.push('seed.disabled');
      }
    } else {

      if (formControl.entityRef.dirty) {
        seed.entityRef = configUpdate.seed.entityRef;
        pathList.push('seed.entityRef');
      }

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

      if (configUpdate.seed.disabled !== undefined) {
        seed.disabled = configUpdate.seed.disabled;
      }
    }

    return {updateTemplate: seed, pathList: pathList};
  }
}

export class Scope {
  surtPrefix?: string;

  constructor({
                surtPrefix = ''
              } = {}) {
    this.surtPrefix = surtPrefix;
  }

  static fromProto(proto: CrawlScopeProto): Scope {
    return new Scope({
      surtPrefix: proto.getSurtPrefix()
    });
  }

  toProto(): CrawlScopeProto {
    const proto = new CrawlScopeProto() as any as CrawlScopeProto.AsObject;
    proto.surtPrefix = this.surtPrefix;

    return proto as any as CrawlScopeProto;
  }
}
