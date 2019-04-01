import {Observable, Observer} from 'rxjs';

import {
  ConfigObjectProto,
  ConfigPromiseClient,
  ConfigRefProto,
  DeleteResponse,
  ListRequest,
  UpdateRequest,
  UpdateResponse
} from '../../../api';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {fromPromise} from 'rxjs/internal-compatibility';
import {AppConfigService} from './app.config.service';
import {AuthService} from './auth';


@Injectable()
export class BackendService {

  configPromiseClient: ConfigPromiseClient;

  constructor(protected authService: AuthService,
              private appConfigService: AppConfigService) {
    this.configPromiseClient = new ConfigPromiseClient(appConfigService.grpcWebUrl, null, null);
  }

  list(listRequest: ListRequest): Observable<ConfigObjectProto> {
    const metadata = this.authService.metadata;
    return new Observable((observer: Observer<ConfigObjectProto>) => {
      const stream = this.configPromiseClient.listConfigObjects(listRequest, metadata)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('status', () => observer.complete())
        .on('end', () => console.log('end'));

      return () => stream.cancel();
    });
  }

  count(request: ListRequest): Observable<number> {
    const metadata = this.authService.metadata;
    return fromPromise(this.configPromiseClient.countConfigObjects(request, metadata))
      .pipe(map(listCountResponse => listCountResponse.getCount()));
  }

  get(config: ConfigRefProto): Observable<ConfigObjectProto> {
    const metadata = this.authService.metadata;
    return fromPromise(this.configPromiseClient.getConfigObject(config, metadata));
  }

  save(config: ConfigObjectProto): Observable<ConfigObjectProto> {
    const metadata = this.authService.metadata;
    config.setApiversion('v1');
    return fromPromise(this.configPromiseClient.saveConfigObject(config, metadata));
  }

  update(request: UpdateRequest): Observable<UpdateResponse> {
    const metadata = this.authService.metadata;
    return fromPromise(this.configPromiseClient.updateConfigObjects(request, metadata));
  }

  delete(request: ConfigObjectProto): Observable<DeleteResponse> {
    const metadata = this.authService.metadata;
    return fromPromise(this.configPromiseClient.deleteConfigObject(request, metadata));
  }
}
