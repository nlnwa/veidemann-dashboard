import {inject, TestBed} from '@angular/core/testing';
import {CrawlJobService} from './crawljob.service';

describe('CrawlJobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrawlJobService]
    });
  });

  it('should ...', inject([CrawlJobService], (service: CrawlJobService) => {
    expect(service).toBeTruthy();
  }));
});
