import {ModuleWithProviders, NgModule} from '@angular/core';

import {CommonsModule} from '../commons/commons.module';

import {DetailDirective} from './shared/detail.directive';

import {
  ConfigurationsComponent
} from './configurations.component';
import {
  CrawlConfigDetailsComponent,
} from './crawlconfig';
import {
  BrowserScriptDetailsComponent,
  BrowserScriptDirective
} from './browserscript';
import {
  SearchComponent,
  SearchListComponent,
  SearchService
} from './search';
import {
  CrawljobDetailsComponent,
} from './crawljobs';
import {
  PolitenessconfigDetailsComponent,
} from './politenessconfig';
import {
  CrawlHostGroupConfigDetailsComponent,
} from './crawlhostgroupconfig';
import {
  ScheduleDetailsComponent,
  ScheduleSidebarComponent
} from './schedule';
import {
  EntityDetailsComponent,
 // EntityService
} from './entities';
import {
  LoglevelComponent,
  LogService
} from './logs';
import {
  BrowserConfigDetailsComponent,
} from './browserconfig';
import {
  SeedDetailComponent,
  SeedService
} from './seeds';
import {
  RoleMappingDetailsComponent,
  RoleMappingListComponent,
} from './rolemapping';
import {
  WarcStatusListComponent,
  WarcStatusDetailsComponent,
  WarcStatusPageComponent,
  WarcStatusService
} from './warcstatus';
import {
  BackendService
} from './shared/backend.service';


@NgModule({
  declarations: [
    SearchComponent,
    SeedDetailComponent,
    ConfigurationsComponent,
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
    SearchListComponent,
    BrowserScriptDirective,
    RoleMappingListComponent,
    RoleMappingDetailsComponent,
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
    SeedDetailComponent,
    EntityDetailsComponent,
    RoleMappingDetailsComponent,
  ],
  imports: [
    CommonsModule,
  ],
  exports: [
    SearchComponent,
    LoglevelComponent,
    WarcStatusPageComponent,
    ConfigurationsComponent,
  ],
})
export class ConfigurationsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ConfigurationsModule,
      providers: [
        BackendService,
        SearchService,
        SeedService,
       // EntityService,
        LogService,
        WarcStatusService,
      ],
    };
  }
}
