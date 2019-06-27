import {TestBed} from '@angular/core/testing';

import {SearchConfigurationService} from './search-configuration.service';
import {SearchDataService, SeedDataService} from './data';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreTestingModule} from '../../core/core.testing.module';

describe('SearchConfigurationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      CoreTestingModule.forRoot()
    ],
    providers: [
      SearchConfigurationService,
      {
        provide: SearchDataService,
        useValue: {}
      },
      {
        provide: SeedDataService,
        useValue: {}
      }
    ]
  }));

  it('should be created', () => {
    const service: SearchConfigurationService = TestBed.get(SearchConfigurationService);
    expect(service).toBeTruthy();
  });
});
