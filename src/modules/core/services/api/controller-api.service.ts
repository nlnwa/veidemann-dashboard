import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Metadata} from 'grpc-web';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import {MetadataInterceptor} from './interceptors';
import {ControllerPromiseClient} from '../../../../api/controller/v1/controller_grpc_web_pb';
import {ExecutionId} from '../../../../api/controller/v1/resources_pb';
import {CountResponse} from '../../../../api/frontier/v1/frontier_pb';
import {CrawlExecutionStatus, JobExecutionStatus} from '../../../../api/frontier/v1/resources_pb';
import {CrawlerStatus, RunCrawlRequest} from '../../../../api/controller/v1/controller_pb';
import {Role} from '../../../../api/config/v1/resources_pb';

export class ControllerApiService {

  private client: ControllerPromiseClient;

  constructor(private host: string,
              private metadata?: Metadata) {
    let options: { [p: string]: any };
    if (metadata) {
      const interceptor = new MetadataInterceptor(metadata);
      options = {
        'unaryInterceptors': [interceptor],
      };
    }
    this.client = new ControllerPromiseClient(host, null, options);
  }

  getOpenIdConnectIssuer(): Observable<string> {
    return from(this.client.getOpenIdConnectIssuer(new Empty())).pipe(
      map(response => response.getOpenIdConnectIssuer()));
  }

  getRolesForActiveUser(): Observable<Role[]> {
    return from(this.client.getRolesForActiveUser(new Empty())).pipe(
      map(roleList => roleList.getRoleList()));
  }

  getCrawlerStatus(): Observable<CrawlerStatus> {
    return from(this.client.status(new Empty()));
  }

  pauseCrawler(): Observable<Empty> {
    return from(this.client.pauseCrawler(new Empty()));
  }

  unpauseCrawler(): Observable<Empty> {
    return from(this.client.unPauseCrawler(new Empty()));
  }

  runCrawl(req: RunCrawlRequest): Observable<string> {
    return from(this.client.runCrawl(req)).pipe(
      map(_ => _.getJobExecutionId())
    );
  }

  abortJobExecution(id: string): Observable<JobExecutionStatus> {
    const req = new ExecutionId();
    req.setId(id);
    return from(this.client.abortJobExecution(req));
  }

  abortCrawlExecution(id: string): Observable<CrawlExecutionStatus> {
    const req = new ExecutionId();
    req.setId(id);
    return from(this.client.abortCrawlExecution(req));
  }

  queueCountForCrawlExecution(id: string): Observable<CountResponse> {
    const req = new ExecutionId();
    req.setId(id);
    return from(this.client.queueCountForCrawlExecution(req));
  }
}
