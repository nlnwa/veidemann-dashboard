import {CrawlScopeProto, SeedProto} from '../../../../api';
import {ConfigRef} from '../configref.model';
import {Kind} from '../kind.model';

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

  static merge(seeds: Seed[]): Seed {
    const mergedSeed = new Seed();
    const compareObj: Seed = seeds[0];

    mergedSeed.disabled = seeds.every(seed => seed.disabled === compareObj.disabled)
      ? compareObj.disabled
      : undefined;

    mergedSeed.jobRefList = Seed.commonCrawlJobRefs(seeds);

    return mergedSeed;
  }

  static commonCrawlJobRefs(seeds: Seed[]): ConfigRef[] {
    return seeds
      .map(seed => seed.jobRefList)
      .reduce((acc, curr) => acc.concat(curr), [])
      .filter(function({id}) {
        return !this.has(id) && this.add(id);
      }, new Set());
  }
}
