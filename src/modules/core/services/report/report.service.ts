import {Injectable} from '@angular/core';
import {AuthService} from '../auth';
import {AppConfigService} from '../app.config.service';
import {Observable, Observer} from 'rxjs';
import {
  CrawlExecutionsListRequest,
  CrawlExecutionStatusProto,
  FieldMask,
  JobExecutionsListRequest,
  JobExecutionStatusProto,
  ReportPromiseClient
} from '../../../../api';
import {JobExecutionStatus} from '../../../commons/models/status/status.model';
import {CrawlExecutionStatus} from '../../../commons/models/status/crawlExecutionStatus.model';


@Injectable()
export class ReportService {

  reportClient: ReportPromiseClient;

  constructor(protected authService: AuthService, private appConfigService: AppConfigService) {
    this.reportClient = new ReportPromiseClient(appConfigService.grpcWebUrl, null, null);
  }

  listJobExecutions(listRequest: JobExecutionsListRequest): Observable<JobExecutionStatusProto> {
    const metadata = this.authService.metadata;
    return new Observable((observer: Observer<JobExecutionStatusProto>) => {
      const stream = this.reportClient.listJobExecutions(listRequest, metadata)
        .on('data', data => {
          observer.next(data);
        })
        .on('error', error =>  {
          observer.error(error);
        })
        .on('end', () => {
          observer.complete();
        });

      return () => stream.cancel();
    });
  }

  listCrawlExecutions(listRequest: CrawlExecutionsListRequest): Observable<CrawlExecutionStatusProto> {
    const metadata = this.authService.metadata;
    return new Observable( (observer: Observer<CrawlExecutionStatusProto>) => {
      const stream = this.reportClient.listExecutions(listRequest, metadata)
        .on('data', data => {
          observer.next(data);
        })
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    });
  }


  getJobStatus(id: string) {
    const request = new JobExecutionsListRequest();
    const template = new JobExecutionStatus();
    const mask = new FieldMask();

    mask.setPathsList(['jobId']);
    template.jobId = id;
    request.setQueryMask(mask);
    request.setQueryTemplate(JobExecutionStatus.toProto(template));
    return this.listJobExecutions(request);
  }

  getSeedStatus(id: string) {
    const request = new CrawlExecutionsListRequest();
    const template = new CrawlExecutionStatus();
    const mask = new FieldMask();

    mask.setPathsList(['seedId']);
    template.seedId = id;
    request.setQueryMask(mask);
    request.setQueryTemplate(CrawlExecutionStatus.toProto(template));
    return this.listCrawlExecutions(request);
  }
}
