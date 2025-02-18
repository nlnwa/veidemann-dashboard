import {ModuleWithProviders, NgModule} from '@angular/core';

import {AuthService, ConfigApiService, ErrorService, GuardService, SnackBarService} from './services';
import {AppInitializerService} from './services/app.initializer.service';
import {of} from 'rxjs';
import {AppConfig} from './models';
import {AbilityService} from "@casl/angular";

@NgModule()
export class CoreTestingModule {
  static forRoot(): ModuleWithProviders<CoreTestingModule> {
    return {
      ngModule: CoreTestingModule,
      providers: [
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
          provide: AbilityService,
          useValue: {
            ability$: of(null)
          }
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
