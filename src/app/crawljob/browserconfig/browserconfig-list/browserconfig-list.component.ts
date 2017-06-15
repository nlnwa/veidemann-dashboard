import { Component, OnInit } from '@angular/core';
import {CrawljobService} from "../../crawljob.service";
import {BrowserConfig} from "../../../models/BrowserConfig";

@Component({
  selector: 'browserconfig-list',
  templateUrl: './browserconfig-list.component.html',
  styleUrls: ['./browserconfig-list.component.css']
})
export class BrowserconfigListComponent implements OnInit {

  browserconfigs: BrowserConfig[];
  selectedBrowserconfig: BrowserConfig;
  constructor(private crawljobService: CrawljobService) {}

  ngOnInit() {this.crawljobService.getAllBrowserconfigs().subscribe(browserconfigs => {this.browserconfigs = browserconfigs.value})}

  private getIndexOfBrowserconfig = (browserconfigId: String) => {
    return this.browserconfigs.findIndex((browserconfig) => {
      return browserconfig.id === browserconfigId;
    });
  };

  selectBrowserconfig(browserconfig: BrowserConfig) {
    this.selectedBrowserconfig = browserconfig
  }


  createNewBrowserConfig() {
    console.log("create");
    const browserconfig: BrowserConfig = {
      user_agent: '',
      page_load_timeout_ms: '',
      sleep_after_pageload_ms: '',
      meta: {
        name: '',
        description: '',
      }
    };
    // By default, a newly-created  will have the selected state.
    this.selectBrowserconfig(browserconfig);
  }

  deleteBrowserConfig = (browserconfig: String) => {
    const idx = this.getIndexOfBrowserconfig(browserconfig);
    if (idx !== -1) {
      this.browserconfigs.splice(idx, 1);
      this.selectBrowserconfig(null);
    }
    return this.browserconfigs
  };

  addBrowserConfig = (browserconfig: BrowserConfig) => {
    console.log('add');
    this.browserconfigs.push(browserconfig);
    this.selectBrowserconfig(browserconfig);
    return this.browserconfigs;
  };

  updateBrowserConfig = (browserconfig: BrowserConfig) => {
    const idx = this.getIndexOfBrowserconfig(browserconfig.id);
    if (idx !== -1) {
      this.browserconfigs[idx] = browserconfig;
      this.selectBrowserconfig(browserconfig);
    }
    return this.browserconfigs;
  }
}
