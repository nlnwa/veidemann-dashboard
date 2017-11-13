import {ErrorHandler, NgModule} from '@angular/core';
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
import {
  CrawlConfigDetailsComponent,
  CrawlConfigListComponent,
  CrawlConfigPageComponent,
  CrawlConfigService
} from './configurations/crawlconfig';
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
import {EntityDetailsComponent, EntityService} from './entities';
import {DocumentationComponent} from './documentation/documentation.component';
import {
  CrawlHostGroupConfigDetailsComponent,
  CrawlHostGroupConfigListComponent,
  CrawlHostGroupConfigService
} from './configurations/crawlhostgroupconfig';
import {LabelsComponent} from './labels/labels.component';
import {SearchService} from './search-service/search.service';
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
import {ErrorDialogComponent} from './dialog/error-dialog/error-dialog.component';
import {ErrorService} from './commons/error.service';
import {ApplicationErrorHandler} from './commons/error-handler';
import {AceEditorModule} from 'ng2-ace-editor';
import {SeedListComponent} from './seeds/seed-list/seed-list.component';
import {EntityListComponent} from './entities/entity-list/entity-list.component';
import {DialogComponent} from './dialog/dialog.component';
import {ToolbarComponent} from './commons/toolbar/toolbar.component';
import {CrawlHostGroupConfigPageComponent} from './configurations/crawlhostgroupconfig/crawlhostgroupconfig-page.component';
import {PolitenessConfigPageComponent} from './configurations/politenessconfig/politenessconfig-page.component';
import {SchedulePageComponent} from './configurations/schedule/schedule-page.component';
import {BrowserConfigPageComponent} from './configurations/browserconfig/browserconfig-page.component';
import {CrawlJobsComponent} from './configurations/crawljobs/crawljobs-page.component';
import {SearchListComponent} from './search/search-entity-list/search-entity-list.component';


@NgModule({
  declarations: [
    AppComponent,
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
    ErrorDialogComponent,
    DialogComponent,
    SeedListComponent,
    EntityListComponent,
    ToolbarComponent,
    CrawlHostGroupConfigPageComponent,
    PolitenessConfigPageComponent,
    SchedulePageComponent,
    SearchListComponent,
    BrowserConfigPageComponent,
    CrawlConfigPageComponent,
    CrawlJobsComponent,
  ],
  entryComponents: [ErrorDialogComponent],
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
    AceEditorModule,
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
    ScheduleService,
    EntityService,
    BrowserScriptService,
    LogService,
    SnackBarService,
    ErrorService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ApplicationErrorHandler},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
