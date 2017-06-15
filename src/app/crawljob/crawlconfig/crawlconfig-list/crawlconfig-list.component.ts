import { Component, OnInit } from '@angular/core';
import {CrawljobService} from "../../crawljob.service";
import {Crawlconfig} from "../../../models/crawlconfig";

@Component({
  selector: 'crawlconfig-list',
  templateUrl: './crawlconfig-list.component.html',
  styleUrls: ['./crawlconfig-list.component.css']
})
export class CrawlconfigListComponent implements OnInit {

  crawlconfigs: Crawlconfig[];
  selectedCrawlconfig: Crawlconfig;
  constructor(private crawljobService: CrawljobService) {}

  ngOnInit() {this.crawljobService.getAllCrawlconfigs().subscribe(crawlconfigs => {this.crawlconfigs = crawlconfigs.value})}

  private getIndexOfCrawlconfig = (crawlconfigId: String) => {
    return this.crawlconfigs.findIndex((crawlconfig) => {
      return crawlconfig.id === crawlconfigId;
    });
  };

  selectCrawlconfig(crawlconfig: Crawlconfig) {
    this.selectedCrawlconfig = crawlconfig;
  }

  createNewCrawlConfig() {
    console.log("create");
    const crawlconfig: Crawlconfig = {
      browser_config_id: '',
      politeness_id: '',
      minimum_dns_ttl_s: 0,
      depth_first:true,
      extra: {
        extract_text: true,
        create_snapshot: true,
      },
      meta: {
        name: '',
        description: '',
      }
    };
    // By default, a newly-created  will have the selected state.
    this.selectCrawlconfig(crawlconfig);
  }


  deleteCrawlConfig = (crawlconfig: String) => {
    const idx = this.getIndexOfCrawlconfig(crawlconfig);
    if (idx !== -1) {
      this.crawlconfigs.splice(idx, 1);
      this.selectCrawlconfig(null);
    }
    return this.crawlconfigs
  };

  addCrawlConfig = (crawlconfig: Crawlconfig) => {
    console.log('add');
    this.crawlconfigs.push(crawlconfig);
    this.selectCrawlconfig(crawlconfig);
    return this.crawlconfigs;
  };

  updateCrawlConfig = (crawlconfig: Crawlconfig) => {
    const idx = this.getIndexOfCrawlconfig(crawlconfig.id);
    if (idx !== -1) {
      this.crawlconfigs[idx] = crawlconfig;
      this.selectCrawlconfig(crawlconfig);
    }
    return this.crawlconfigs;
  }
}
