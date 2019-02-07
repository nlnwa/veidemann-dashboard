import {CrawlScope as CrawlScopeProto, Seed as SeedProto} from '../../../../api/config/v1/config_pb';
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
    const  entityRef = proto.getEntityRef() ? ConfigRef.fromProto(proto.getEntityRef()) : new ConfigRef({kind: Kind.CRAWLENTITY});
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

       if (equalDisabledStatus) {
         seed.disabled = compareObj.disabled;
       } else {
         seed.disabled = undefined;
       }
    //
    //   for (const seedObj of seeds) {
    //     for (const job of commonJobs) {
    //       if (seedObj.job_id.includes(job)) {
    //       } else {
    //         commonJobs.splice(commonJobs.indexOf(job), 1);
    //       }
    //     }
    //   }
    //
    //   seed.job_id = commonJobs;
    //
    //   return seed;
    return seed;
  }

  static commonCrawlJobs(configObjects: ConfigObject[]) {

  }

  static isDisabledEqual(configObjects: ConfigObject[]) {
    const compareSeed = configObjects[0].seed;
    const equalDisabledStatus = configObjects.every(function (cfg: ConfigObject) {
      return cfg.seed.disabled === compareSeed.disabled;
    });
    return equalDisabledStatus;
  }

  toProto(): SeedProto {
    const entityRef = new ConfigRef({kind: Kind.CRAWLENTITY, id: this.entityRef.id});
    const proto = new SeedProto() as any as SeedProto.AsObject;
    proto.entityRef = entityRef.toProto();
    proto.scope = this.scope.toProto();
    proto.jobRefList = this.jobRefList.map(ref => ref.toProto());
    proto.disabled = this.disabled;

    return proto as any as SeedProto;
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
