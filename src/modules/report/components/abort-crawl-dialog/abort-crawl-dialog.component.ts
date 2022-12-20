import {Component, Inject} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import {ExecutionId} from '../../../../shared/models/controller/controller.model';
import {CrawlExecutionStatus, JobExecutionStatus} from '../../../../shared/models/report';
import {Kind} from '../../../../shared/models/config';

@Component({
  selector: 'app-abort-crawl-dialog',
  templateUrl: './abort-crawl-dialog.component.html',
  styleUrls: ['./abort-crawl-dialog.component.css']
})
export class AbortCrawlDialogComponent {
  readonly Kind = Kind;

  executionId: ExecutionId;
  jobExecutionStatus: JobExecutionStatus;
  crawlExecutionStatus: CrawlExecutionStatus;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<AbortCrawlDialogComponent>) {
    this.jobExecutionStatus = data.jobExecutionStatus;
    this.crawlExecutionStatus = data.crawlExecutionStatus;
  }

  onAbortCrawl() {
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
