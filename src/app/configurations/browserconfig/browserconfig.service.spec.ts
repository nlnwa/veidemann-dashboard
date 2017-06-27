import { TestBed, inject } from '@angular/core/testing';

import { BrowserconfigService } from './browserconfig.service';

describe('BrowserconfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserconfigService]
    });
  });

  it('should ...', inject([BrowserconfigService], (service: BrowserconfigService) => {
    expect(service).toBeTruthy();
  }));
});
