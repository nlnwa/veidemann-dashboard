import {Component, OnInit} from '@angular/core';
import {BrowserScriptService} from '../browserscript.service';
import {BrowserScript} from '../../../commons/models/config.model';

@Component({
  selector: 'app-browserscript-list',
  templateUrl: './browserscript-list.component.html',
  styleUrls: ['./browserscript-list.component.css']
})
export class BrowserscriptListComponent implements OnInit {

  browserScripts: BrowserScript[];
  selectedBrowserScript: BrowserScript;

  constructor(private browserScriptService: BrowserScriptService) {
  }

  ngOnInit() {
    this.browserScriptService.list()
      .map(reply => reply.value)
      .subscribe(browserScripts => this.browserScripts = browserScripts);
  }

  private getIndexOfBrowserScript = (browserScriptId: String) => {
    return this.browserScripts.findIndex((browserScript) => {
      return browserScript.id === browserScriptId;
    });
  };

  selectBrowserScript(browserScript: BrowserScript) {
    this.selectedBrowserScript = browserScript
  }

  deleteBrowserScript = (browserScriptId: String) => {
    const idx = this.getIndexOfBrowserScript(browserScriptId);
    if (idx !== -1) {
      this.browserScripts.splice(idx, 1);
      this.selectBrowserScript(null);
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
    this.selectBrowserScript(browserScript);
  }

  addBrowserScript = (browserScript: BrowserScript) => {
    this.browserScripts.push(browserScript);
    this.selectBrowserScript(browserScript);
    return this.browserScripts;
  };

  updateBrowserScript = (browserScript: BrowserScript) => {
    const idx = this.getIndexOfBrowserScript(browserScript.id);
    if (idx !== -1) {
      this.browserScripts[idx] = browserScript;
      this.selectBrowserScript(browserScript);
    }
    return this.browserScripts;
  }
}
