import {SeedProto} from '../../../api';
import {ConfigRef} from './configref.model';
import {Kind} from './kind.model';
import {CrawlScope} from './crawlscope.model';

export class Seed {
  entityRef: ConfigRef;
  scope: CrawlScope;
  jobRefList: ConfigRef[];
  disabled: boolean;

  constructor({
                entityRef,
                scope,
                jobRefList = [],
                disabled = false
              }: Partial<Seed> = {}) {
    this.entityRef = entityRef || new ConfigRef({kind: Kind.CRAWLENTITY});
    this.scope = new CrawlScope(scope);
    this.jobRefList = jobRefList ? jobRefList.map(configRef => new ConfigRef(configRef)) : [];
    this.disabled = disabled;
  }

  static fromProto(proto: SeedProto): Seed {
    return new Seed({
      entityRef: proto.getEntityRef() ? ConfigRef.fromProto(proto.getEntityRef()) : new ConfigRef({kind: Kind.CRAWLENTITY}),
      scope: CrawlScope.fromProto(proto.getScope()),
      jobRefList: proto.getJobRefList().map(ref => ConfigRef.fromProto(ref)),
      disabled: proto.getDisabled()
    });
  }

  static toProto(seed: Seed): SeedProto {
    const proto = new SeedProto();
    if (seed.entityRef && seed.entityRef.id) {
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
    const commonCrawljobs = this.commonCrawlJobRefs(seeds);

    mergedSeed.disabled = seeds.every(seed => seed.disabled === compareObj.disabled)
      ? compareObj.disabled
      : undefined;

    for (const crawlJob of commonCrawljobs) {
      const gotJob = seeds.every((cfg) =>
        cfg.jobRefList.some(jobRef => jobRef.id === crawlJob.id));
      if (gotJob) {
        mergedSeed.jobRefList.push(crawlJob);
      }
    }

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
