import {Component, OnInit} from "@angular/core";
import {CrawljobService} from "../crawljob.service";
import {Crawljob} from "../../models/crawljob";

@Component({
  selector: 'crawljob-list',
  templateUrl: './crawljob-list.component.html',
  styleUrls: ['./crawljob-list.component.css']
})
export class CrawljobListComponent implements OnInit {

  crawljobs: any = [];
  selectedCrawljob: Crawljob;

  constructor(private crawljobService: CrawljobService) {
  }

  ngOnInit() {
    this.crawljobService.getAllCrawlJobs().subscribe(crawljobs => {
      this.crawljobs = crawljobs
    })
  }

  private getIndexOfCrawljob = (crawljobId: String) => {
    return this.crawljobs.findIndex((crawljob) => {
      return crawljob.id === crawljobId;
    });
  };

  createNewCrawljob() {
    console.log("create");
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

      },
    };
    // By default, a newly-created  will have the selected state.
    this.selectCrawljob(crawljob);
  }

  selectCrawljob(crawljob: Crawljob) {
    this.selectedCrawljob = crawljob
  }

  deleteCrawljob = (crawljobId: String) => {
    const idx = this.getIndexOfCrawljob(crawljobId);
    if (idx !== -1) {
      this.crawljobs.crawljob.splice(idx, 1);
      this.selectCrawljob(null);
    }
    return this.crawljobs.crawljob;
  };

  addCrawljob = (crawljob: Crawljob) => {
    this.crawljobs.crawljob.push(crawljob);
    this.selectCrawljob(crawljob);
    return this.crawljobs.crawljob;
  };

  updateCrawljob = (crawljob: Crawljob) => {
    const idx = this.getIndexOfCrawljob(crawljob.id);
    if (idx !== -1) {
      this.crawljobs.crawljob[idx] = crawljob;
      this.selectCrawljob(crawljob);
    }
    return this.crawljobs.crawljob;
  }
}
