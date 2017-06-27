import {Component, OnInit} from "@angular/core";
import {CrawljobService} from "../crawljob.service";
import {Crawljob} from "../../../models/crawljob";

@Component({
  selector: 'crawljob-list',
  templateUrl: './crawljob-list.component.html',
  styleUrls: ['./crawljob-list.component.css']
})
export class CrawljobListComponent implements OnInit {

  crawljobs: Crawljob[];
  selectedCrawljob: Crawljob;

  constructor(private crawljobService: CrawljobService) {
  }

  ngOnInit() {
    this.crawljobService.getAllCrawlJobs().subscribe(crawljobs => {
      this.crawljobs = crawljobs.value
    })
  }

  private getIndexOfCrawljob = (crawljobId: String) => {
    return this.crawljobs.findIndex((crawljob) => {
      return crawljob.id === crawljobId;
    });
  };

  selectCrawljob(crawljob: Crawljob) {
    this.selectedCrawljob = crawljob
  }

  createNewCrawljob() {
    const crawljob: Crawljob = {
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
    this.selectCrawljob(crawljob);
  }

  deleteCrawljob = (crawljobId: String) => {
    const idx = this.getIndexOfCrawljob(crawljobId);
    if (idx !== -1) {
      this.crawljobs.splice(idx, 1);
      this.selectCrawljob(null);
    }
    return this.crawljobs;
  };

  addCrawljob = (crawljob: Crawljob) => {
    this.crawljobs.push(crawljob);
    this.selectCrawljob(crawljob);
    return this.crawljobs;
  };

  updateCrawljob = (crawljob: Crawljob) => {
    const idx = this.getIndexOfCrawljob(crawljob.id);
    if (idx !== -1) {
      this.crawljobs[idx] = crawljob;
      this.selectCrawljob(crawljob);
    }
    return this.crawljobs;
  }
}
