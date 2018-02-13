import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {OAuthModule} from 'angular-oauth2-oidc';

import {AppRoutingModule} from './app-routing.module';
import {ConfigurationsModule} from './configurations/configurations.module';
import {CommonsModule} from './commons/commons.module';
import {CoreModule} from './core/core.module';

import {AppComponent} from './app.component';
import {AppConfig} from './app.config';
import {AuthService, GuardService, RoleService, TokenInterceptor} from './auth';
import {ApplicationErrorHandler, ErrorService} from './error';
import {DialogComponent, ErrorDialogComponent} from './dialog';
import {TimeComponent} from './time/time.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    DialogComponent,
    TimeComponent,
  ],
  entryComponents: [ErrorDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    CommonsModule.forRoot(),
    ConfigurationsModule.forRoot(),
    CoreModule,
  ],
  providers: [
    AppConfig,
    AuthService,
    GuardService,
    RoleService,
    ErrorService,
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
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ApplicationErrorHandler},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
