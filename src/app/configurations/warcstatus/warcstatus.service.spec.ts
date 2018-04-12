import { TestBed, inject } from '@angular/core/testing';

import { WarcstatusService } from './warcstatus.service';

describe('WarcstatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarcstatusService]
    });
  });

  it('should be created', inject([WarcstatusService], (service: WarcstatusService) => {
    expect(service).toBeTruthy();
  }));
});
