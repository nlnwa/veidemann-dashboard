import {Component, OnInit} from '@angular/core';
import {BrowserScript} from '../browserscript.model';
import {BrowserscriptService} from '../browserscript.service';

@Component({
  selector: 'app-browserscript-list',
  templateUrl: './browserscript-list.component.html',
  styleUrls: ['./browserscript-list.component.css']
})
export class BrowserscriptListComponent implements OnInit {

  browserScripts: BrowserScript[];
  selectedBrowserScript: BrowserScript;

  constructor(private browserScriptService: BrowserscriptService) {}

  ngOnInit() {
    this.browserScriptService.getAllBrowserScripts()
      .map(reply => reply.value)
      .subscribe(browserScripts => this.browserScripts = browserScripts);
  }

  private getIndexOfBrowserScript = (browserscriptId: String) => {
    return this.browserScripts.findIndex((browserscript) => {
      return browserscript.id === browserscriptId;
    });
  };

  selectBrowserscript(browserscript: BrowserScript) {
    this.selectedBrowserScript = browserscript
  }

  deleteBrowserScript = (browserscriptId: String) => {
    const idx = this.getIndexOfBrowserScript(browserscriptId);
    if (idx !== -1) {
      this.browserScripts.splice(idx, 1);
      this.selectBrowserscript(null);
    }
    return this.browserScripts
  };

  createNewBrowserScript() {
    const browserScript: BrowserScript = {
      script: '',
      meta: {
        name: '',
        description: '',
        label: [],
      }
    };
    // By default, a newly-created  will have the selected state.
    this.selectBrowserscript(browserScript);
  }

  addBrowserScript = (browserscript: BrowserScript) => {
    this.browserScripts.push(browserscript);
    this.selectBrowserscript(browserscript);
    return this.browserScripts;
  };

  updateBrowserScript = (browserscript: BrowserScript) => {
    const idx = this.getIndexOfBrowserScript(browserscript.id);
    if (idx !== -1) {
      this.browserScripts[idx] = browserscript;
      this.selectBrowserscript(browserscript);
    }
    return this.browserScripts;
  }
}
