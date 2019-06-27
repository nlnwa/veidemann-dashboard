import {inject, TestBed} from '@angular/core/testing';

import {WarcStatusService} from './warcstatus.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('WarcStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [WarcStatusService]
    });
  });

  it('should be created', inject([WarcStatusService], (service: WarcStatusService) => {
    expect(service).toBeTruthy();
  }));
});
