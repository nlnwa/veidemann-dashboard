import {ModuleWithProviders, NgModule} from '@angular/core';

import {AuthService, ConfigApiService, ErrorService, GuardService, SnackBarService} from './services';
import {AppInitializerService} from './services/app.initializer.service';
import {of} from 'rxjs';
import {AppConfig} from './models';
import {Ability, PureAbility} from '@casl/ability';


@NgModule()
export class CoreTestingModule {
  static forRoot(): ModuleWithProviders<CoreTestingModule> {
    return {
      ngModule: CoreTestingModule,
      providers: [
        {provide: Ability, useValue: new Ability()},
        {provide: PureAbility, useExisting: Ability},
        {
          provide: AppConfig,
          useValue: {}
        },
        {
          provide: AppInitializerService,
          useValue: {}
        },
        {
          provide: ConfigApiService,
          useValue: {
            list: () => of(null)
          }
        },
        {
          provide: GuardService,
          useValue: {}
        },
        {
          provide: AuthService,
          useValue: {
            isAdmin: () => true,
            isCurator: () => true,
            canUpdate: () => true,
          }
        },
        {
          provide: ErrorService,
          useValue: {}
        },
        {
          provide: SnackBarService,
          useValue: {}
        }
      ]
    };
  }
}
