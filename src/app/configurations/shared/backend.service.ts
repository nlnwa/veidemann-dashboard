import {HttpParams} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';

import {ConfigObjectProto, ConfigPromiseClient, DeleteResponse, ListRequest, UpdateRequest, UpdateResponse} from '../../../api';
import {OAuthService} from 'angular-oauth2-oidc';
import {map, timeoutWith, toArray} from 'rxjs/operators';
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

  list(listRequest: ListRequest, due = 1000): Observable<ConfigObjectProto[]> {
    const metadata = this.getAuth();

    const observable: Observable<ConfigObjectProto> = Observable.create((observer: Observer<ConfigObjectProto>) => {
      const stream = this.configClient.listConfigObjects(listRequest, metadata)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('status', (s) => {
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

  save(config: ConfigObjectProto): Observable<ConfigObjectProto> {
    console.log('backend save: ', config.toObject());
    const metadata = this.getAuth();
    config.setApiversion('v1');
    return fromPromise(this.configClient.saveConfigObject(config, metadata));
  }

  update(request: UpdateRequest): Observable<UpdateResponse> {
    console.log('backend update: ', request.toObject());
    const metadata = this.getAuth();
    return fromPromise(this.configClient.updateConfigObjects(request, metadata));
  }

  delete(request: ConfigObjectProto): Observable<DeleteResponse> {
    const metadata = this.getAuth();
    return fromPromise(this.configClient.deleteConfigObject(request, metadata));
  }

  private getAuth() {
    return {authorization: 'Bearer ' + this.oauthService.getIdToken()};
  }

}
