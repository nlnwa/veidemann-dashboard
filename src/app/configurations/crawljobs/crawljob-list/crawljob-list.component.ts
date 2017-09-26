import {Component, OnInit} from '@angular/core';
import {CrawlJob} from '../crawljob.model';
import {CrawlJobService} from '../crawljob.service';

@Component({
  selector: 'app-crawljob-list',
  templateUrl: './crawljob-list.component.html',
  styleUrls: ['./crawljob-list.component.css']
})
export class CrawlJobListComponent implements OnInit {

  crawljobs: CrawlJob[];
  selectedCrawlJob: CrawlJob;

  constructor(private crawlJobService: CrawlJobService) {
  }

  ngOnInit() {
    this.crawlJobService.list()
      .map(reply => reply.value)
      .subscribe(crawlJobs => this.crawljobs = crawlJobs);
  }

  private getIndexOfCrawlJob = (crawlJobId: String) => {
    return this.crawljobs.findIndex((crawlJob) => {
      return crawlJob.id === crawlJobId;
    });
  };

  selectCrawlJob(crawlJob: CrawlJob) {
    this.selectedCrawlJob = crawlJob
  }

  createNewCrawlJob() {
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
    };
    // By default, a newly-created  will have the selected state.
    this.selectCrawlJob(crawlJob);
  }

  deleteCrawlJob = (crawlJobId: String) => {
    const idx = this.getIndexOfCrawlJob(crawlJobId);
    if (idx !== -1) {
      this.crawljobs.splice(idx, 1);
      this.selectCrawlJob(null);
    }
    return this.crawljobs;
  };

  addCrawlJob = (crawlJob: CrawlJob) => {
    this.crawljobs.push(crawlJob);
    this.selectCrawlJob(crawlJob);
    return this.crawljobs;
  };

  updateCrawlJob = (crawlJob: CrawlJob) => {
    const idx = this.getIndexOfCrawlJob(crawlJob.id);
    if (idx !== -1) {
      this.crawljobs[idx] = crawlJob;
      this.selectCrawlJob(crawlJob);
    }
    return this.crawljobs;
  }
}
