import {Injectable} from '@angular/core';
import {
  EventDeleteResponse,
  EventHandlerPromiseClient,
  EventListRequest,
  EventObjectProto,
  EventRefProto,
  EventUpdateRequest,
  EventUpdateResponse,
  FieldMask
} from '../../../api';
import {Observable, Observer} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {EventObject} from '../../commons/models';
import {AppConfigService, AuthService} from '../../core/services';


@Injectable()
export class EventService {

  eventClient: EventHandlerPromiseClient;

  constructor(protected authService: AuthService, private appConfigService: AppConfigService) {
    this.eventClient = new EventHandlerPromiseClient(appConfigService.grpcWebUrl, null, null);
  }

  list(listRequest: EventListRequest): Observable<EventObjectProto> {
    const metadata = this.authService.metadata;
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
    const metadata = this.authService.metadata;
    return fromPromise(this.eventClient.countEventObjects(request, metadata))
      .pipe(map(listCountResponse => listCountResponse.getCount()));
  }

  get(event: EventRefProto): Observable<EventObjectProto> {
    const metadata = this.authService.metadata;
    return fromPromise(this.eventClient.getEventObject(event, metadata));
  }

  update(updateTemplate: EventObject, paths: string[], id: string[], comment?: string): Observable<EventUpdateResponse> {


    const listRequest = new EventListRequest();
    listRequest.setIdList(id);

    const updateMask = new FieldMask();
    updateMask.setPathsList(paths);

    const updateRequest = new EventUpdateRequest();
    updateRequest.setListRequest(listRequest);
    updateRequest.setUpdateTemplate(EventObject.toProto(updateTemplate));
    updateRequest.setUpdateMask(updateMask);
    updateRequest.setComment(comment);

    const metadata = this.authService.metadata;

    return fromPromise(this.eventClient.updateEventObjects(updateRequest, metadata));
  }

  delete(request: EventObjectProto): Observable<EventDeleteResponse> {
    const metadata = this.authService.metadata;
    return fromPromise(this.eventClient.deleteEventObject(request, metadata));
  }
}

