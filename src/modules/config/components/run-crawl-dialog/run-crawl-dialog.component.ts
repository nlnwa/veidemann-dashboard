import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RunCrawlReply, RunCrawlRequest} from '../../../../shared/models/controller/controller.model';
import {ConfigObject, Kind} from '../../../../shared/models/config';
import {ConfigApiService} from '../../../core/services';
import {createListRequest} from '../../func/query';

@Component({
  selector: 'app-run-crawl-dialog',
  templateUrl: './run-crawl-dialog.component.html',
  styleUrls: ['./run-crawl-dialog.component.css']
})

export class RunCrawlDialogComponent implements OnInit {
  readonly Kind = Kind;

  runCrawlReply: RunCrawlReply;
  configObject: ConfigObject;
  crawlJobs: ConfigObject[] = [];
  jobRefId: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<RunCrawlDialogComponent>,
              private configApiService: ConfigApiService) {
    this.runCrawlReply = data.runCrawlReply;
    this.configObject = data.configObject;
  }

  get kind(): Kind {
    return this.configObject.kind;
  }

  ngOnInit() {
    this.configApiService.list(createListRequest(Kind.CRAWLJOB.valueOf())).subscribe(crawlJob => {
      this.crawlJobs.push(crawlJob);
    })
  }

  onRunCrawl() {
    const runCrawlRequest = new RunCrawlRequest();
    if (this.kind === Kind.SEED) {
      runCrawlRequest.seedId = this.configObject.id;
      runCrawlRequest.jobId = this.jobRefId;
      this.dialogRef.close(runCrawlRequest);
    }
    if (this.kind === Kind.CRAWLJOB) {
      runCrawlRequest.jobId = this.configObject.id;
      this.dialogRef.close(runCrawlRequest);
    }
  }
}
