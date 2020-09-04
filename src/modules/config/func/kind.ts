import {ConfigObject, Kind} from '../../../shared/models';
import {EntityDialogComponent} from '../components';
import {SeedDialogComponent} from '../components/seed/seed-dialog/seed-dialog.component';
import {ComponentType} from '@angular/cdk/overlay';
import {ConfigOptions} from './options';
import {BrowserConfigDialogComponent} from '../components/browserconfig/browserconfig-dialog/browserconfig-dialog.component';
import {BrowserScriptDialogComponent} from '../components/browserscript/browserscript-dialog/browserscript-dialog.component';
import {CollectionDialogComponent} from '../components/collection/collection-dialog/collection-dialog.component';
import {CrawlConfigDialogComponent} from '../components/crawlconfig/crawlconfig-dialog/crawlconfig-dialog.component';
import {CrawlHostGroupConfigDialogComponent} from '../components/crawlhostgroupconfig/crawlhostgroupconfig-dialog/crawlhostgroupconfig-dialog.component';
import {CrawlJobDialogComponent} from '../components/crawljobs/crawljob-dialog/crawljob-dialog.component';
import {PolitenessConfigDialogComponent} from '../components/politenessconfig/politenessconfig-dialog/politenessconfig-dialog.component';
import {RoleMappingDialogComponent} from '../components/rolemapping/rolemapping-dialog/rolemapping-dialog.component';
import {ScheduleDialogComponent} from '../components/schedule/schedule-dialog/schedule-dialog.component';

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
    case Kind.CRAWLJOB:
      return CrawlJobDialogComponent;
    case Kind.CRAWLCONFIG:
      return CrawlConfigDialogComponent;
    case Kind.CRAWLSCHEDULECONFIG:
      return ScheduleDialogComponent;
    case Kind.BROWSERCONFIG:
      return BrowserConfigDialogComponent;
    case Kind.POLITENESSCONFIG:
      return PolitenessConfigDialogComponent;
    case Kind.BROWSERSCRIPT:
      return BrowserScriptDialogComponent;
    case Kind.CRAWLHOSTGROUPCONFIG:
      return CrawlHostGroupConfigDialogComponent;
    case Kind.ROLEMAPPING:
      return RoleMappingDialogComponent;
    case Kind.COLLECTION:
      return CollectionDialogComponent;
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
