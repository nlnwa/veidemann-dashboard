import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventObject} from '../../../../../shared/models';

@Component({
  selector: 'app-event-action-shortcuts',
  templateUrl: './event-action-shortcuts.component.html',
  styleUrls: ['./event-action-shortcuts.component.css']
})
export class EventActionShortcutsComponent implements OnInit {

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
    this.assign.emit();
  }

  onAddAlternativeSeed() {
    this.alternativeSeed.emit();
  }

}
