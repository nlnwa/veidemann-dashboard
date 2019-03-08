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
import {OAuthService} from 'angular-oauth2-oidc';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {fromPromise} from 'rxjs/internal-compatibility';
import {environment} from '../../../environments/environment';


@Injectable()
export class BackendService {

  protected readonly url: string = environment.grpcWeb;

  configClient = new ConfigPromiseClient(this.url, null, null);

  constructor(protected oauthService: OAuthService) {
  }

  list(listRequest: ListRequest): Observable<ConfigObjectProto> {
    const metadata = this.getAuth();
    return new Observable((observer: Observer<ConfigObjectProto>) => {
      const stream = this.configClient.listConfigObjects(listRequest, metadata)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
        .on('status', () => observer.complete())
        .on('end', () => console.log('end'));

      return () => stream.cancel();
    });
  }

  count(request: ListRequest): Observable<number> {
    const metadata = this.getAuth();
    return fromPromise(this.configClient.countConfigObjects(request, metadata))
      .pipe(map(listCountResponse => listCountResponse.getCount()));
  }

  get(config: ConfigRefProto): Observable<ConfigObjectProto> {
    const metadata = this.getAuth();
    return fromPromise(this.configClient.getConfigObject(config, metadata));
  }

  save(config: ConfigObjectProto): Observable<ConfigObjectProto> {
    const metadata = this.getAuth();
    config.setApiversion('v1');
    return fromPromise(this.configClient.saveConfigObject(config, metadata));
  }

  update(request: UpdateRequest): Observable<UpdateResponse> {
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
