import {APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {OAuthModule, OAuthService, ValidationHandler} from 'angular-oauth2-oidc';
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';
import {
  AppInitializerService,
  ApplicationErrorHandler,
  AuthService,
  ControllerApiService,
  LocaleService,
  TokenInterceptor,
} from './services';
import {AppConfig} from './models/app-config.model';
import {Ability, PureAbility} from '@casl/ability';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';

@NgModule({
  imports: [
    OAuthModule.forRoot(),
    KeyboardShortcutsModule.forRoot(),
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useFactory: (localeService: LocaleService) => localeService.getLocale(),
      deps: [LocaleService]
    },
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

    {provide: Ability, useValue: new Ability()},
    {provide: PureAbility, useExisting: Ability},
  ]
})
export class CoreModule {
}
