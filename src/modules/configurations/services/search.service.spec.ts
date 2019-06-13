import { TestBed } from '@angular/core/testing';

import { SearchConfigurationService } from './search-configuration.service';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchConfigurationService = TestBed.get(SearchConfigurationService);
    expect(service).toBeTruthy();
  });
});
