import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialModule} from './material.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import {ActivityComponent} from './activity';
import {StatisticsComponent} from './statistics/statistics.component';
import {SeedDetailComponent, SeedsComponent, SeedSearchComponent, SeedService} from './seeds';
import {
  BrowserConfigDetailsComponent,
  BrowserConfigListComponent,
  BrowserConfigService
} from './configurations/browserconfig';
import {
  BrowserScriptDetailsComponent,
  BrowserscriptListComponent,
  BrowserScriptService
} from './configurations/browserscript';
import {CrawlConfigDetailsComponent, CrawlConfigListComponent, CrawlConfigService} from './configurations/crawlconfig';
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
import {
  CrawlHostGroupConfigDetailsComponent,
  CrawlHostGroupConfigListComponent,
  CrawlHostGroupConfigService
} from './configurations/crawlhostgroupconfig';


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
    CrawlConfigListComponent,
    CrawlConfigDetailsComponent,
    BrowserConfigDetailsComponent,
    BrowserConfigListComponent,
    PolitenessconfigDetailsComponent,
    PolitenessConfigListComponent,
    ScheduleSidebarComponent,
    BrowserscriptListComponent,
    BrowserScriptDetailsComponent,
    EntityDetailsComponent,
    EntityListComponent,
    LoglevelComponent,
    CrawlHostGroupConfigDetailsComponent,
    CrawlHostGroupConfigListComponent,
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
    CrawlConfigService,
    CrawlHostGroupConfigService,
    PolitenessConfigService,
    BrowserConfigService,
    DateTime,
    ErrorHandlerService,
    ScheduleService,
    EntityService,
    BrowserScriptService,
    LogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
