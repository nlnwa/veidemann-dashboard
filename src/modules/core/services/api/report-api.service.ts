import {Injectable} from '@angular/core';
import {EMPTY, Observable, Observer, of} from 'rxjs';
import {catchError, defaultIfEmpty, map} from 'rxjs/operators';

import {AuthService} from '../auth';
import {AppConfigService} from '../app.config.service';
import {ErrorService} from '../error.service';
import {
  CrawlExecutionsListRequest,
  CrawlExecutionStatusProto,
  CrawlLogListRequest,
  CrawlLogProto,
  ExecuteDbQueryReply,
  ExecuteDbQueryRequest,
  FieldMask,
  JobExecutionsListRequest,
  JobExecutionStatusProto,
  PageLogListRequest,
  PageLogProto,
  ReportPromiseClient
} from '../../../../api';
import {CrawlExecutionStatus, CrawlLog, JobExecutionStatus, PageLog} from '../../../../shared/models';
import {Changefeed} from '../../../../shared/func/rethinkdb';


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

    if (listRequest.getWatch() && listRequest.hasQueryMask()) {
      const paths = listRequest.getQueryMask().getPathsList();
      if (paths.includes('jobExecutionId') && paths.includes('seedId')) {

        let queryStr = `r.table('executions')`;

        const crawlExecution = CrawlExecutionStatus.fromProto(listRequest.getQueryTemplate());
        queryStr += `.getAll(['${crawlExecution.jobExecutionId}', '${crawlExecution.seedId}'], {index: 'jobExecutionId_seedId'})`;
        paths.splice(paths.findIndex(p => p === 'jobExecutionId'), 1);
        paths.splice(paths.findIndex(p => p === 'seedId'), 1);

        for (const path of paths) {
          const value = crawlExecution[path];
          queryStr += `.filter({${path}: '${value}'})`;
        }
        queryStr += '.changes()';

        const dbQueryRequest: ExecuteDbQueryRequest = new ExecuteDbQueryRequest();
        dbQueryRequest.setQuery(queryStr);

        return new Observable((observer: Observer<any>) => {
          const stream = this.reportClient.executeDbQuery(dbQueryRequest, metadata)
            .on('data', data => observer.next(data))
            .on('error', error => observer.error(error))
            .on('end', () => observer.complete());
          return () => stream.cancel();
        }).pipe(
          map((reply: ExecuteDbQueryReply) => reply.getRecord()),
          map(record => JSON.parse(record, CrawlExecutionStatus.reviver)),
          map((object: any) => listRequest.getWatch()
            ? new CrawlExecutionStatus((object as Changefeed<any>).new_val)
            : new CrawlExecutionStatus(object)),
          catchError(error => {
            this.errorService.dispatch(error);
            return EMPTY;
          })
        );
      }
    }

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

    console.log('queryStr', queryStr);
    return new Observable((observer: Observer<any>) => {
      const stream = this.reportClient.executeDbQuery(dbQueryRequest, metadata)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    }).pipe(
      map((reply: ExecuteDbQueryReply) => reply.getRecord()),
      map(record => JSON.parse(record)),
      catchError(error => {
        this.errorService.dispatch(error);
        return of(null);
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
          return EMPTY;
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
    if (listRequest.getWatch()) {
      queryStr += '.changes()';
    } else if (listRequest.getOffset()) {
      queryStr += `.skip(${listRequest.getOffset()})`;
    }

    console.log('queryStr', queryStr);
    const dbQueryRequest: ExecuteDbQueryRequest = new ExecuteDbQueryRequest();
    dbQueryRequest.setQuery(queryStr);
    if (!listRequest.getWatch()) {
      dbQueryRequest.setLimit(listRequest.getPageSize());
    }

    return new Observable((observer: Observer<any>) => {
      const stream = this.reportClient.executeDbQuery(dbQueryRequest, metadata)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    }).pipe(
      map((reply: ExecuteDbQueryReply) => reply.getRecord()),
      map(record => JSON.parse(record, PageLog.reviver)),
      map((object: any) => listRequest.getWatch() ? (object as Changefeed<any>).new_val : object),
      map(object => new PageLog(object)),
      catchError(error => {
        this.errorService.dispatch(error);
        return EMPTY;
      })
    );
  }


  listCrawlLogs(listRequest: CrawlLogListRequest): Observable<CrawlLog> {
    const metadata = this.authService.metadata;

    if (!listRequest.getWatch()) {
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
          return EMPTY;
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

    if (listRequest.getWatch()) {
      queryStr += '.changes()';
    }

    console.log('queryStr for crawlLog', queryStr);
    const dbQueryRequest: ExecuteDbQueryRequest = new ExecuteDbQueryRequest();
    dbQueryRequest.setQuery(queryStr);
    if (!listRequest.getWatch()) {
      dbQueryRequest.setLimit(listRequest.getPageSize());
    }

    return new Observable((observer: Observer<any>) => {
      const stream = this.reportClient.executeDbQuery(dbQueryRequest, metadata)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    }).pipe(
      map((reply: ExecuteDbQueryReply) => reply.getRecord()),
      map((record: string) => JSON.parse(record, CrawlLog.reviver)),
      map(_ => listRequest.getWatch() ? (_ as Changefeed<any>).new_val : _),
      map(_ => new CrawlLog(_)),
      catchError(error => {
        this.errorService.dispatch(error);
        return EMPTY;
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

  getLastSeedStatus(seedId: string, pageSize?: number): Observable<CrawlExecutionStatus> {
    const request = new CrawlExecutionsListRequest();

    const template = new CrawlExecutionStatus();
    const mask = new FieldMask();

    mask.addPaths('seedId');
    template.seedId = seedId;
    request.setQueryMask(mask);
    request.setQueryTemplate(CrawlExecutionStatus.toProto(template));

    request.setOrderByPath('startTime');
    request.setOrderDescending(true);
    if (pageSize) {
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
