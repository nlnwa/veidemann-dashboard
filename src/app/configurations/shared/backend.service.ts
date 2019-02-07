import {HttpParams} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';

import {ConfigObject, DeleteResponse, ListRequest, UpdateRequest, UpdateResponse} from '../../../api/config/v1/config_pb';
import {ConfigPromiseClient} from '../../../api/config/v1/config_grpc_web_pb';
import {OAuthService} from 'angular-oauth2-oidc';
import {map, timeout, timeoutWith, toArray} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {fromPromise} from 'rxjs/internal-compatibility';
import {environment} from '../../../environments/environment';

function requestToParams(listRequest: ListRequest): HttpParams {
  return Object.keys(listRequest).reduce((acc, key) => acc.append(key, listRequest[key]), new HttpParams);
}

@Injectable()
export class BackendService {

  protected readonly url: string = environment.grpcWeb;

  configClient = new ConfigPromiseClient(this.url, null, null);

  constructor(protected oauthService: OAuthService) {
  }

  list(listRequest: ListRequest, due = 1000): Observable<ConfigObject[]> {
    const metadata = this.getAuth();

    const observable: Observable<ConfigObject> = Observable.create((observer: Observer<ConfigObject>) => {
      const stream = this.configClient.listConfigObjects(listRequest, metadata)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('status', (s) => {
          console.log('status', s);
          observer.complete();
        })
        .on('end', () => console.log('end'));

      return () => stream.cancel();
    });

    return observable.pipe(
      timeoutWith(due, []),
      toArray()
    );
  }

  count(request: ListRequest): Observable<number> {
    const metadata = this.getAuth();
    return fromPromise(this.configClient.countConfigObjects(request, metadata)).pipe(map(listCountResponse => listCountResponse.getCount()));
  }

  save(config: ConfigObject): Observable<ConfigObject> {
    const metadata = this.getAuth();
    config.setApiversion('v1');
    return fromPromise(this.configClient.saveConfigObject(config, metadata));
  }

  update(request: UpdateRequest): Observable<UpdateResponse> {
    const metadata = this.getAuth();
    return fromPromise(this.configClient.updateConfigObjects(request, metadata));
  }

  delete(request: ConfigObject): Observable<DeleteResponse> {
    const metadata = this.getAuth();
    return fromPromise(this.configClient.deleteConfigObject(request, metadata));
  }

  private getAuth() {
    return {authorization: 'Bearer ' + this.oauthService.getIdToken()};
  }

}
