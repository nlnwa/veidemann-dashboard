import {NgModule} from '@angular/core';

import {CommonsModule} from '../commons';
import {KindService, LabelService, OptionsResolver, OptionsService} from './services';
import {ConfigurationsRoutingModule} from './routing';
import {ConfigComponent, ConfigurationComponent, ConfigurationsComponent, ConfigNavListComponent} from './containers';
import {
  AnnotationComponent,
  BrowserConfigDetailsComponent,
  BrowserConfigDetailsMultiComponent,
  BrowserScriptDetailsComponent,
  BrowserScriptDetailsMultiComponent,
  BrowserScriptDirective,
  CollectionDetailsComponent,
  ConfigListComponent,
  ConfigQueryComponent,
  CrawlConfigDetailsComponent,
  CrawlConfigDetailsMultiComponent,
  CrawlExecutionStatusComponent,
  CrawlHostGroupConfigDetailsComponent,
  CrawlHostGroupConfigDetailsMultiComponent,
  CrawlJobDetailsComponent,
  CrawlJobDetailsMultiComponent,
  DeleteDialogComponent,
  DeleteMultiDialogComponent,
  DetailMultiComponent,
  DurationPickerComponent,
  EntityDetailsComponent,
  EntityDetailsMultiComponent,
  EntityDialogComponent,
  EntityViewComponent,
  FilesizeInputComponent,
  JobStatusComponent,
  LabelComponent,
  MetaComponent,
  PolitenessConfigDetailsComponent,
  PolitenessConfigDetailsMultiComponent,
  RoleMappingDetailsComponent,
  RoleMappingDetailsMultiComponent,
  RoleMappingListComponent,
  RunCrawlDialogComponent,
  RunningCrawlDialogComponent,
  ScheduleDetailsComponent,
  ScheduleDetailsMultiComponent,
  SeedDetailsComponent,
  SeedDetailMultiComponent,
  SeedMetaComponent,
  SelectorComponent,
} from './components';
import {
  BrowserConfigNamePipe,
  CollectionNamePipe,
  CrawlConfigNamePipe,
  CrawlExecutionStatusPipe,
  CrawlScheduleNamePipe,
  JobExecutionStatePipe,
  JobExecutionStatusPipe,
  PolitenessConfigNamePipe
} from './pipe';

import {ConfigService} from '../commons/services';
import {ConfigQueryDirective} from './directives';
import {SeedDialogComponent} from './components/seed/seed-dialog/seed-dialog.component';
import {PreviewComponent} from './components/preview/preview.component';
import {SeedPreviewComponent} from './components/seed/seed-preview/seed-preview.component';
import {ReportModule} from '../report/report.module';
import {ToArrayPipe} from './pipe/to-array.pipe';
import { MetaPreviewComponent } from './components/meta/meta-preview/meta-preview.component';
import { SeedMetaPreviewComponent } from './components/seed-meta/seed-meta-preview/seed-meta-preview.component';
import { CollectionPreviewComponent } from './components/collection/collection-preview/collection-preview.component';
import { CrawljobPreviewComponent } from './components/crawljobs/crawljob-preview/crawljob-preview.component';
import { SchedulePreviewComponent } from './components/schedule/schedule-preview/schedule-preview.component';
import { CrawlconfigPreviewComponent } from './components/crawlconfig/crawlconfig-preview/crawlconfig-preview.component';
import { CrawlhostgroupconfigPreviewComponent } from './components/crawlhostgroupconfig/crawlhostgroupconfig-preview/crawlhostgroupconfig-preview.component';
import { BrowserconfigPreviewComponent } from './components/browserconfig/browserconfig-preview/browserconfig-preview.component';
import { BrowserscriptPreviewComponent } from './components/browserscript/browserscript-preview/browserscript-preview.component';
import { PolitenessconfigPreviewComponent } from './components/politenessconfig/politenessconfig-preview/politenessconfig-preview.component';


@NgModule({
  declarations: [
    ConfigComponent,
    ConfigurationsComponent,
    ConfigurationComponent,
    CrawlJobDetailsComponent,
    CrawlJobDetailsMultiComponent,
    ScheduleDetailsComponent,
    ScheduleDetailsMultiComponent,
    CrawlConfigDetailsComponent,
    CrawlConfigDetailsMultiComponent,
    BrowserConfigDetailsComponent,
    BrowserConfigDetailsMultiComponent,
    PolitenessConfigDetailsComponent,
    PolitenessConfigDetailsMultiComponent,
    BrowserScriptDetailsComponent,
    BrowserScriptDetailsMultiComponent,
    CrawlHostGroupConfigDetailsComponent,
    CrawlHostGroupConfigDetailsMultiComponent,
    BrowserScriptDirective,
    RoleMappingListComponent,
    RoleMappingDetailsComponent,
    RoleMappingDetailsMultiComponent,
    CollectionDetailsComponent,
    DeleteDialogComponent,
    DeleteMultiDialogComponent,
    ConfigQueryComponent,
    DetailMultiComponent,
    ConfigListComponent,
    LabelComponent,
    SelectorComponent,
    MetaComponent,
    SeedMetaComponent,
    EntityDetailsComponent,
    EntityDetailsMultiComponent,
    SeedDetailsComponent,
    SeedDetailMultiComponent,
    EntityViewComponent,
    JobStatusComponent,
    JobExecutionStatePipe,
    JobExecutionStatusPipe,
    CrawlExecutionStatusPipe,
    CrawlConfigNamePipe,
    CrawlScheduleNamePipe,
    CollectionNamePipe,
    CrawlExecutionStatusComponent,
    DurationPickerComponent,
    BrowserConfigNamePipe,
    PolitenessConfigNamePipe,
    FilesizeInputComponent,
    AnnotationComponent,
    RunCrawlDialogComponent,
    RunningCrawlDialogComponent,
    ConfigNavListComponent,
    EntityDialogComponent,
    ConfigQueryDirective,
    SeedDialogComponent,
    PreviewComponent,
    SeedPreviewComponent,
    ToArrayPipe,
    MetaPreviewComponent,
    SeedMetaPreviewComponent,
    CollectionPreviewComponent,
    CrawljobPreviewComponent,
    SchedulePreviewComponent,
    CrawlconfigPreviewComponent,
    CrawlhostgroupconfigPreviewComponent,
    BrowserconfigPreviewComponent,
    BrowserscriptPreviewComponent,
    PolitenessconfigPreviewComponent,
  ],
  entryComponents: [
    DeleteMultiDialogComponent,
    DeleteDialogComponent,
    EntityDialogComponent,
    SeedDialogComponent,
  ],
  imports: [
    CommonsModule,
    ConfigurationsRoutingModule,
    ReportModule,
  ],
  providers: [
    OptionsResolver,
    ConfigService,
    KindService,
    OptionsService,
    LabelService
  ]
})
export class ConfigurationsModule {
}
