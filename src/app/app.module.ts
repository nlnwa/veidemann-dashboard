import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

import {DocumentationComponent} from './documentation';
import {ActivityComponent} from './activity';
import {CrawlersComponent} from './crawlers';
import {StatisticsComponent, StatisticsService} from './statistics';
import {SeedDetailComponent, SeedsComponent, SeedSearchComponent, SeedService} from './seeds';
import {
  BrowserconfigDetailsComponent,
  BrowserconfigListComponent,
  BrowserconfigService
} from './configurations/browserconfig';
import {
  BrowserscriptDetailsComponent,
  BrowserscriptListComponent,
  BrowserscriptService
} from './configurations/browserscript';
import {CrawlconfigDetailsComponent, CrawlconfigListComponent, CrawlconfigService} from './configurations/crawlconfig';
import {CrawljobDetailsComponent, CrawljobListComponent, CrawljobService} from './configurations/crawljobs';
import {
  PolitenessconfigDetailsComponent,
  PolitenessconfigListComponent,
  PolitenessconfigService
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


@NgModule({
  declarations: [
    AppComponent,
    DocumentationComponent,
    StatisticsComponent,
    SeedSearchComponent,
    ActivityComponent,
    SeedsComponent,
    CrawlersComponent,
    SeedDetailComponent,
    CrawljobDetailsComponent,
    CrawljobListComponent,
    ScheduleListComponent,
    ScheduleDetailsComponent,
    CrawlconfigListComponent,
    CrawlconfigDetailsComponent,
    BrowserconfigDetailsComponent,
    BrowserconfigListComponent,
    PolitenessconfigDetailsComponent,
    PolitenessconfigListComponent,
    ScheduleSidebarComponent,
    BrowserscriptListComponent,
    BrowserscriptDetailsComponent,
    EntityDetailsComponent,
    EntityListComponent,
    LoglevelComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    AngularMultiSelectModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [
    StatisticsService,
    SeedService,
    CrawljobService,
    CrawlconfigService,
    PolitenessconfigService,
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
