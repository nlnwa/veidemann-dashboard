import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CrawlExecutionState, CrawlExecutionStatus, ExtraStatusCodes} from '../../../../shared/models/report';
import {MatTableDataSource} from '@angular/material/table';
import {FileSizePipe} from 'ngx-filesize';

@Component({
    selector: 'app-crawl-execution-status',
    templateUrl: './crawl-execution-status.component.html',
    styleUrls: ['./crawl-execution-status.component.scss'],
    providers: [FileSizePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CrawlExecutionStatusComponent implements OnInit{
  readonly CrawlExecutionState = CrawlExecutionState;
  readonly ExtraStatusCodes = ExtraStatusCodes;

  @Input()
  crawlExecutionStatus: CrawlExecutionStatus;

  dataSource = new MatTableDataSource<CrawlExecutionStatus>();
  crawlExecDisplayedColumns: string[] = ['jobExecution', 'job', 'state'];
  crawlExecRuntimeDisplayedColumns: string[] = ['createdTime', 'startTime', 'endTime', 'lastChangeTime'];
  crawlExecStatisticsDisplayedColumns: string[] = ['statistics', 'count'];

  constructor(private fileSizePipe: FileSizePipe) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<CrawlExecutionStatus>([this.crawlExecutionStatus]);
  }

  getStatistics(){
    const datasource = [];
    const stats = [
      {stat:'URIs crawled', count: this.crawlExecutionStatus.urisCrawled},
      {stat:'Bytes crawled', count: this.fileSizePipe.transform(this.crawlExecutionStatus.bytesCrawled)},
      {stat:'Documents crawled', count: this.crawlExecutionStatus.documentsCrawled},
      {stat:'Documents denied', count: this.crawlExecutionStatus.documentsDenied},
      {stat:'Documents failed', count: this.crawlExecutionStatus.documentsFailed},
      {stat:'Documents out of scope', count: this.crawlExecutionStatus.documentsOutOfScope},
      {stat:'Documents retried', count: this.crawlExecutionStatus.documentsRetried}
    ];
    for (let stat of stats) {
      if (stat.count !== 0) {
        datasource.push(stat);
      }
    }
    return datasource;
  }

}
