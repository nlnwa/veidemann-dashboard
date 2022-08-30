import {Observable, Observer} from 'rxjs';
import {defaultIfEmpty, map} from 'rxjs/operators';
import {Metadata} from 'grpc-web';
import {MetadataInterceptor} from './interceptors';
import {ReportPromiseClient} from '../../../../api/report/v1/report_grpc_web_pb';
import {
  CrawlExecutionsListRequest,
  ExecuteDbQueryReply,
  ExecuteDbQueryRequest,
  JobExecutionsListRequest
} from '../../../../api/report/v1/report_pb';
import {CrawlExecutionStatus, JobExecutionStatus} from '../../../../api/frontier/v1/resources_pb';
import {FieldMask} from '../../../../api/commons/v1/resources_pb';


export class ReportApiService {

  private client: ReportPromiseClient;

  constructor(private host: string,
              private metadata?: Metadata) {
    let options: { [p: string]: any };
    if (metadata) {
      const interceptor = new MetadataInterceptor(metadata);
      options = {
        'streamInterceptors': [interceptor],
        'unaryInterceptors': [interceptor]
      };
    }
    this.client = new ReportPromiseClient(host, null, options);
  }

  listJobExecutions(listRequest: JobExecutionsListRequest): Observable<JobExecutionStatus> {
    return new Observable((observer: Observer<JobExecutionStatus>) => {
      const stream = this.client.listJobExecutions(listRequest)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    });
  }

  listCrawlExecutions(listRequest: CrawlExecutionsListRequest): Observable<CrawlExecutionStatus> {
    return new Observable((observer: Observer<CrawlExecutionStatus>) => {
      const stream = this.client.listExecutions(listRequest)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    });
  }

  executeDbQuery(request: ExecuteDbQueryRequest): Observable<string> {
    return new Observable((observer: Observer<ExecuteDbQueryReply>) => {
      const stream = this.client.executeDbQuery(request)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    }).pipe(map(reply => reply.getRecord()));
  }

  getLastJobStatus(jobId: string): Observable<JobExecutionStatus> {
    const listRequest = new JobExecutionsListRequest();
    const queryTemplate = new JobExecutionStatus();
    const fieldMask = new FieldMask();

    fieldMask.addPaths('jobId');

    queryTemplate.setJobId(jobId);

    listRequest.setQueryMask(fieldMask);
    listRequest.setQueryTemplate(queryTemplate);
    listRequest.setOrderByPath('startTime');
    listRequest.setOrderDescending(true);
    listRequest.setPageSize(1);

    return this.listJobExecutions(listRequest).pipe(defaultIfEmpty(null));
  }

  getLastSeedStatus(seedId: string, pageSize?: number): Observable<CrawlExecutionStatus> {
    const request = new CrawlExecutionsListRequest();
    const template = new CrawlExecutionStatus();
    const mask = new FieldMask();

    mask.addPaths('seedId');
    template.setSeedId(seedId);
    request.setQueryMask(mask);
    request.setQueryTemplate(template);
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
    template.setJobId(jobId);
    request.setQueryMask(mask);
    request.setQueryTemplate(template);

    return this.listJobExecutions(request).pipe(defaultIfEmpty(null));
  }

  getSeedStatus(seedId: string): Observable<CrawlExecutionStatus> {
    const request = new CrawlExecutionsListRequest();
    const template = new CrawlExecutionStatus();
    const mask = new FieldMask();

    mask.addPaths('seedId');
    template.setSeedId(seedId);
    request.setQueryMask(mask);
    request.setQueryTemplate(template);

    return this.listCrawlExecutions(request).pipe(defaultIfEmpty(null));
  }
}
