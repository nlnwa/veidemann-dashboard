import {ModuleWithProviders, NgModule} from '@angular/core';

import {CommonsModule} from '../commons/commons.module';

import {
  CrawlConfigDetailsComponent,
  CrawlConfigPageComponent,
  CrawlConfigService
} from './crawlconfig';
import {
  BrowserScriptDetailsComponent,
  BrowserScriptPageComponent,
  BrowserScriptService
} from './browserscript';
import {SearchComponent, SearchListComponent, SearchService} from './search';
import {CrawljobDetailsComponent, CrawlJobsComponent, CrawlJobService} from './crawljobs';
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
import {EntityDetailsComponent, EntityListComponent, EntityService} from './entities';
import {LoglevelComponent, LogService} from './logs';
import {
  BrowserConfigDetailsComponent,
  BrowserConfigPageComponent,
  BrowserConfigService
} from './browserconfig';
import {SeedDetailComponent, SeedListComponent, SeedService} from './seeds';
import {
  RoleMappingDetailsComponent,
  RoleMappingListComponent,
  RoleMappingPageComponent,
  RoleMappingService
} from './rolemapping';
import {BrowserScriptDirective} from './browserscript/browserscript-details/browserscript.directive';
import {WarcStatusListComponent} from './warcstatus/warcstatus-list/warcstatus-list.component';
import {WarcStatusDetailsComponent} from './warcstatus/warcstatus-details/warcstatus-details.component';
import {WarcStatusPageComponent} from './warcstatus/warcstatus-page.component';
import {WarcStatusService} from './warcstatus/warcstatus.service';
import {DetailDirective} from './shared/detail.directive';

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
