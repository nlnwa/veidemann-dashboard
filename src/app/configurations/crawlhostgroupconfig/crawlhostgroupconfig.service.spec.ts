import {inject, TestBed} from '@angular/core/testing';

import {CrawlHostGroupConfigService} from './crawlhostgroupconfig.service';

describe('CrawlHostGroupConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrawlHostGroupConfigService]
    });
  });

  it('should be created', inject([CrawlHostGroupConfigService], (service: CrawlHostGroupConfigService) => {
    expect(service).toBeTruthy();
  }));
});
