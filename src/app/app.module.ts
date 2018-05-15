import {LOCALE_ID, APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
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
import {registerLocaleData} from '@angular/common';

import localeNb from '@angular/common/locales/nb';
import localeNbExtra from '@angular/common/locales/extra/nb';

registerLocaleData(localeNb, 'nb', localeNbExtra);

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
      useFactory: (appConfig: AppConfig, authService: AuthService) => () => appConfig.load(authService),
      deps: [AppConfig, AuthService],
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ApplicationErrorHandler},
    {provide: LOCALE_ID, useValue: 'nb'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
