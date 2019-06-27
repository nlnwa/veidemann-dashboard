import {APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';

import localeNbExtra from '@angular/common/locales/extra/nb';
import localeNb from '@angular/common/locales/nb';

import {JwksValidationHandler, OAuthModule, OAuthService, ValidationHandler} from 'angular-oauth2-oidc';
import {CommonsModule} from '../commons/commons.module';

import {
  AppConfigService,
  ApplicationErrorHandler,
  AuthService,
  BackendService,
  ErrorService,
  GuardService,
  SnackBarService,
  TokenInterceptor
} from './services';
import {AppInitializerService} from './services/app.initializer.service';

registerLocaleData(localeNb, 'nb', localeNbExtra);

export function appInitializerFactory(appInitializerService: AppInitializerService,
                                      appConfigService: AppConfigService,
                                      oAuthService: OAuthService,
                                      authService: AuthService) {
  return () => appInitializerService.init(appConfigService, oAuthService, authService);
}

@NgModule({
  imports: [
    CommonsModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    AppInitializerService,
    BackendService,
    AppConfigService,
    AuthService,
    GuardService,
    AuthService,
    ErrorService,
    SnackBarService,
    {provide: ValidationHandler, useClass: JwksValidationHandler},
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [AppInitializerService, AppConfigService, OAuthService, AuthService],
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ApplicationErrorHandler},
    {provide: LOCALE_ID, useValue: 'nb'}
  ]
})
export class CoreModule {
}
