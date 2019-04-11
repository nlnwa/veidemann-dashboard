import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EventService} from '../../event/services/event.service';
import {EventListRequest, EventObjectProto, FieldMask} from '../../../api';
import {EventObject} from '../../commons/models';
import {State} from '../../commons/models/event/event.model';

@Injectable()
export class AppService {

  constructor(protected eventService: EventService) {
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
}
