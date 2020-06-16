import {Component, Inject} from '@angular/core';
import {RunCrawlReply, RunCrawlRequest} from '../../../../shared/models/controller/controller.model';
import {ConfigObject, Kind} from '../../../../shared/models/config';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-running-crawl-dialog',
  templateUrl: './running-crawl-dialog.component.html',
  styleUrls: ['./running-crawl-dialog.component.css']
})
export class RunningCrawlDialogComponent {
  readonly Kind = Kind;
  runCrawlReply: RunCrawlReply;
  configObject: ConfigObject;
  runCrawlRequest: RunCrawlRequest;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.runCrawlReply = data.runCrawlReply;
    this.configObject = data.configObject;
    this.runCrawlRequest = data.runCrawlRequest;
  }
}
