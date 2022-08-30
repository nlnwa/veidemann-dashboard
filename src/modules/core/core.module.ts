import {APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';

import localeNbExtra from '@angular/common/locales/extra/nb';
import localeNb from '@angular/common/locales/nb';

import {OAuthModule, OAuthService, ValidationHandler} from 'angular-oauth2-oidc';
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';

import {
  AppInitializerService,
  ApplicationErrorHandler,
  AuthService,
  ConfigApiService,
  ControllerApiService,
  TokenInterceptor,
} from './services';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {AppConfig} from './models';
import {Ability, PureAbility} from '@casl/ability';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';
import {LuxonDateAdapter, MAT_LUXON_DATE_FORMATS} from '@angular/material-luxon-adapter';

registerLocaleData(localeNb, 'nb', localeNbExtra);

@NgModule({
  imports: [
    OAuthModule.forRoot(),
    KeyboardShortcutsModule.forRoot(),
  ],
  providers: [
    AuthService,
    {provide: ValidationHandler, useClass: JwksValidationHandler},
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializerService: AppInitializerService) => appInitializerService.init,
      deps: [AppInitializerService, AppConfig, OAuthService, AuthService],
      multi: true
    },
    {
      provide: ConfigApiService,
      useFactory: (appConfig: AppConfig, authService: AuthService) => new ConfigApiService(appConfig.grpcWebUrl, authService.metadata),
      deps: [AppConfig, AuthService]
    },
    {
      provide: ControllerApiService,
      useFactory: (appConfig: AppConfig, authService: AuthService) => new ControllerApiService(appConfig.grpcWebUrl, authService.metadata),
      deps: [AppConfig, AuthService]
    },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ApplicationErrorHandler},
    {provide: LOCALE_ID, useValue: 'nb-NO'},
    {provide: MAT_DATE_LOCALE, useValue: 'nb-NO'},
    {provide: DateAdapter, useClass: LuxonDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_LUXON_DATE_FORMATS},
    {provide: Ability, useValue: new Ability()},
    {provide: PureAbility, useExisting: Ability},
  ]
})
export class CoreModule {
}
