import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RunCrawlReply, RunCrawlRequest} from '../../../../shared/models/controller/controller.model';
import {ConfigObject, Kind} from '../../../../shared/models/config';

@Component({
  selector: 'app-run-crawl-dialog',
  templateUrl: './run-crawl-dialog.component.html',
  styleUrls: ['./run-crawl-dialog.component.css']
})
export class RunCrawlDialogComponent {
  readonly Kind = Kind;

  crawlJobs: ConfigObject[];
  configObjects: ConfigObject[];
  jobId: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<RunCrawlDialogComponent>) {
    this.configObjects = data.configObjects;
    this.crawlJobs = data.crawlJobs;
  }

  get kind(): Kind {
    return this.configObject?.kind;
  }

  onRunCrawl() {
    const seedId = this.configObject?.id;
    const jobId = this.confi
    let multipleSeeds = false;

    jobId = this.jobId;
    switch (this.configObject.kind) {
      case Kind.SEED:

        break;
      case Kind.CRAWLJOB:
        jobId = this.configObject.id;
        break;
      default:
        break;
    }
    this.dialogRef.close({jobId});
  }
}
