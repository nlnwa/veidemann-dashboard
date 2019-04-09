import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EventService} from '../../event/services/event.service';
import {ConfigObjectProto, EventListRequest, EventObjectProto, FieldMask} from '../../../api';
import {EventObject} from '../../commons/models';
import {State} from '../../commons/models/event/event.model';
import {map, toArray} from 'rxjs/operators';

@Injectable()
export class AppService {

  constructor(protected eventService: EventService) {
  }

  getEventCount(): Observable<number> {
    const request = new EventListRequest();
    const template = new EventObject();
    const mask = new FieldMask();
    mask.setPathsList(['state']);
    template.state = State.NEW;
    request.setIdList([]);
    request.setQueryMask(mask);
    request.setQueryTemplate(EventObject.toProto(template));
    return this.eventService.count(request);
  }

  getEventSummary(): Observable<EventObjectProto> {
    const request = new EventListRequest();
    const template = new EventObject();
    const mask = new FieldMask();
    mask.setPathsList(['state']);
    template.state = State.NEW;
    request.setIdList([]);
    request.setQueryMask(mask);
    request.setQueryTemplate(EventObject.toProto(template));
    return this.eventService.list(request);
  }

  test() {
    const request = new EventListRequest();
    const template = new EventObject();
    const mask = new FieldMask();
    mask.setPathsList(['state']);
    template.state = State.NEW;
    request.setIdList([]);
    request.setQueryMask(mask);
    request.setQueryTemplate(EventObject.toProto(template));
    return this.eventService.list(request).pipe(
      map( event => EventObject.fromProto(event)),
      toArray(),
    ).subscribe(events => {
      const eventSummary = [];
      for (const event of events) {
        const type = event.type;
        const index = eventSummary.findIndex(t => t.type === type);
           if ( index !== -1) {
             eventSummary[index].count++;
           } else {
             eventSummary.push({type: event.type, count: 1});
           }
      }
      return eventSummary;
    });
  }
}
