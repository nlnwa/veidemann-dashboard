import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialModule} from './material.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppConfig} from './app.config';

import {ActivityComponent} from './activity';
import {StatisticsComponent} from './statistics/statistics.component';
import {SeedDetailComponent, SeedListComponent, SeedService} from './seeds';
import {SearchComponent} from './search/search.component';
import {
  BrowserConfigDetailsComponent,
  BrowserConfigListComponent,
  BrowserConfigService
} from './configurations/browserconfig';
import {
  BrowserScriptDetailsComponent,
  BrowserScriptListComponent,
  BrowserScriptService
} from './configurations/browserscript';
import {
  CrawlConfigDetailsComponent, CrawlConfigListComponent, CrawlConfigPageComponent,
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
  CrawlHostGroupConfigDetailsComponent, CrawlHostGroupConfigListComponent,
  CrawlHostGroupConfigService
} from './configurations/crawlhostgroupconfig';
import {LabelsComponent} from './labels/labels.component';
import {SearchService} from './search-service/search.service';
import {OAuthModule} from 'angular-oauth2-oidc';
import {SnackBarService} from './snack-bar-service/snack-bar.service';
import {TokenInterceptor} from './auth/token.interceptor';
import {AuthService} from './auth/auth.service';
import {ErrorDialogComponent} from './dialog/error-dialog/error-dialog.component';
import {ErrorService} from './commons/error.service';
import {ApplicationErrorHandler} from './commons/error-handler';
import {AceEditorModule} from 'ng2-ace-editor';
import {EntityListComponent} from './entities/entity-list/entity-list.component';
import {DialogComponent} from './dialog/dialog.component';
import {CrawlJobsComponent} from './configurations/crawljobs/crawljobs-page.component';
import {ToolbarComponent} from './commons/toolbar/toolbar.component';
import {CrawlHostGroupConfigPageComponent} from './configurations/crawlhostgroupconfig/crawlhostgroupconfig-page.component';
import {PolitenessConfigPageComponent} from './configurations/politenessconfig/politenessconfig-page.component';
import {SchedulePageComponent} from './configurations/schedule/schedule-page.component';
import {SearchListComponent} from './search/search-entity-list/search-entity-list.component';
import {BrowserConfigPageComponent} from './configurations/browserconfig/browserconfig-page.component';
import {BrowserScriptPageComponent} from './configurations/browserscript/browserscript-page.component';
import {
  RoleMappingDetailsComponent,
  RoleMappingListComponent,
  RoleMappingPageComponent,
  RoleMappingService
} from './rolemapping';
import {GuardService} from './auth/guard.service';
import {RoleService} from './roles/roles.service';

@NgModule({
  declarations: [
    AppComponent,
    DocumentationComponent,
    StatisticsComponent,
    SearchComponent,
    ActivityComponent,
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
    BrowserScriptPageComponent,
    CrawlConfigPageComponent,
    RoleMappingListComponent,
    RoleMappingDetailsComponent,
    RoleMappingPageComponent,
  ],
  entryComponents: [ErrorDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    OAuthModule.forRoot(),
    AceEditorModule,
  ],
  providers: [
    AppConfig,
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: (appConfig: AppConfig) => () => appConfig.load(),
      deps: [AppConfig],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.configureAuth(),
      deps: [AuthService],
      multi: true
    },
    GuardService,
    RoleService,
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
    RoleMappingService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ApplicationErrorHandler},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
