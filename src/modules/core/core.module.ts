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
  ConfigService,
  ErrorService,
  GuardService,
  SnackBarService,
  TokenInterceptor,
  AppInitializerService,
  ControllerService,
} from './services';

registerLocaleData(localeNb, 'nb', localeNbExtra);

@NgModule({
  imports: [
    CommonsModule,
    OAuthModule.forRoot(),
  ],
  providers: [
    AppInitializerService,
    ControllerService,
    AuthService,
    OAuthService,
    GuardService,
    ErrorService,
    ConfigService,
    SnackBarService,
    {provide: ValidationHandler, useClass: JwksValidationHandler},
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializerService: AppInitializerService) => () => appInitializerService.init(),
      deps: [AppInitializerService, AppConfigService, OAuthService, ControllerService, AuthService],
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ApplicationErrorHandler},
    {provide: LOCALE_ID, useValue: 'nb'}
  ]
})
export class CoreModule {
}
