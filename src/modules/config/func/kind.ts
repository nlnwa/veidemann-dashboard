import {ConfigObject, Kind} from '../../../shared/models';
import {EntityDialogComponent} from '../components';
import {SeedDialogComponent} from '../components/seed/seed-dialog/seed-dialog.component';
import {ComponentType} from '@angular/cdk/overlay';
import {ConfigOptions} from './options';

export interface ConfigDialogData {
  configObject: ConfigObject;
  options: ConfigOptions;
}

export function dialogByKind(kind: Kind): ComponentType<any> {
  switch (kind) {
    case Kind.CRAWLENTITY:
      return EntityDialogComponent;
    case Kind.SEED:
      return SeedDialogComponent;
    case Kind.UNDEFINED:
    case Kind.CRAWLJOB:
    case Kind.CRAWLCONFIG:
    case Kind.CRAWLSCHEDULECONFIG:
    case Kind.BROWSERCONFIG:
    case Kind.POLITENESSCONFIG:
    case Kind.BROWSERSCRIPT:
    case Kind.CRAWLHOSTGROUPCONFIG:
    case Kind.ROLEMAPPING:
    case Kind.COLLECTION:
      return null;
  }
}

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
