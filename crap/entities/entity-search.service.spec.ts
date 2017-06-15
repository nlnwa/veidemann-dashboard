import { TestBed, inject } from '@angular/core/testing';

import { EntitySearchService } from './entity-search.service';

describe('EntitySearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntitySearchService]
    });
  });

  it('should ...', inject([EntitySearchService], (service: EntitySearchService) => {
    expect(service).toBeTruthy();
  }));
});
