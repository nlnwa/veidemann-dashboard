import {Component, OnInit} from "@angular/core";
import {CrawljobService} from "../../crawljob.service";
import {Browserconfig} from "../../../models/browserconfig";

@Component({
  selector: 'browserconfig-list',
  templateUrl: './browserconfig-list.component.html',
  styleUrls: ['./browserconfig-list.component.css']
})
export class BrowserconfigListComponent implements OnInit {

  browserconfigs: Browserconfig[];
  selectedBrowserconfig: Browserconfig;

  constructor(private crawljobService: CrawljobService) {
  }

  ngOnInit() {
    this.crawljobService.getAllBrowserconfigs().subscribe(browserconfigs => {
      this.browserconfigs = browserconfigs.value
    })
  }

  private getIndexOfBrowserconfig = (browserconfigId: String) => {
    return this.browserconfigs.findIndex((browserconfig) => {
      return browserconfig.id === browserconfigId;
    });
  };

  selectBrowserconfig(browserconfig: Browserconfig) {
    this.selectedBrowserconfig = browserconfig
  }


  createNewBrowserconfig() {
    console.log("create");
    const browserconfig: Browserconfig = {
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

  deleteBrowserconfig = (browserconfig: String) => {
    const idx = this.getIndexOfBrowserconfig(browserconfig);
    if (idx !== -1) {
      this.browserconfigs.splice(idx, 1);
      this.selectBrowserconfig(null);
    }
    return this.browserconfigs
  };

  addBrowserconfig = (browserconfig: Browserconfig) => {
    console.log('add');
    this.browserconfigs.push(browserconfig);
    this.selectBrowserconfig(browserconfig);
    return this.browserconfigs;
  };

  updateBrowserconfig = (browserconfig: Browserconfig) => {
    const idx = this.getIndexOfBrowserconfig(browserconfig.id);
    if (idx !== -1) {
      this.browserconfigs[idx] = browserconfig;
      this.selectBrowserconfig(browserconfig);
    }
    return this.browserconfigs;
  }
}
