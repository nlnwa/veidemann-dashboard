import {inject, TestBed} from '@angular/core/testing';
import {CrawlJobService} from './crawljob.service';

xdescribe('CrawlJobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrawlJobService]
    });
  });

  it('should ...', inject([CrawlJobService], (service: CrawlJobService) => {
    expect(service).toBeTruthy();
  }));
});
