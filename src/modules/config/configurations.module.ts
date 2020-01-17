import {NgModule} from '@angular/core';

import {CommonsModule} from '../commons/commons.module';
import {LogResolver, OptionsResolver} from './services';
import {ConfigurationsRoutingModule} from './routing/configurations-routing.module';
import {ConfigurationsComponent, LoglevelComponent} from './containers';
import {
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
  CrawlHostGroupConfigDetailsComponent,
  CrawlHostGroupConfigDetailsMultiComponent,
  CrawlJobDetailsComponent,
  CrawlJobDetailsMultiComponent,
  DeleteDialogComponent,
  DeleteMultiDialogComponent,
  DetailComponent,
  DetailMultiComponent,
  EntityDetailsComponent,
  EntityDetailsMultiComponent,
  EntityViewComponent,
  LabelComponent,
  MetaComponent,
  PolitenessConfigDetailsComponent,
  PolitenessConfigDetailsMultiComponent,
  RoleMappingDetailsComponent,
  RoleMappingDetailsMultiComponent,
  RoleMappingListComponent,
  ScheduleDetailsComponent,
  ScheduleDetailsMultiComponent,
  SeedDetailComponent,
  SeedDetailMultiComponent,
  SeedMetaComponent,
  SelectorComponent
} from './components';
import {JobStatusComponent} from './components/job-execution-status/job-status.component';
import {JobExecutionStatePipe} from './pipe/job-execution-state.pipe';
import {JobExecutionStatusPipe} from './pipe/job-execution-status.pipe';
import {CrawlExecutionStatusComponent} from './components/crawl-execution-status/crawl-execution-status.component';
import {CrawlExecutionStatusPipe} from './pipe/crawl-execution-status.pipe';
import {CrawlConfigNamePipe} from './pipe/crawl-config-name.pipe';
import {CrawlScheduleNamePipe} from './pipe/crawl-schedule-name.pipe';
import {CollectionNamePipe} from './pipe/collection.name.pipe';


@NgModule({
  declarations: [
    ConfigurationsComponent,
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
    LoglevelComponent,
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
    DetailComponent,
    DetailMultiComponent,
    ConfigListComponent,
    LabelComponent,
    SelectorComponent,
    MetaComponent,
    SeedMetaComponent,
    EntityDetailsComponent,
    EntityDetailsMultiComponent,
    SeedDetailComponent,
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
  ],
  entryComponents: [
    DeleteMultiDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonsModule,
    ConfigurationsRoutingModule,
  ],
  providers: [
    OptionsResolver,
    LogResolver,
  ]
})
export class ConfigurationsModule {
}
