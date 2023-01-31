import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ExtraStatusCodes} from '../../../../shared/models/report';
import {CrawlLog} from '../../../../shared/models/log';
import {MatTableDataSource} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {FileSizePipe} from 'ngx-filesize';

@Component({
  selector: 'app-crawl-log-status',
  templateUrl: './crawl-log-status.component.html',
  styleUrls: ['./crawl-log-status.component.css'],
  providers: [DatePipe, FileSizePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlLogStatusComponent implements OnInit{
  readonly ExtraStatusCodes = ExtraStatusCodes;
  dataSource = new MatTableDataSource<CrawlLog>();
  crawlLogRequestDisplayedColumns: string[] = ['requestedUri', 'referrer'];
  crawlLogRespsoneDisplayedColumns: string[] = ['responseUri', 'discoveryPath'];
  crawlLogReportDisplayedColumns: string[] = ['crawlLogEntry', 'value'];
  crawlLogIdsDisplayedColumns: string[] = ['id','crawlExecId','jobExecId'];

  @Input()
  crawlLog: CrawlLog;

  constructor(private datePipe: DatePipe, private fileSizePipe: FileSizePipe) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<CrawlLog>([this.crawlLog]);
  }

  getReport() {
    const datasource = [];
    const reports = [
    {key: 'Status code', value: this.crawlLog.statusCode},
    {key: 'Timestamp', value: this.datePipe.transform(this.crawlLog.timeStamp, 'long')},
    {key: 'Fetch timestamp', value: this.datePipe.transform(this.crawlLog.fetchTimeStamp, 'long')},
    {key: 'Fetch time', value: this.crawlLog.fetchTimeMs / 1000},
    {key: 'Block digest', value: this.crawlLog.blockDigest},
    {key: 'Payload digest', value: this.crawlLog.payloadDigest},
    {key: 'Size', value: this.fileSizePipe.transform(this.crawlLog.size)},
    {key: 'Content type', value: this.crawlLog.contentType},
    {key: 'Storage reference', value: this.crawlLog.storageRef},
    {key: 'Record type', value: this.crawlLog.recordType},
    {key: 'WARC refers to', value: this.crawlLog.warcRefersTo},
    {key: 'IP address', value: this.crawlLog.ipAddress},
    {key: 'Retries', value: this.crawlLog.retries},
    {key: 'Collection name', value: this.crawlLog.collectionFinalName},
    {key: 'Method', value: this.crawlLog.method},
    ]
    for(let report of reports) {
      if(report.value) {
        datasource.push(report);
      }
    }
    return datasource;
  }
}
