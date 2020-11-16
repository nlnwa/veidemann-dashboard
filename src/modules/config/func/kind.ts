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
import {EntityMultiDialogComponent} from '../components/entity/entity-multi-dialog/entity-multi-dialog.component';
import {SeedMultiDialogComponent} from '../components/seed/seed-multi-dialog/seed-multi-dialog.component';
import {CrawlJobMultiDialogComponent} from '../components/crawljobs/crawljob-multi-dialog/crawljobs-multi-dialog.component';
import {CrawlConfigMultiDialogComponent} from '../components/crawlconfig/crawlconfig-multi-dialog/crawlconfig-multi-dialog.component';
import {BrowserScriptMultiDialogComponent} from '../components/browserscript/browserscript-multi-dialog/browserscript-multi-dialog.component';
import {PolitenessConfigMultiDialogComponent} from '../components/politenessconfig/politenessconfig-multi-dialog/politenessconfig-multi-dialog.component';
import {CrawlHostGroupConfigMultiDialogComponent} from '../components/crawlhostgroupconfig/crawlhostgroupconfig-multi-dialog/crawlhostgroupconfig-multi-dialog.component';
import {ScheduleMultiDialogComponent} from '../components/schedule/schedule-multi-dialog/schedule-multi-dialog.component';
import {BrowserConfigMultiDialogComponent} from '../components/browserconfig/browserconfig-multi-dialog/browserconfig-multi-dialog.component';
import {RoleMappingMultiDialogComponent} from '../components/rolemapping/rolemapping-multi-dialog/rolemapping-multi-dialog.component';

export interface ConfigDialogData {
  configObject: ConfigObject;
  options: ConfigOptions;
  allSelected: boolean;
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

export function multiDialogByKind(kind: Kind): ComponentType<any> {
  switch (kind) {
    case Kind.CRAWLENTITY:
      return EntityMultiDialogComponent;
    case Kind.SEED:
      return SeedMultiDialogComponent;
    case Kind.CRAWLJOB:
      return CrawlJobMultiDialogComponent;
    case Kind.CRAWLSCHEDULECONFIG:
      return ScheduleMultiDialogComponent;
    case Kind.CRAWLCONFIG:
      return CrawlConfigMultiDialogComponent;
    case Kind.BROWSERCONFIG:
      return BrowserConfigMultiDialogComponent;
    case Kind.BROWSERSCRIPT:
      return BrowserScriptMultiDialogComponent;
    case Kind.POLITENESSCONFIG:
      return PolitenessConfigMultiDialogComponent;
    case Kind.CRAWLHOSTGROUPCONFIG:
      return CrawlHostGroupConfigMultiDialogComponent;
    case Kind.ROLEMAPPING:
      return RoleMappingMultiDialogComponent;
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
