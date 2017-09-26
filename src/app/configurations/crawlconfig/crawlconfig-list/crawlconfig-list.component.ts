import {Component, OnInit} from '@angular/core';
import {CrawlConfig} from '../crawlconfig.model';
import {CrawlConfigService} from '../crawlconfig.service';

@Component({
  selector: 'app-crawlconfig-list',
  templateUrl: './crawlconfig-list.component.html',
  styleUrls: ['./crawlconfig-list.component.css']
})
export class CrawlConfigListComponent implements OnInit {

  crawlConfigs: CrawlConfig[];
  selectedCrawlConfig: CrawlConfig;

  constructor(private crawlConfigService: CrawlConfigService) {
  }

  ngOnInit() {
    this.crawlConfigService.list()
      .map(reply => reply.value)
      .subscribe(crawlConfigs => this.crawlConfigs = crawlConfigs);
  }

  private getIndexOfCrawlConfig = (crawlConfigId: String) => {
    return this.crawlConfigs.findIndex((crawlConfig) => {
      return crawlConfig.id === crawlConfigId;
    });
  };

  selectCrawlConfig(crawlConfig: CrawlConfig) {
    this.selectedCrawlConfig = crawlConfig;
  }

  createNewCrawlConfig() {
    const crawlConfig: CrawlConfig = {
      browser_config_id: '',
      politeness_id: '',
      minimum_dns_ttl_s: null,
      depth_first: true,
      extra: {
        extract_text: true,
        create_snapshot: true,
      },
      meta: {
        name: '',
        description: '',
        label: [],
      }
    };
    // By default, a newly-created  will have the selected state.
    this.selectCrawlConfig(crawlConfig);
  }


  deleteCrawlConfig = (crawlConfig: String) => {
    const idx = this.getIndexOfCrawlConfig(crawlConfig);
    if (idx !== -1) {
      this.crawlConfigs.splice(idx, 1);
      this.selectCrawlConfig(null);
    }
    return this.crawlConfigs
  };

  addCrawlConfig = (crawlConfig: CrawlConfig) => {
    this.crawlConfigs.push(crawlConfig);
    this.selectCrawlConfig(crawlConfig);
    return this.crawlConfigs;
  };

  updateCrawlConfig = (crawlConfig: CrawlConfig) => {
    const idx = this.getIndexOfCrawlConfig(crawlConfig.id);
    if (idx !== -1) {
      this.crawlConfigs[idx] = crawlConfig;
      this.selectCrawlConfig(crawlConfig);
    }
    return this.crawlConfigs;
  }
}
