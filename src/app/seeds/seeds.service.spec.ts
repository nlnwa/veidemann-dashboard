import { TestBed, inject } from '@angular/core/testing';

import { SeedsService } from './seeds.service';

describe('SeedsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeedsService]
    });
  });

  it('should ...', inject([SeedsService], (service: SeedsService) => {
    expect(service).toBeTruthy();
  }));
});
