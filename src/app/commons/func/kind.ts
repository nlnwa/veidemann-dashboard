import {Kind} from '../models';
import {EntityDetailsComponent} from '../../configurations/entities';
import {SeedDetailComponent} from '../../configurations/seeds';
import {CrawljobDetailsComponent} from '../../configurations/crawljobs';
import {CrawlConfigDetailsComponent} from '../../configurations/crawlconfig';
import {ScheduleDetailsComponent} from '../../configurations/schedule';
import {BrowserConfigDetailsComponent} from '../../configurations/browserconfig';
import {PolitenessconfigDetailsComponent} from '../../configurations/politenessconfig';
import {BrowserScriptDetailsComponent} from '../../configurations/browserscript';
import {CrawlHostGroupConfigDetailsComponent} from '../../configurations/crawlhostgroupconfig';
import {RoleMappingDetailsComponent} from '../../configurations/rolemapping';
import {CollectionDetailsComponent} from '../../configurations/collection';

const pathToKindMap = {
  crawljobs: Kind.CRAWLJOB,
  schedule: Kind.CRAWLSCHEDULECONFIG,
  crawlconfig: Kind.CRAWLCONFIG,
  crawlhostgroupconfig: Kind.CRAWLHOSTGROUPCONFIG,
  browserconfig: Kind.BROWSERCONFIG,
  browserscript: Kind.BROWSERSCRIPT,
  politenessconfig: Kind.POLITENESSCONFIG,
  rolemapping: Kind.ROLEMAPPING,
  collection: Kind.COLLECTION
};

export function componentOfKind(kind: Kind) {
  switch (kind) {
    case Kind.UNDEFINED:
    case Kind.CRAWLENTITY:
      return EntityDetailsComponent;
    case Kind.SEED:
      return SeedDetailComponent;
    case Kind.CRAWLJOB:
      return CrawljobDetailsComponent;
    case Kind.CRAWLCONFIG:
      return CrawlConfigDetailsComponent;
    case Kind.CRAWLSCHEDULECONFIG:
      return ScheduleDetailsComponent;
    case Kind.BROWSERCONFIG:
      return BrowserConfigDetailsComponent;
    case Kind.POLITENESSCONFIG:
      return PolitenessconfigDetailsComponent;
    case Kind.BROWSERSCRIPT:
      return BrowserScriptDetailsComponent;
    case Kind.CRAWLHOSTGROUPCONFIG:
      return CrawlHostGroupConfigDetailsComponent;
    case Kind.ROLEMAPPING:
      return RoleMappingDetailsComponent;
    case Kind.COLLECTION:
      return CollectionDetailsComponent;
  }
}

export function pathToKind(kind: string) {
  return pathToKindMap[kind];
}
