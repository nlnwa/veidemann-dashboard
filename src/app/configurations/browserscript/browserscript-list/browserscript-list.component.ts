import {Component, OnInit} from '@angular/core';
import {Browserscript} from '../browserscript';
import {BrowserscriptService} from '../browserscript.service';

@Component({
  selector: 'app-browserscript-list',
  templateUrl: './browserscript-list.component.html',
  styleUrls: ['./browserscript-list.component.css']
})
export class BrowserscriptListComponent implements OnInit {

  browserscripts: Browserscript[];
  selectedBrowserscript: Browserscript;

  constructor(private browserscriptService: BrowserscriptService) {
  }

  ngOnInit() {
    this.browserscriptService.getAllBrowserscripts().subscribe(browserscripts => {
      this.browserscripts = browserscripts.value
    })
  }

  private getIndexOfBrowserscript = (browserscriptId: String) => {
    return this.browserscripts.findIndex((browserscript) => {
      return browserscript.id === browserscriptId;
    });
  };

  selectBrowserscript(browserscript: Browserscript) {
    this.selectedBrowserscript = browserscript
  }

  deleteBrowserscript = (browserscriptId: String) => {
    const idx = this.getIndexOfBrowserscript(browserscriptId);
    if (idx !== -1) {
      this.browserscripts.splice(idx, 1);
      this.selectBrowserscript(null);
    }
    return this.browserscripts
  };

  createNewBrowserscript() {
    const browserscript: Browserscript = {
      script: '',
      meta: {
        name: '',
        description: '',
        label: [],
      }
    };
    // By default, a newly-created  will have the selected state.
    this.selectBrowserscript(browserscript);
  }

  addBrowserscript = (browserscript: Browserscript) => {
    this.browserscripts.push(browserscript);
    this.selectBrowserscript(browserscript);
    return this.browserscripts;
  };

  updateBrowserscript = (browserscript: Browserscript) => {
    const idx = this.getIndexOfBrowserscript(browserscript.id);
    if (idx !== -1) {
      this.browserscripts[idx] = browserscript;
      this.selectBrowserscript(browserscript);
    }
    return this.browserscripts;
  }
}
