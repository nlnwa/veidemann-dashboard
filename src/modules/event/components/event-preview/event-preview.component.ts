import {Component, Input, OnInit} from '@angular/core';
import {ConfigObject, EventObject, EventType} from '../../../../shared/models';
import {ChangeType, Severity, State} from 'src/shared/models/event/event.model';
import {ConfigService} from '../../../commons/services';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.css']
})
export class EventPreviewComponent implements OnInit {
  readonly Severity = Severity;
  readonly State = State;
  readonly EventType = EventType;
  readonly ChangeType = ChangeType;

  @Input()
  eventObject: EventObject;

  seed: ConfigObject;

  constructor(protected configService: ConfigService) {
  }

  ngOnInit(): void {
  }
}
