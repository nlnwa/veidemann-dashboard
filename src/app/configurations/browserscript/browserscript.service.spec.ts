import { TestBed, inject } from '@angular/core/testing';

import { BrowserscriptService } from './browserscript.service';

describe('BrowserscriptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserscriptService]
    });
  });

  it('should ...', inject([BrowserscriptService], (service: BrowserscriptService) => {
    expect(service).toBeTruthy();
  }));
});
