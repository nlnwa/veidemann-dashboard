import {Kind} from '../../../shared/models';

export enum ConfigPath {
  'crawljobs' = Kind.CRAWLJOB,
  'schedule' = Kind.CRAWLSCHEDULECONFIG,
  'crawlconfig' = Kind.CRAWLCONFIG,
  'crawlhostgroupconfig' = Kind.CRAWLHOSTGROUPCONFIG,
  'browserconfig' = Kind.BROWSERCONFIG,
  'browserscript' = Kind.BROWSERSCRIPT,
  'politenessconfig' = Kind.POLITENESSCONFIG,
  'rolemapping' = Kind.ROLEMAPPING,
  'collection' = Kind.COLLECTION,
  'entity' = Kind.CRAWLENTITY,
  'seed' = Kind.SEED,
  null = Kind.UNDEFINED,
}
