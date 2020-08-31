import {Injectable} from '@angular/core';
import {Observable, Observer, of} from 'rxjs';
import {catchError, defaultIfEmpty, map, tap} from 'rxjs/operators';

import {AuthService} from '../auth';
import {AppConfigService} from '../app.config.service';
import {ErrorService} from '../error.service';
import {
  CrawlExecutionsListRequest,
  CrawlExecutionStatusProto, CrawlLogProto,
  ExecuteDbQueryRequest,
  FieldMask,
  JobExecutionsListRequest,
  JobExecutionStatusProto, PageLogProto,
  ReportPromiseClient
} from '../../../../api';
import {CrawlExecutionStatus, CrawlLog, JobExecutionStatus, PageLog} from '../../../../shared/models';
import {CrawlLogListRequest, PageLogListRequest} from '../../../../api/gen/report/v1/report_pb';
import {fromTimestamp} from '../../../../shared/func';


@Injectable({
  providedIn: 'root'
})
export class ReportApiService {

  private reportClient: ReportPromiseClient;

  constructor(private authService: AuthService,
              appConfigService: AppConfigService,
              private errorService: ErrorService) {
    this.reportClient = new ReportPromiseClient(appConfigService.grpcWebUrl, null, null);
  }

  listJobExecutions(listRequest: JobExecutionsListRequest): Observable<JobExecutionStatus> {
    const metadata = this.authService.metadata;
    return new Observable((observer: Observer<JobExecutionStatusProto>) => {
      const stream = this.reportClient.listJobExecutions(listRequest, metadata)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    }).pipe(
      map(JobExecutionStatus.fromProto),
      catchError(error => {
        this.errorService.dispatch(error);
        return of(null);
      })
    );
  }

  listCrawlExecutions(listRequest: CrawlExecutionsListRequest): Observable<CrawlExecutionStatus> {
    const metadata = this.authService.metadata;
    return new Observable((observer: Observer<CrawlExecutionStatusProto>) => {
      const stream = this.reportClient.listExecutions(listRequest, metadata)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    }).pipe(
      map(CrawlExecutionStatus.fromProto),
      catchError(error => {
        this.errorService.dispatch(error);
        return of(null);
      })
    );
  }

  countPageLogs(listRequest: PageLogListRequest): Observable<number> {
    const metadata = this.authService.metadata;

    let queryStr = `r.table('page_log')`;
    if (listRequest.hasQueryMask()) {
      const paths = listRequest.getQueryMask().getPathsList();
      const pageLog = PageLog.fromProto(listRequest.getQueryTemplate());
      if (paths.includes('executionId')) {
        queryStr += `.getAll('${pageLog.executionId}', {index: 'executionId'})`;
        paths.splice(paths.findIndex(p => p === 'executionId'), 1);
      }
      for (const path of paths) {
        const value = pageLog[path];
        queryStr += `.filter({${path}: '${value}'})`;
      }
    }
    queryStr += `.count()`;

    const dbQueryRequest: ExecuteDbQueryRequest = new ExecuteDbQueryRequest();
    dbQueryRequest.setQuery(queryStr);

    return new Observable((observer: Observer<any>) => {
      const stream = this.reportClient.executeDbQuery(dbQueryRequest, metadata)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    }).pipe(
      map((record: string) => JSON.parse(record)),
      catchError(error => {
        this.errorService.dispatch(error);
        return of(null)
      })
    );
    /*
        return from(this.reportClient.countPageLogs(listRequest, metadata))
          .pipe(
            map(listCountResponse => listCountResponse.getCount()),
            first(),
            catchError(error => {
              this.errorService.dispatch(error);
              return of(0)
            })
          );
    */
  }

  listPageLogs(listRequest: PageLogListRequest): Observable<PageLog> {
    const metadata = this.authService.metadata;

    if (listRequest.getWarcIdList().length) {
      return new Observable((observer: Observer<PageLogProto>) => {
        const stream = this.reportClient.listPageLogs(listRequest, metadata)
          .on('data', data => observer.next(data))
          .on('error', error => observer.error(error))
          .on('end', () => observer.complete());
        return () => stream.cancel();
      }).pipe(
        map(PageLog.fromProto),
        catchError(error => {
          this.errorService.dispatch(error);
          return of(null)
        })
      );
    }

    let queryStr = `r.table('page_log')`;
    if (listRequest.hasQueryMask()) {
      const paths = listRequest.getQueryMask().getPathsList();
      const pageLog = PageLog.fromProto(listRequest.getQueryTemplate());
      if (paths.includes('executionId')) {
        queryStr += `.getAll('${pageLog.executionId}', {index: 'executionId'})`;
        paths.splice(paths.findIndex(p => p === 'executionId'), 1);
      }
      for (const path of paths) {
        const value = pageLog[path];
        queryStr += `.filter({${path}: '${value}'})`;
      }
    }
    if (listRequest.getOffset()) {
      queryStr += `.skip(${listRequest.getOffset()})`;
    }

    const dbQueryRequest: ExecuteDbQueryRequest = new ExecuteDbQueryRequest();
    dbQueryRequest.setQuery(queryStr);
    dbQueryRequest.setLimit(listRequest.getPageSize());

    return new Observable((observer: Observer<any>) => {
      const stream = this.reportClient.executeDbQuery(dbQueryRequest, metadata)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    }).pipe(
      map((record: string) => JSON.parse(record)),
      map((record: any) => {
        const pageLog = new PageLog(record);
        pageLog.id = record.warcId;
        pageLog.outlinkList = record.outlink;
        pageLog.resourceList = record.resource;
        return pageLog;
      }),
      catchError(error => {
        this.errorService.dispatch(error);
        return of(null)
      })
    );
  }


