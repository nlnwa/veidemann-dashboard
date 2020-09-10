import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ExecutionId} from '../../../../shared/models/controller/controller.model';
import {JobExecutionStatus, CrawlExecutionStatus} from '../../../../shared/models/report';
import {ConfigApiService} from '../../../core/services';
import {ConfigObject, ConfigRef, Kind} from '../../../../shared/models/config';

@Component({
  selector: 'app-abort-crawl-dialog',
  templateUrl: './abort-crawl-dialog.component.html',
  styleUrls: ['./abort-crawl-dialog.component.css']
})
export class AbortCrawlDialogComponent implements OnInit {
  readonly Kind = Kind;

  executionId: ExecutionId;
  jobExecutionStatus: JobExecutionStatus;
  crawlExecutionStatus: CrawlExecutionStatus;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<AbortCrawlDialogComponent>,
              private configApiService: ConfigApiService) {
    this.jobExecutionStatus = data.jobExecutionStatus;
    this.crawlExecutionStatus = data.crawlExecutionStatus;
  }

  ngOnInit(): void {
  }

  onAbortCrawl() {
    // const executionId = new ExecutionId();
    // if (this.jobExecutionId) {
    //   executionId.id = this.jobExecutionId;
    //   this.dialogRef.close({id: executionId, type: 'jobexecution'});
    // }
    // if (this.crawlExecutionId) {
    //   executionId.id = this.crawlExecutionId;
    //   this.dialogRef.close({id: executionId, type: 'crawlexecution'});
    // }

    const executionId = new ExecutionId();
    if (this.jobExecutionStatus) {
      executionId.id = this.jobExecutionStatus.id;
      this.dialogRef.close(executionId);
    }
    if (this.crawlExecutionStatus) {
      executionId.id = this.crawlExecutionStatus.id;
      this.dialogRef.close(executionId);
    }
  }

}
