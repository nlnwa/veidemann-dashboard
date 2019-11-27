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
} from '../../../../api';
import {Observable, Observer} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {map} from 'rxjs/operators';
import {EventObject} from '../../../commons/models';
import {AppConfigService, AuthService} from '../index';
import {State} from '../../../commons/models/event/event.model';


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
        .on('end', () => observer.complete());

      return () => stream.cancel();
    });
  }

  count(request: EventListRequest): Observable<number> {
    const metadata = this.authService.metadata;
    return fromPromise(this.eventClient.countEventObjects(request, metadata))
      .pipe(map(listCountResponse => listCountResponse.getCount()));
  }

  get(id: string): Observable<EventObjectProto> {
    const metadata = this.authService.metadata;
    const eventRef = new EventRefProto();
    eventRef.setId(id);
    return fromPromise(this.eventClient.getEventObject(eventRef, metadata));
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

  listNew(): Observable<EventObjectProto> {
    const request = new EventListRequest();
    const template = new EventObject();
    const mask = new FieldMask();
    mask.setPathsList(['state']);
    template.state = State.NEW;
    request.setIdList([]);
    request.setQueryMask(mask);
    request.setQueryTemplate(EventObject.toProto(template));
    return this.list(request);
  }
}

