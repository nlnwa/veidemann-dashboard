import {inject, TestBed} from '@angular/core/testing';
import {CrawlConfigService} from './crawlconfig.service';

describe('CrawlConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrawlConfigService]
    });
  });

  it('should ...', inject([CrawlConfigService], (service: CrawlConfigService) => {
    expect(service).toBeTruthy();
  }));
});
