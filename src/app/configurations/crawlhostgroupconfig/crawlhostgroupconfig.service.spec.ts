import { TestBed, inject } from '@angular/core/testing';

import { CrawlhostgroupconfigService } from './crawlhostgroupconfig.service';

describe('CrawlhostgroupconfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrawlhostgroupconfigService]
    });
  });

  it('should be created', inject([CrawlhostgroupconfigService], (service: CrawlhostgroupconfigService) => {
    expect(service).toBeTruthy();
  }));
});
