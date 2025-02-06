import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {OAuthModule, OAuthService, ValidationHandler} from 'angular-oauth2-oidc';
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';
import {AppInitializerService, AuthService, ControllerApiService, LocaleService,} from './services';
import {AppConfig} from './models/app-config.model';
import {createMongoAbility, PureAbility} from '@casl/ability';
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
    {provide: PureAbility, useValue: createMongoAbility()},
  ]
})
export class CoreModule {
}
