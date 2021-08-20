import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {EventListRequest, FieldMask} from '../../../api';
import {EventHandlerApiService} from '../../core/services/api/event-handler-api.service';
import {EventObject} from '../../../shared/models';
import {Severity, State} from '../../../shared/models/event/event.model';

@Pipe({
  name: 'eventCount'
})

export class EventCountPipe implements PipeTransform {
  constructor(private eventHandlerApiService: EventHandlerApiService) {
  }

  transform(state?: State, severity?: Severity, assignee?: string): Observable<number> {
    const listReq = new EventListRequest();
    const queryTemplate = new EventObject();
    const fieldMask = new FieldMask();
    if (state) {
      queryTemplate.state = state;
      fieldMask.addPaths('state');
    }
    if (assignee) {
      queryTemplate.assignee = assignee;
      fieldMask.addPaths('assignee');
    }
    if (severity) {
      queryTemplate.severity = severity;
      fieldMask.addPaths('severity');
    }
    listReq.setQueryTemplate(EventObject.toProto(queryTemplate));
    listReq.setQueryMask(fieldMask);
    return this.eventHandlerApiService.count(listReq);
  }

}
