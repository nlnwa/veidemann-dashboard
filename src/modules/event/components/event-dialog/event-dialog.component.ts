import {Component, Inject, OnInit} from '@angular/core';
import {EventDetailsComponent} from '../event-details/event-details.component';
import {FormBuilder} from '@angular/forms';
import {AuthService, ErrorService, SnackBarService} from '../../../core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfigObject, ConfigRef, EventObject, EventType, Kind} from '../../../../shared/models';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event.service';
import {ConfigService} from '../../../commons/services';

export interface EventDialogData {
  eventObject: EventObject;
  configObject?: ConfigObject;
}

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})

export class EventDialogComponent extends EventDetailsComponent implements OnInit {
  readonly EventType = EventType;

  constructor(protected fb: FormBuilder,
              protected authService: AuthService,
              protected eventService: EventService,
              protected configService: ConfigService,
              protected route: ActivatedRoute,
              protected errorService: ErrorService,
              protected router: Router,
              protected dialog: MatDialog,
              protected snackBarService: SnackBarService,
              @Inject(MAT_DIALOG_DATA) public data: EventDialogData,
              public dialogRef: MatDialogRef<EventDetailsComponent>) {
    super(fb, authService, eventService, configService, route, errorService, router, dialog, snackBarService);
    this.eventObject = this.data.eventObject;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDialogClose(): EventObject {
    return this.prepareSave();
  }
}