  listCrawlLogs(listRequest: CrawlLogListRequest): Observable<CrawlLog> {
    const metadata = this.authService.metadata;

    if (listRequest.getWarcIdList().length) {
      return new Observable((observer: Observer<CrawlLogProto>) => {
        const stream = this.reportClient.listCrawlLogs(listRequest, metadata)
          .on('data', data => observer.next(data))
          .on('error', error => observer.error(error))
          .on('end', () => observer.complete());
        return () => stream.cancel();
      }).pipe(
        map(CrawlLog.fromProto),
        catchError(error => {
          this.errorService.dispatch(error);
          return of(null)
        })
      );
    }

    let queryStr = `r.table('crawl_log')`;
    if (listRequest.hasQueryMask()) {
      const paths = listRequest.getQueryMask().getPathsList();
      const pageLog = CrawlLog.fromProto(listRequest.getQueryTemplate());
      if (paths.includes('executionId')) {
        queryStr += `.getAll('${pageLog.executionId}', {index: 'executionId'})`;
        paths.splice(paths.findIndex(p => p === 'executionId'), 1);
      }
      for (const path of paths) {
        const value = pageLog[path];
        queryStr += `.filter({${path}: '${value}'})`;
      }
    }
    if (listRequest.getOffset()) {
      queryStr += `.skip(${listRequest.getOffset()})`;
    }

    const dbQueryRequest: ExecuteDbQueryRequest = new ExecuteDbQueryRequest();
    dbQueryRequest.setQuery(queryStr);
    dbQueryRequest.setLimit(listRequest.getPageSize());

    return new Observable((observer: Observer<any>) => {
      const stream = this.reportClient.executeDbQuery(dbQueryRequest, metadata)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    }).pipe(
      map((record: string) => JSON.parse(record)),
      map((record: any) => {
        const crawlLog = new CrawlLog(record);
        crawlLog.id = record.warcId;
        if (record.timeStamp) {
          crawlLog.timeStamp = fromTimestamp(record.timeStamp);
        }
        if (record.fetchTimeStamp) {
          crawlLog.fetchTimeStamp = fromTimestamp(record.fetchTimeStamp);
        }
        return crawlLog;
      }),
      catchError(error => {
        this.errorService.dispatch(error);
        return of(null)
      })
    );
  }

  getLastJobStatus(jobId: string): Observable<JobExecutionStatus> {
    const request = new JobExecutionsListRequest();

    const template = new JobExecutionStatus();
    const mask = new FieldMask();

    mask.addPaths('jobId');
    template.jobId = jobId;
    request.setQueryMask(mask);
    request.setQueryTemplate(JobExecutionStatus.toProto(template));

    request.setOrderByPath('startTime');
    request.setOrderDescending(true);
    request.setPageSize(1);
    return this.listJobExecutions(request).pipe(defaultIfEmpty(null));
  }

  getLastSeedStatus(seedId: string, pageSize?:number): Observable<CrawlExecutionStatus> {
    const request = new CrawlExecutionsListRequest();

    const template = new CrawlExecutionStatus();
    const mask = new FieldMask();

    mask.addPaths('seedId');
    template.seedId = seedId;
    request.setQueryMask(mask);
    request.setQueryTemplate(CrawlExecutionStatus.toProto(template));

    request.setOrderByPath('startTime');
    request.setOrderDescending(true);
    if(pageSize) {
      request.setPageSize(pageSize);
    } else {
      request.setPageSize(1);
    }
    return this.listCrawlExecutions(request).pipe(defaultIfEmpty(null));
  }

  getJobStatus(jobId: string): Observable<JobExecutionStatus> {
    const request = new JobExecutionsListRequest();
    const template = new JobExecutionStatus();
    const mask = new FieldMask();

    mask.addPaths('jobId');
    template.jobId = jobId;
    request.setQueryMask(mask);
    request.setQueryTemplate(JobExecutionStatus.toProto(template));
    return this.listJobExecutions(request);
  }

  getSeedStatus(seedId: string): Observable<CrawlExecutionStatus> {
    const request = new CrawlExecutionsListRequest();
    const template = new CrawlExecutionStatus();
    const mask = new FieldMask();

    mask.addPaths('seedId');
    template.seedId = seedId;
    request.setQueryMask(mask);
    request.setQueryTemplate(CrawlExecutionStatus.toProto(template));
    return this.listCrawlExecutions(request);
  }
}
