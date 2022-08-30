import {Observable, Observer} from 'rxjs';
import {Metadata} from 'grpc-web';
import {MetadataInterceptor} from './interceptors';
import {LogPromiseClient} from '../../../../api/log/v1/log_grpc_web_pb';
import {CrawlLogListRequest, PageLogListRequest} from '../../../../api/log/v1/log_pb';
import {CrawlLog, PageLog} from '../../../../api/log/v1/resources_pb';

export class LogApiService {

  private client: LogPromiseClient;

  constructor(private host: string,
              private metadata?: Metadata) {
    let options: { [p: string]: any };
    if (metadata) {
      const interceptor = new MetadataInterceptor(metadata);
      options = {'streamInterceptors': [interceptor]};
    }
    this.client = new LogPromiseClient(host, null, options);
  }


  listPageLogs(listRequest: PageLogListRequest): Observable<PageLog> {
    return new Observable((observer: Observer<PageLog>) => {
      const stream = this.client.listPageLogs(listRequest)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    });
  }

  listCrawlLogs(listRequest: CrawlLogListRequest): Observable<CrawlLog> {
    return new Observable((observer: Observer<CrawlLog>) => {
      const stream = this.client.listCrawlLogs(listRequest)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    });
  }
}
