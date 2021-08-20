import {Inject, Injectable} from '@angular/core';

import {EMPTY, from, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';

import {ControllerPromiseClient} from '../../../../api';
import {AuthService} from '../auth';
import {Role} from '../../../../shared/models/config';
import {
  CrawlerStatus,
  ExecutionId,
  RunCrawlReply,
  RunCrawlRequest
} from '../../../../shared/models/controller/controller.model';
import {ApplicationErrorHandler} from '../error.handler';
import {CrawlExecutionStatus, JobExecutionStatus} from '../../../../shared/models/report';
import {CountResponse} from '../../../../shared/models';
import {AppConfig} from '../../models/app-config.model';


@Injectable({
  providedIn: 'root'
})
export class ControllerApiService {

  private controllerPromiseClient: ControllerPromiseClient;

  constructor(private authService: AuthService,
              private appConfig: AppConfig,
              private errorHandler: ApplicationErrorHandler) {
    this.controllerPromiseClient = new ControllerPromiseClient(appConfig.grpcWebUrl, null, null);
  }

  getOpenIdConnectIssuer(): Promise<string> {
    return this.controllerPromiseClient.getOpenIdConnectIssuer(new Empty())
      .then(response => response.getOpenIdConnectIssuer());
  }

  getRolesForActiveUser(): Promise<Role[]> {
    return this.controllerPromiseClient.getRolesForActiveUser(new Empty(), this.authService.metadata)
      .then(roleList => roleList.getRoleList());
  }

  getCrawlerStatus(): Observable<CrawlerStatus> {
    return from(this.controllerPromiseClient.status(new Empty(), this.authService.metadata))
      .pipe(map(CrawlerStatus.fromProto));
  }

  pauseCrawler(): void {
    this.controllerPromiseClient.pauseCrawler(new Empty(), this.authService.metadata);
  }

  unpauseCrawler(): void {
    this.controllerPromiseClient.unPauseCrawler(new Empty(), this.authService.metadata);
  }

  runCrawl(request: RunCrawlRequest): Observable<RunCrawlReply> {
    return from(this.controllerPromiseClient.runCrawl(RunCrawlRequest.toProto(request), this.authService.metadata))
      .pipe(
        map(RunCrawlReply.fromProto),
        catchError(error => {
          this.errorHandler.handleError(error);
          return EMPTY;
        })
      );
  }

  abortJobExecution(request: ExecutionId): Observable<JobExecutionStatus> {
    return from(this.controllerPromiseClient.abortJobExecution(ExecutionId.toProto(request), this.authService.metadata))
      .pipe(
        map(jobExecutionStaus => JobExecutionStatus.fromProto(jobExecutionStaus)),
        catchError(error => {
          this.errorHandler.handleError(error);
          return EMPTY;
        })
      );
  }

  abortCrawlExecution(request: ExecutionId): Observable<CrawlExecutionStatus> {
    return from(this.controllerPromiseClient.abortCrawlExecution(ExecutionId.toProto(request), this.authService.metadata))
      .pipe(
        map(crawlExecutionStatus => CrawlExecutionStatus.fromProto(crawlExecutionStatus)),
        catchError(error => {
          this.errorHandler.handleError(error);
          return EMPTY;
        })
      );
  }

  queueCountForCrawlExecution(request: ExecutionId): Observable<CountResponse> {
    return from(this.controllerPromiseClient.queueCountForCrawlExecution(ExecutionId.toProto(request), this.authService.metadata))
      .pipe(
        map(countResponse => CountResponse.fromProto(countResponse)),
        catchError(error => {
          this.errorHandler.handleError(error);
          return EMPTY;
        })
      );
  }
}
