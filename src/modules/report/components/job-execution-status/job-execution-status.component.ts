import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {
  CrawlExecutionState,
  ExtraStatusCodes,
  JobExecutionState,
  JobExecutionStatus
} from '../../../../shared/models/report';
import {MatTableDataSource} from '@angular/material/table';
import {FileSizePipe} from 'ngx-filesize';
import {JobexecutionTotalQueuePipe} from '../../pipe';

@Component({
  selector: 'app-job-execution-status',
  templateUrl: './job-execution-status.component.html',
  styleUrls: ['./job-execution-status.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FileSizePipe, JobexecutionTotalQueuePipe]
})

export class JobExecutionStatusComponent implements OnInit {
  readonly JobExecutionState = JobExecutionState;
  readonly CrawlExecutionState = CrawlExecutionState;
  readonly ExtraStatusCodes = ExtraStatusCodes;

  @Input()
  jobExecutionStatus: JobExecutionStatus;
  dataSource = new MatTableDataSource<JobExecutionStatus>()
  jobExecStateDisplayedColumns: string[] = ['crawlJob', 'state', 'queueCount'];
  jobExecRuntimeDisplayedColumns: string[] = ['startTime', 'endTime'];
  jobExecStatisticsDisplayedColumns: string[] = ['statistics', 'count'];
  jobExecExecutionsDisplayedColumns: string[] = ['state', 'count'];

  constructor(private fileSizePipe: FileSizePipe) {
  }

  getExecMap(executionStateMap: Map<string, number>) {
    const datasource = [];
    for (const [key, value] of executionStateMap) {
      if (value) {
        datasource.push({key, value});
      }
    }
    return datasource;
  }

  getStatistics(){
    const datasource = [];
    const stats = [
      {stat:'URIs crawled', count: this.jobExecutionStatus.urisCrawled},
      {stat:'Bytes crawled', count: this.fileSizePipe.transform(this.jobExecutionStatus.bytesCrawled)},
      {stat:'Documents crawled', count: this.jobExecutionStatus.documentsCrawled},
      {stat:'Documents denied', count: this.jobExecutionStatus.documentsDenied},
      {stat:'Documents failed', count: this.jobExecutionStatus.documentsFailed},
      {stat:'Documents out of scope', count: this.jobExecutionStatus.documentsOutOfScope},
      {stat:'Documents retried', count: this.jobExecutionStatus.documentsRetried}
      ];
    for (let stat of stats) {
      if (stat.count !== 0) {
        datasource.push(stat);
      }
    }
    return datasource;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<JobExecutionStatus>([this.jobExecutionStatus]);
  }

}
