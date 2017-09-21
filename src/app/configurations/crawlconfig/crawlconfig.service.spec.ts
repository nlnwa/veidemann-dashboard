import {inject, TestBed} from '@angular/core/testing';
import {CrawlconfigService} from './crawlconfig.service';

describe('CrawlconfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrawlconfigService]
    });
  });

  it('should ...', inject([CrawlconfigService], (service: CrawlconfigService) => {
    expect(service).toBeTruthy();
  }));
});
