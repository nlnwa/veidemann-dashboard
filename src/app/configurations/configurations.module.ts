import {ModuleWithProviders, NgModule} from '@angular/core';

import {CommonsModule} from '../commons/commons.module';

import {SearchConfigComponent} from './search/search-config/search-config.component';

import {DetailDirective} from './shared/detail.directive';

import {
  CrawlConfigDetailsComponent,
  CrawlConfigPageComponent,
  CrawlConfigService
} from './crawlconfig';
import {
  BrowserScriptDetailsComponent,
  BrowserScriptPageComponent,
  BrowserScriptService,
  BrowserScriptDirective
} from './browserscript';
import {
  SearchComponent,
  SearchListComponent,
  SearchService
} from './search';
import {
  CrawljobDetailsComponent,
  CrawlJobsComponent,
  CrawlJobService
} from './crawljobs';
import {
  PolitenessconfigDetailsComponent,
  PolitenessConfigPageComponent,
  PolitenessConfigService
} from './politenessconfig';
import {
  CrawlHostGroupConfigDetailsComponent,
  CrawlHostGroupConfigPageComponent,
  CrawlHostGroupConfigService
} from './crawlhostgroupconfig';
import {
  ScheduleDetailsComponent,
  SchedulePageComponent,
  ScheduleService,
  ScheduleSidebarComponent
} from './schedule';
import {
  EntityDetailsComponent,
  EntityListComponent,
  EntityService
} from './entities';
import {
  LoglevelComponent,
  LogService
} from './logs';
import {
  BrowserConfigDetailsComponent,
  BrowserConfigPageComponent,
  BrowserConfigService
} from './browserconfig';
import {
  SeedDetailComponent,
  SeedListComponent,
  SeedService
} from './seeds';
import {
  RoleMappingDetailsComponent,
  RoleMappingListComponent,
  RoleMappingPageComponent,
  RoleMappingService
} from './rolemapping';

import {
  WarcStatusListComponent,
  WarcStatusDetailsComponent,
  WarcStatusPageComponent,
  WarcStatusService
} from './warcstatus';


@NgModule({
  declarations: [
    SearchComponent,
    SeedDetailComponent,
    CrawlJobsComponent,
    CrawljobDetailsComponent,
    ScheduleDetailsComponent,
    CrawlConfigDetailsComponent,
    BrowserConfigDetailsComponent,
    PolitenessconfigDetailsComponent,
    ScheduleSidebarComponent,
    BrowserScriptDetailsComponent,
    EntityDetailsComponent,
    LoglevelComponent,
    CrawlHostGroupConfigDetailsComponent,
    CrawlHostGroupConfigPageComponent,
    PolitenessConfigPageComponent,
    SchedulePageComponent,
    SearchListComponent,
    BrowserConfigPageComponent,
    BrowserScriptPageComponent,
    BrowserScriptDirective,
    CrawlConfigPageComponent,
    RoleMappingListComponent,
    RoleMappingDetailsComponent,
    RoleMappingPageComponent,
    SeedListComponent,
    EntityListComponent,
    WarcStatusListComponent,
    WarcStatusDetailsComponent,
    WarcStatusPageComponent,
    SearchConfigComponent,
    DetailDirective,
  ],
  entryComponents: [
    CrawlHostGroupConfigDetailsComponent,
    BrowserScriptDetailsComponent,
    BrowserConfigDetailsComponent,
    CrawlConfigDetailsComponent,
    CrawljobDetailsComponent,
    ScheduleDetailsComponent,
    PolitenessconfigDetailsComponent,
  ],
  imports: [
    CommonsModule,
  ],
  exports: [
    CrawlJobsComponent,
    SearchComponent,
    SchedulePageComponent,
    CrawlConfigPageComponent,
    CrawlHostGroupConfigPageComponent,
    BrowserConfigPageComponent,
    BrowserScriptPageComponent,
    PolitenessConfigPageComponent,
    LoglevelComponent,
    RoleMappingPageComponent,
    WarcStatusPageComponent,
  ],
})
export class ConfigurationsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ConfigurationsModule,
      providers: [
        SearchService,
        SeedService,
        CrawlJobService,
        CrawlConfigService,
        CrawlHostGroupConfigService,
        PolitenessConfigService,
        BrowserConfigService,
        ScheduleService,
        EntityService,
        BrowserScriptService,
        LogService,
        RoleMappingService,
        WarcStatusService,
      ],
    };
  }
}
