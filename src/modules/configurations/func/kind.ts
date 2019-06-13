import {Kind} from '../../commons/models';

import {
  BrowserConfigDetailsMultiComponent,
  BrowserScriptDetailsMultiComponent,
  CollectionDetailsComponent,
  CrawlConfigDetailsMultiComponent,
  CrawlHostGroupConfigDetailsMultiComponent,
  CrawljobDetailsMultiComponent,
  PolitenessConfigDetailsMultiComponent,
  RoleMappingDetailsMultiComponent,
  ScheduleDetailsMultiComponent,
} from '../components';

import {EntityDetailsMultiComponent} from '../../commons/components/entities/entity-details-multi/entity-details-multi.component';
import {SeedDetailMultiComponent} from '../../commons/components/seeds/seed-details-multi/seed-details-multi.component';

const pathToKindMap = {
  crawljobs: Kind.CRAWLJOB,
  schedule: Kind.CRAWLSCHEDULECONFIG,
  crawlconfig: Kind.CRAWLCONFIG,
  crawlhostgroupconfig: Kind.CRAWLHOSTGROUPCONFIG,
  browserconfig: Kind.BROWSERCONFIG,
  browserscript: Kind.BROWSERSCRIPT,
  politenessconfig: Kind.POLITENESSCONFIG,
  rolemapping: Kind.ROLEMAPPING,
  collection: Kind.COLLECTION,
  entity: Kind.CRAWLENTITY,
  seed: Kind.SEED,
};

export function componentOfKind(kind: Kind) {
  switch (kind) {
    case Kind.UNDEFINED:
    case Kind.CRAWLENTITY:
      return EntityDetailsMultiComponent;
    case Kind.SEED:
      return SeedDetailMultiComponent;
    case Kind.CRAWLJOB:
      return CrawljobDetailsMultiComponent;
    case Kind.CRAWLCONFIG:
      return CrawlConfigDetailsMultiComponent;
    case Kind.CRAWLSCHEDULECONFIG:
      return ScheduleDetailsMultiComponent;
    case Kind.BROWSERCONFIG:
      return BrowserConfigDetailsMultiComponent;
    case Kind.POLITENESSCONFIG:
      return PolitenessConfigDetailsMultiComponent;
    case Kind.BROWSERSCRIPT:
      return BrowserScriptDetailsMultiComponent;
    case Kind.CRAWLHOSTGROUPCONFIG:
      return CrawlHostGroupConfigDetailsMultiComponent;
    case Kind.ROLEMAPPING:
      return RoleMappingDetailsMultiComponent;
    case Kind.COLLECTION:
      return CollectionDetailsComponent;
  }
}

export function pathToKind(kind: string): Kind {
  return pathToKindMap[kind] || Kind.UNDEFINED;
}
