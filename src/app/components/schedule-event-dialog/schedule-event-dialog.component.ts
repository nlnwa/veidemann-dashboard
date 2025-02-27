import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-schedule-event-dialog',
    templateUrl: './schedule-event-dialog.component.html',
    styleUrls: ['./schedule-event-dialog.component.css'],
    standalone: false
})
export class ScheduleEventDialogComponent {

  calendarEvent: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.calendarEvent = data;
  }
}
