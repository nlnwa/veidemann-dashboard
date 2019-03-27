import {APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';

import localeNbExtra from '@angular/common/locales/extra/nb';
import localeNb from '@angular/common/locales/nb';

import {OAuthModule} from 'angular-oauth2-oidc';
import {CommonsModule} from '../commons/commons.module';
import {AuthService, GuardService, RoleService, TokenInterceptor} from './services/auth';

import {AppConfigService, ApplicationErrorHandler, BackendService, ErrorService, SnackBarService} from './services';

registerLocaleData(localeNb, 'nb', localeNbExtra);

@NgModule({
  imports: [
    CommonsModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    BackendService,
    AppConfigService,
    AuthService,
    GuardService,
    RoleService,
    ErrorService,
    SnackBarService,
    {
      provide: APP_INITIALIZER,
      useFactory: (appConfig: AppConfigService, authService: AuthService) => () => appConfig.load(authService),
      deps: [AppConfigService, AuthService],
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ApplicationErrorHandler},
    {provide: LOCALE_ID, useValue: 'nb'}
  ]
})
export class CoreModule {
}
