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
                entityRef,
                scope,
                jobRefList = [],
                disabled = false
              }: Partial<Seed> = {}) {
    this.entityRef = entityRef ? new ConfigRef(entityRef) : null;
    this.scope = new CrawlScope(scope);
    this.jobRefList = jobRefList ? jobRefList.map(configRef => new ConfigRef(configRef)) : [];
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

  static toProto(seed: Seed): SeedProto {
    const proto = new SeedProto();
    if (seed.entityRef) {
      const entityRef = new ConfigRef({kind: Kind.CRAWLENTITY, id: seed.entityRef.id});
      proto.setEntityRef(ConfigRef.toProto(entityRef));
    }
    proto.setScope(CrawlScope.toProto(seed.scope));
    proto.setJobRefList(seed.jobRefList.map(ConfigRef.toProto));
    proto.setDisabled(seed.disabled);
    return proto;
  }

  static mergeConfigs(configObjects: ConfigObject[]): Seed {
    const seed = new Seed();
    const compareObj: Seed = configObjects[0].seed;

    const equalDisabledStatus = configObjects.every(function (cfg: ConfigObject) {
      return cfg.seed.disabled === compareObj.disabled;
    });
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
}

export class CrawlScope {
  surtPrefix: string;

  constructor({
                surtPrefix = ''
              }: Partial<CrawlScope> = {}) {
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
