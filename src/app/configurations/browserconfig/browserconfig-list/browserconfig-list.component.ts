import {Component, OnInit} from '@angular/core';
import {BrowserConfig} from '../browserconfig.model';
import {BrowserConfigService} from '../browserconfig.service';

@Component({
  selector: 'app-browserconfig-list',
  templateUrl: './browserconfig-list.component.html',
  styleUrls: ['./browserconfig-list.component.css']
})
export class BrowserConfigListComponent implements OnInit {

  browserConfigs: BrowserConfig[];
  selectedBrowserConfig: BrowserConfig;

  constructor(private browserConfigService: BrowserConfigService) {
  }

  ngOnInit() {
    this.browserConfigService.list()
      .map(reply => reply.value)
      .subscribe(browserConfigs => this.browserConfigs = browserConfigs);
  }

  private getIndexOfBrowserConfig = (browserConfigId: String) => {
    return this.browserConfigs.findIndex((browserconfig) => {
      return browserconfig.id === browserConfigId;
    });
  };

  selectBrowserConfig(browserConfig: BrowserConfig) {
    this.selectedBrowserConfig = browserConfig
  }


  createNewBrowserConfig() {
    const browserConfig: BrowserConfig = {
      user_agent: '',
      page_load_timeout_ms: '',
      sleep_after_pageload_ms: '',
      script_selector: null,
      meta: {
        name: '',
        description: '',
        label: [],
      }
    };
    // By default, a newly-created  will have the selected state.
    this.selectBrowserConfig(browserConfig);
  }

  deleteBrowserConfig = (responseId: String) => {
    const idx = this.getIndexOfBrowserConfig(responseId);
    if (idx !== -1) {
      this.browserConfigs.splice(idx, 1);
      this.selectBrowserConfig(null);
    }
    return this.browserConfigs
  };

  addBrowserConfig = (browserConfig: BrowserConfig) => {
    this.browserConfigs.push(browserConfig);
    this.selectBrowserConfig(browserConfig);
    return this.browserConfigs;
  };

  updateBrowserConfig = (browserConfig: BrowserConfig) => {
    const idx = this.getIndexOfBrowserConfig(browserConfig.id);
    if (idx !== -1) {
      this.browserConfigs[idx] = browserConfig;
      this.selectBrowserConfig(browserConfig);
    }
    return this.browserConfigs;
  }
}
