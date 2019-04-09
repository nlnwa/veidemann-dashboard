import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {EventHandlerPromiseClient, EventListRequest, EventObjectProto, EventRefProto} from '../../../api';
import {OAuthService} from 'angular-oauth2-oidc';
import {Observable, Observer} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map, tap} from 'rxjs/operators';
import {ConfigObject} from '../../commons/models';
import {BackendService} from '../../core/services';

@Injectable()
export class EventService {

  protected readonly url: string = environment.grpcWeb;

  eventClient = new EventHandlerPromiseClient(this.url, null, null);

  constructor(protected oauthService: OAuthService, protected  backendService: BackendService) {
  }

  list(listRequest: EventListRequest): Observable<EventObjectProto> {
    console.log('kaller list req');
    const metadata = this.getAuth();
    return new Observable((observer: Observer<EventObjectProto>) => {
      const stream = this.eventClient.listEventObjects(listRequest, metadata)
        .on('data', data => {
          console.log('list data: ', data);
          observer.next(data);
        })
        .on('error', error => {
          console.log('service error: ', error);
          observer.error(error);
        })
        .on('status', () => observer.complete())
        .on('end', () => console.log('end'));

      return () => stream.cancel();
    });
  }

  count(request: EventListRequest): Observable<number> {
    const metadata = this.getAuth();
    return fromPromise(this.eventClient.countEventObjects(request, metadata))
      .pipe(map(listCountResponse => listCountResponse.getCount()));
  }

  get(event: EventRefProto): Observable<EventObjectProto> {
    const metadata = this.getAuth();
    console.log(fromPromise(this.eventClient.getEventObject(event, metadata)));
    return fromPromise(this.eventClient.getEventObject(event, metadata));
  }

  private getAuth() {
    return {authorization: 'Bearer ' + this.oauthService.getIdToken()};
  }


  saveCrawlEntity(configObject: ConfigObject): Observable<ConfigObject> {
    return this.backendService.save(ConfigObject.toProto(configObject))
      .pipe(map(newConfig => ConfigObject.fromProto(newConfig)));
  }

  saveSeed(configObject: ConfigObject): Observable<ConfigObject> {
    return this.backendService.save(ConfigObject.toProto(configObject))
      .pipe(map(newConfig => ConfigObject.fromProto(newConfig)));
  }
}
