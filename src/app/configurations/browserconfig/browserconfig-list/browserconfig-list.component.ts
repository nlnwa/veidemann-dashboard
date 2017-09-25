import {Component, OnInit} from '@angular/core';
import {BrowserConfig} from '../browserconfig.model';
import {BrowserconfigService} from '../browserconfig.service';

@Component({
  selector: 'app-browserconfig-list',
  templateUrl: './browserconfig-list.component.html',
  styleUrls: ['./browserconfig-list.component.css']
})
export class BrowserconfigListComponent implements OnInit {

  browserconfigs: BrowserConfig[];
  selectedBrowserconfig: BrowserConfig;

  constructor(private browserConfigService: BrowserconfigService) {
  }

  ngOnInit() {
    this.browserConfigService.getAllBrowserConfigs()
      .map(reply => reply.value)
      .subscribe(browserConfigs => this.browserconfigs = browserConfigs);
  }

  private getIndexOfBrowserConfig = (browserconfigId: String) => {
    return this.browserconfigs.findIndex((browserconfig) => {
      return browserconfig.id === browserconfigId;
    });
  };

  selectBrowserconfig(browserconfig: BrowserConfig) {
    this.selectedBrowserconfig = browserconfig
  }


  createNewBrowserconfig() {
    const browserconfig: BrowserConfig = {
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
    this.selectBrowserconfig(browserconfig);
  }

  deleteBrowserconfig = (browserconfig: String) => {
    const idx = this.getIndexOfBrowserConfig(browserconfig);
    if (idx !== -1) {
      this.browserconfigs.splice(idx, 1);
      this.selectBrowserconfig(null);
    }
    return this.browserconfigs
  };

  addBrowserconfig = (browserconfig: BrowserConfig) => {
    this.browserconfigs.push(browserconfig);
    this.selectBrowserconfig(browserconfig);
    return this.browserconfigs;
  };

  updateBrowserconfig = (browserconfig: BrowserConfig) => {
    const idx = this.getIndexOfBrowserConfig(browserconfig.id);
    if (idx !== -1) {
      this.browserconfigs[idx] = browserconfig;
      this.selectBrowserconfig(browserconfig);
    }
    return this.browserconfigs;
  }
}
