import {ModuleWithProviders, NgModule} from '@angular/core';

import {CommonsModule} from '../commons/commons.module';

import {CrawlConfigDetailsComponent, CrawlConfigListComponent, CrawlConfigPageComponent, CrawlConfigService} from './crawlconfig';
import {BrowserScriptDetailsComponent, BrowserScriptListComponent, BrowserScriptPageComponent, BrowserScriptService} from './browserscript';
import {SearchComponent, SearchListComponent, SearchService} from './search';
import {CrawljobDetailsComponent, CrawlJobListComponent, CrawlJobsComponent, CrawlJobService} from './crawljobs';
import {
  PolitenessconfigDetailsComponent,
  PolitenessConfigListComponent,
  PolitenessConfigPageComponent,
  PolitenessConfigService
} from './politenessconfig';
import {
  CrawlHostGroupConfigDetailsComponent,
  CrawlHostGroupConfigListComponent,
  CrawlHostGroupConfigPageComponent,
  CrawlHostGroupConfigService
} from './crawlhostgroupconfig';
import {
  ScheduleDetailsComponent,
  ScheduleListComponent,
  SchedulePageComponent,
  ScheduleService,
  ScheduleSidebarComponent
} from './schedule';
import {EntityDetailsComponent, EntityListComponent, EntityService} from './entities';
import {LoglevelComponent, LogService} from './logs';
import {BrowserConfigDetailsComponent, BrowserConfigListComponent, BrowserConfigPageComponent, BrowserConfigService} from './browserconfig';
import {SeedDetailComponent, SeedListComponent, SeedService} from './seeds';
import {RoleMappingDetailsComponent, RoleMappingListComponent, RoleMappingPageComponent, RoleMappingService} from './rolemapping';
import {BrowserScriptDirective} from './browserscript/browserscript-details/browserscript.directive';

@NgModule({
  declarations: [
    SearchComponent,
    SeedDetailComponent,
    CrawlJobsComponent,
    CrawljobDetailsComponent,
    CrawlJobListComponent,
    ScheduleListComponent,
    ScheduleDetailsComponent,
    CrawlConfigListComponent,
    CrawlConfigDetailsComponent,
    BrowserConfigDetailsComponent,
    BrowserConfigListComponent,
    PolitenessconfigDetailsComponent,
    PolitenessConfigListComponent,
    ScheduleSidebarComponent,
    BrowserScriptListComponent,
    BrowserScriptDetailsComponent,
    EntityDetailsComponent,
    LoglevelComponent,
    CrawlHostGroupConfigDetailsComponent,
    CrawlHostGroupConfigListComponent,
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
      ],
    };
  }
}
