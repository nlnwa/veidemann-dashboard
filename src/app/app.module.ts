import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialModule} from './material.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import {ActivityComponent} from './activity';
import {StatisticsComponent} from './statistics/statistics.component';
import {SeedDetailComponent, SeedService} from './seeds';
import {SearchComponent} from './search/search.component';
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
import {EntityDetailsComponent, EntityService} from './entities';
import {DocumentationComponent} from './documentation/documentation.component';
import {
  CrawlHostGroupConfigDetailsComponent,
  CrawlHostGroupConfigListComponent,
  CrawlHostGroupConfigService
} from './configurations/crawlhostgroupconfig';
import {LabelsComponent} from './labels/labels.component';
import {SearchService} from './search-service/search.service';
import {BaseListComponent} from './base-list/base-list.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {SnackBarService} from './snack-bar-service/snack-bar.service';
/**
 * Need to import this old HttpModule because angular-oauth2-oidc use it
 * but does not import it.
 * @see https://github.com/manfredsteyer/angular-oauth2-oidc/issues/130
 */
import {HttpModule} from '@angular/http';
import {TokenInterceptor} from './auth/token.interceptor';
import {AuthService} from './auth/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    BaseListComponent,
    DocumentationComponent,
    StatisticsComponent,
    SearchComponent,
    ActivityComponent,
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
    LoglevelComponent,
    CrawlHostGroupConfigDetailsComponent,
    CrawlHostGroupConfigListComponent,
    LabelsComponent,
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
    HttpModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    AuthService,
    SearchService,
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
    SnackBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
