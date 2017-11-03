import {Component, OnInit} from '@angular/core';
import {CrawlConfigService} from '../crawlconfig.service';
import {CrawlConfig} from '../../../commons/models/config.model';

@Component({
  selector: 'app-crawlconfig-list',
  templateUrl: './crawlconfig-list.component.html',
  styleUrls: ['./crawlconfig-list.component.css']
})
export class CrawlConfigListComponent implements OnInit {

  crawlConfigs: CrawlConfig[];
  selectedCrawlConfig: CrawlConfig;

  constructor(private crawlConfigService: CrawlConfigService) {}

  ngOnInit() {
    this.crawlConfigService.list()
      .map(reply => reply.value)
      .subscribe(crawlConfigs => this.crawlConfigs = crawlConfigs);
  }

  onCreateNewCrawlConfig() {
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
    this.onSelectCrawlConfig(crawlConfig);
  }

  onCrawlConfigCreated(crawlConfig: CrawlConfig) {
    this.crawlConfigs.push(crawlConfig);
    this.onSelectCrawlConfig(crawlConfig);
    return this.crawlConfigs;
  };

  onCrawlConfigUpdated(crawlConfig: CrawlConfig) {
    const idx = this.getIndexOfCrawlConfig(crawlConfig.id);
    if (idx !== -1) {
      this.crawlConfigs[idx] = crawlConfig;
    }
    return this.crawlConfigs;
  }

  onCrawlConfigDeleted(crawlConfig: CrawlConfig) {
    const idx = this.getIndexOfCrawlConfig(crawlConfig.id);
    if (idx !== -1) {
      this.crawlConfigs.splice(idx, 1);
      this.onSelectCrawlConfig(null);
    }
    return this.crawlConfigs
  };

  onSelectCrawlConfig(crawlConfig: CrawlConfig) {
    this.selectedCrawlConfig = crawlConfig;
  }

  private getIndexOfCrawlConfig(crawlConfigId: String) {
    return this.crawlConfigs.findIndex((crawlConfig) => {
      return crawlConfig.id === crawlConfigId;
    });
  };
}
