import {Component, OnInit} from '@angular/core';
import {CrawlHostGroupConfigService} from '../crawlhostgroupconfig.service';
import {CrawlHostGroupConfig} from '../../../commons/models/config.model';


@Component({
  selector: 'app-crawlhostgroupconfig-list',
  templateUrl: './crawlhostgroupconfig-list.component.html',
  styleUrls: ['./crawlhostgroupconfig-list.component.css']
})
export class CrawlHostGroupConfigListComponent implements OnInit {

  crawlHostGroupConfigs: CrawlHostGroupConfig[];
  selectedCrawlHostGroupConfig: CrawlHostGroupConfig;

  constructor(private crawlHostGroupConfigService: CrawlHostGroupConfigService) {}

  ngOnInit() {
    this.crawlHostGroupConfigService.list()
      .map(reply => reply.value)
      .subscribe(crawlHostGroupConfigs => this.crawlHostGroupConfigs = crawlHostGroupConfigs);
  }

  onSelectCrawlHostGroupConfig(crawlHostGroupConfig: CrawlHostGroupConfig) {
    this.selectedCrawlHostGroupConfig = crawlHostGroupConfig;
  }

  onCreateNewCrawlHostGroupConfig() {
    const crawlHostGroupConfig: CrawlHostGroupConfig = {
      ip_range: [],
      meta: {
        name: '',
        description: '',
        label: [],
      }
    };
    // By default, a newly-created  will have the selected state.
    this.onSelectCrawlHostGroupConfig(crawlHostGroupConfig);
  }

  onCrawlHostGroupConfigCreated(crawlHostGroupConfig: CrawlHostGroupConfig) {
    this.crawlHostGroupConfigs.push(crawlHostGroupConfig);
    this.onSelectCrawlHostGroupConfig(crawlHostGroupConfig);
    return this.crawlHostGroupConfigs;
  };

  onCrawlHostGroupConfigUpdated(crawlHostGroupConfig: CrawlHostGroupConfig) {
    const idx = this.getIndexOfCrawlHostGroupConfig(crawlHostGroupConfig.id);
    if (idx !== -1) {
      this.crawlHostGroupConfigs[idx] = crawlHostGroupConfig;
      this.onSelectCrawlHostGroupConfig(crawlHostGroupConfig);
    }
    return this.crawlHostGroupConfigs;
  }

  onCrawlHostGroupConfigDeleted(crawlHostGroupConfig: CrawlHostGroupConfig) {
    const idx = this.getIndexOfCrawlHostGroupConfig(crawlHostGroupConfig.id);
    if (idx !== -1) {
      this.crawlHostGroupConfigs.splice(idx, 1);
      this.onSelectCrawlHostGroupConfig(null);
    }
    return this.crawlHostGroupConfigs
  };

  private getIndexOfCrawlHostGroupConfig(crawlHostGroupConfigId: String) {
    return this.crawlHostGroupConfigs.findIndex((crawlHostGroupConfig) => {
      return crawlHostGroupConfig.id === crawlHostGroupConfigId;
    });
  };
}
