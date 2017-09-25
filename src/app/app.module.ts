import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

import {ActivityComponent} from './activity';
import {StatisticsComponent} from './statistics/statistics.component';
import {SeedDetailComponent, SeedsComponent, SeedSearchComponent, SeedService} from './seeds';
import {
  BrowserconfigDetailsComponent,
  BrowserconfigListComponent,
  BrowserconfigService
} from './configurations/browserconfig';
import {
  BrowserScriptDetailsComponent,
  BrowserscriptListComponent,
  BrowserscriptService
} from './configurations/browserscript';
import {CrawlconfigDetailsComponent, CrawlconfigListComponent, CrawlconfigService} from './configurations/crawlconfig';
import {CrawljobDetailsComponent, CrawlJobListComponent, CrawlJobService} from './configurations/crawljobs';
import {
  PolitenessconfigDetailsComponent,
  PolitenessConfigListComponent,
  PolitenessConfigService
} from './configurations/politenessconfig';
import {LoglevelComponent, LogService} from './configurations/logs/';
import {
  ScheduleDetailsComponent,
  ScheduleListComponent,
  ScheduleService,
  ScheduleSidebarComponent
} from './configurations/schedule';
import {DateTime, ErrorHandlerService} from './commons';
import {EntityDetailsComponent, EntityListComponent, EntityService} from './entities';
import {DocumentationComponent} from './documentation/documentation.component';

/*
import {
  CrawlhostgroupconfigDetailsComponent
} from './configurations/crawlhostgroupconfig/app-crawlhostgroupconfig-details/app-crawlhostgroupconfig-details.component';

import {
  CrawlhostgroupconfigListComponent
} from './configurations/crawlhostgroupconfig/crawlhostgroupconfig-list/crawlhostgroupconfig-list.component';
import {CrawlhostgroupconfigService} from './configurations/crawlhostgroupconfig/crawlhostgroupconfig.service';
*/

@NgModule({
  declarations: [
    AppComponent,
    DocumentationComponent,
    StatisticsComponent,
    SeedSearchComponent,
    ActivityComponent,
    SeedsComponent,
    SeedDetailComponent,
    CrawljobDetailsComponent,
    CrawlJobListComponent,
    ScheduleListComponent,
    ScheduleDetailsComponent,
    CrawlconfigListComponent,
    CrawlconfigDetailsComponent,
    BrowserconfigDetailsComponent,
    BrowserconfigListComponent,
    PolitenessconfigDetailsComponent,
    PolitenessConfigListComponent,
    ScheduleSidebarComponent,
    BrowserscriptListComponent,
    BrowserScriptDetailsComponent,
    EntityDetailsComponent,
    EntityListComponent,
    LoglevelComponent,
    // CrawlhostgroupconfigDetailsComponent,
    // CrawlhostgroupconfigListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMultiSelectModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [
    SeedService,
    CrawlJobService,
    CrawlconfigService,
    // CrawlhostgroupconfigService,
    PolitenessConfigService,
    BrowserconfigService,
    DateTime,
    ErrorHandlerService,
    ScheduleService,
    EntityService,
    BrowserscriptService,
    LogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
