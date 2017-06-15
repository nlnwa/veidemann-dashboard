import { TestBed, inject } from '@angular/core/testing';

import { CrawljobService } from './crawljob.service';

describe('CrawljobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrawljobService]
    });
  });

  it('should ...', inject([CrawljobService], (service: CrawljobService) => {
    expect(service).toBeTruthy();
  }));
});
