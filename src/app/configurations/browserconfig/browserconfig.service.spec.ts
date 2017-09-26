import {inject, TestBed} from '@angular/core/testing';
import {BrowserConfigService} from './browserconfig.service';

describe('BrowserConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserConfigService]
    });
  });

  it('should ...', inject([BrowserConfigService], (service: BrowserConfigService) => {
    expect(service).toBeTruthy();
  }));
});
