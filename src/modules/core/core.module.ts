import {APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {registerLocaleData} from '@angular/common';

import localeNbExtra from '@angular/common/locales/extra/nb';
import localeNb from '@angular/common/locales/nb';

import {OAuthModule, OAuthService, ValidationHandler} from 'angular-oauth2-oidc';
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';

import {
  AppInitializerService,
  ApplicationErrorHandler,
  AuthService,
  ControllerApiService,
  TokenInterceptor,
} from './services';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {AppConfig} from './models/app-config.model';
import {Ability, PureAbility} from '@casl/ability';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';

registerLocaleData(localeNb, 'nb', localeNbExtra);

@NgModule({
  imports: [
    OAuthModule.forRoot(),
    KeyboardShortcutsModule.forRoot(),
  ],
  providers: [
    OAuthService,
    {provide: ValidationHandler, useClass: JwksValidationHandler},
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializerService: AppInitializerService) => () => appInitializerService.init(),
      deps: [AppInitializerService, AppConfig, OAuthService, ControllerApiService, AuthService],
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ApplicationErrorHandler},
    {provide: LOCALE_ID, useValue: 'nb'},
    {provide: MAT_DATE_LOCALE, useValue: 'nb-NO'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: Ability, useValue: new Ability()},
    {provide: PureAbility, useExisting: Ability},
  ]
})
export class CoreModule {
}
