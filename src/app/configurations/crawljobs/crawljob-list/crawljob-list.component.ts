import {Component, OnInit} from '@angular/core';
import {CrawlJobService} from '../crawljob.service';
import {CrawlJob} from '../../../commons/models/config.model';

@Component({
  selector: 'app-crawljob-list',
  templateUrl: './crawljob-list.component.html',
  styleUrls: ['./crawljob-list.component.css']
})
export class CrawlJobListComponent implements OnInit {

  crawljobs: CrawlJob[];
  selectedCrawlJob: CrawlJob;

  constructor(private crawlJobService: CrawlJobService) {}

  ngOnInit() {
    this.crawlJobService.list()
      .map(reply => reply.value)
      .subscribe(crawlJobs => this.crawljobs = crawlJobs);
  }

  onCreateNewCrawlJob() {
    const crawlJob: CrawlJob = {
      schedule_id: '',
      crawl_config_id: '',
      limits: {
        depth: 0,
        max_duration_s: '',
        max_bytes: '',
      },
      meta: {
        name: '',
        description: '',
        label: [],
      },
      disabled: false,
    };
    // By default, a newly-created  will have the selected state.
    this.onSelectCrawlJob(crawlJob);
  }

  onCrawlJobCreated(crawlJob: CrawlJob) {
    this.crawljobs.push(crawlJob);
    this.onSelectCrawlJob(crawlJob);
    return this.crawljobs;
  };

  onCrawlJobUpdated(crawlJob: CrawlJob) {
    const idx = this.getIndexOfCrawlJob(crawlJob.id);
    if (idx !== -1) {
      this.crawljobs[idx] = crawlJob;
    }
    return this.crawljobs;
  }

  onCrawlJobDeleted(crawlJob: CrawlJob) {
    const idx = this.getIndexOfCrawlJob(crawlJob.id);
    if (idx !== -1) {
      this.crawljobs.splice(idx, 1);
      this.onSelectCrawlJob(null);
    }
    return this.crawljobs;
  };

  onSelectCrawlJob(crawlJob: CrawlJob) {
    this.selectedCrawlJob = crawlJob
  }

  private getIndexOfCrawlJob(crawlJobId: String) {
    return this.crawljobs.findIndex((crawlJob) => {
      return crawlJob.id === crawlJobId;
    });
  };
}
