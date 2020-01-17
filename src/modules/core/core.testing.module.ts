import {ModuleWithProviders, NgModule} from '@angular/core';

import {AppConfigService, AuthService, ConfigApiService, ErrorService, GuardService, SnackBarService} from './services';
import {AppInitializerService} from './services/app.initializer.service';
import {of} from 'rxjs';


@NgModule()
export class CoreTestingModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreTestingModule,
      providers: [
        {
          provide: AppConfigService,
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
          provide: AppConfigService,
          useValue: {}
        },
        {
          provide: GuardService,
          useValue: {}
        },
        {
          provide: AuthService,
          useValue: {
            isAdmin: () => true,
            isCurator: () => true
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
