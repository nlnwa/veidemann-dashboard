import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {EventHandlerPromiseClient, EventListRequest, EventObjectProto, EventRefProto} from '../../../api';
import {OAuthService} from 'angular-oauth2-oidc';
import {Observable, Observer} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';

@Injectable()
export class EventService {

  protected readonly url: string = environment.grpcWeb;

  eventClient = new EventHandlerPromiseClient(this.url, null, null);

  constructor(protected oauthService: OAuthService) {
  }

  list(listRequest: EventListRequest): Observable<EventObjectProto> {
    const metadata = this.getAuth();
    return new Observable((observer: Observer<EventObjectProto>) => {
      const stream = this.eventClient.listEventObjects(listRequest, metadata)
        .on('data', data => observer.next(data))
        .on('error', error => observer.error(error))
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
    return fromPromise(this.eventClient.getEventObject(event, metadata));
  }

  private getAuth() {
    return {authorization: 'Bearer ' + this.oauthService.getIdToken()};
  }
}
