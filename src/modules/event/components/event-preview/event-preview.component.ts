import {Component, Input, OnInit} from '@angular/core';
import {ConfigObject, ConfigRef, EventObject, EventType, Kind} from '../../../../shared/models';
import {Severity, State, ChangeType} from 'src/shared/models/event/event.model';
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
