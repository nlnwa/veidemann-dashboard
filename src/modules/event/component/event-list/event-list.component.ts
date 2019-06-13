import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {EventObject} from '../../../commons/models';
import {Severity, State} from '../../../commons/models/event/event.model';
import {BaseListComponent} from '../../../commons/components';
import {SearchDataService} from '../../../configurations/services';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss', '../../../commons/components/base-list/base-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventListComponent extends BaseListComponent {
  readonly Severity = Severity;
  readonly State = State;

  displayedColumns = ['select', 'type', 'source', 'state', 'severity', 'assignee', 'actions'];

  @Output()
  assignToMe: EventEmitter<EventObject> = new EventEmitter();

  constructor(public cdr: ChangeDetectorRef,
              private searchDataService: SearchDataService) {
    super(cdr, searchDataService);
  }

  onAssignToMe(eventObject: EventObject) {
    this.assignToMe.emit(eventObject);
  }
}


