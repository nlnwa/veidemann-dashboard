import {inject, LOCALE_ID, NgModule, provideAppInitializer} from '@angular/core';
import {OAuthModule, OAuthService, ValidationHandler} from 'angular-oauth2-oidc';
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';
import {AppInitializerService, LocaleService,} from './services';
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
    provideAppInitializer(
      ()  => {
        const appInitializerService = inject(AppInitializerService);
        return appInitializerService.init();
      }
    ),
    {provide: PureAbility, useValue: createMongoAbility()},
  ]
})
export class CoreModule {
}
