import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventObject} from '../../../../shared/models';

@Component({
  selector: 'app-event-shortcuts',
  templateUrl: './event-shortcuts.component.html',
  styleUrls: ['./event-shortcuts.component.css']
})
export class EventShortcutsComponent implements OnInit {
  @Input()
  eventObject: EventObject;

  @Output()
  assign = new EventEmitter<EventObject>();

  @Output()
  alternativeSeed = new EventEmitter<EventObject>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onAssignToMe() {
    this.assign.emit(this.eventObject);
  }

  onAddAlternativeSeed() {
    this.alternativeSeed.emit(this.eventObject);
  }

}
