import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../services/event.service';
import {EventListComponent} from '../component/event-list/event-list.component';
import {EventListRequest, ListRequest} from '../../../api';
import {map, mergeMap, takeUntil, toArray} from 'rxjs/operators';
import {MatDialog, MatDialogConfig, MatTableDataSource} from '@angular/material';
import {ConfigObject, EventObject, Kind} from '../../commons/models';
import {AuthService} from '../../core/services/auth';
import {BackendService, SnackBarService} from '../../core/services';
import {SearchDataService} from '../../configurations/services';
import {State} from '../../commons/models/event/event.model';
import {DeleteDialogComponent} from '../../configurations/components';
import {from, Subject} from 'rxjs';

@Component({
  selector: 'app-event',
  template: `
    <div fxLayout="column" fxLayoutGap="4px">
      <div>
        <div fxLayout="row">
          <mat-button-toggle-group value="allEvents" [(ngModel)]="eventFilter">
            <mat-button-toggle value="allEvents" (click)="onFilterListByAssignee()">
              Alle hendelser
            </mat-button-toggle>
            <mat-button-toggle value="myEvents" (click)="onFilterListByAssignee(assignee)">
              Mine hendelser
            </mat-button-toggle>
          </mat-button-toggle-group>
          <span fxFlex></span>
          <mat-slide-toggle [(ngModel)]="showClosed" (change)="onShowClosed()">Vis closed</mat-slide-toggle>
        </div>
        <app-event-list [dataSource]="dataSource"
                        (rowClick)="onSelectEvent($event)"
                        (selectedChange)="onSelectedChange($event)">
        </app-event-list>
      </div>
      <app-event-details [eventObject]="eventObject"
                         [assigneeList]="assigneeList"
                         *ngIf="eventObject && singleMode"
                         (update)="onUpdateEvent($event)"
                         (delete)="onDeleteEvent($event)">
      </app-event-details>
      <app-event-details-multi *ngIf="!singleMode"
                               [eventObject]="mergedEvent"
                               [assigneeList]="assigneeList"
                               (update)="onUpdateSelected($event)"
                               (delete)="onDeleteSelected()"
      >
      </app-event-details-multi>
    </div>
  `,
  styleUrls: [],
  providers: [
    EventService,
    SearchDataService,
  ]
})

export class EventPageComponent implements OnInit {
  readonly State = State;

  dataSource = new MatTableDataSource<EventObject>();

  eventObject: EventObject;

  selectedEvents: EventObject[] = [];

  mergedEvent: EventObject;

  showClosed = false;

  eventFilter = 'allEvents';

  assigneeList: string[] = [];

  protected ngUnsubscribe = new Subject();

  filterValues = {
    assignee: '',
    state: [State[State.NEW], State[State.OPEN]]
  };

  @ViewChild(EventListComponent) list: EventListComponent;

  constructor(private eventService: EventService,
              private authService: AuthService,
              private snackBarService: SnackBarService,
              private backendService: BackendService,
              private dialog: MatDialog) {
  }

  get singleMode(): boolean {
    return this.selectedEvents.length < 2;
  }

  get assignee(): string {
    return this.authService.name;
  }


  ngOnInit() {
    this.getEvents();
    this.getAssigneeList();
  }

  getEvents(): void {
    const listRequest = new EventListRequest();
    this.eventService.list(listRequest).pipe(
      map(eventObject => EventObject.fromProto(eventObject)),
      toArray(),
    ).subscribe(eventObjects => {
      this.dataSource.data = eventObjects;
      this.dataSource.filterPredicate = this.tableFilter();
      this.onFilterListByAssignee();
    });
  }

  getAssigneeList(): void {
    const roleRequest = new ListRequest();
    roleRequest.setIdList([]);
    roleRequest.setKind(Kind.ROLEMAPPING.valueOf());
    this.backendService.list(roleRequest).pipe(
      map(role => ConfigObject.fromProto(role)),
      toArray(),
    ).subscribe(roles => {
      for (const role of roles) {
        if (role.roleMapping.email !== '') {
          this.assigneeList.push(role.roleMapping.email);
        }
        if (role.roleMapping.group !== '') {
          this.assigneeList.push(role.roleMapping.group);
        }
      }
    });
  }

  onSelectEvent(eventObject: EventObject) {
    this.eventObject = eventObject;
  }

  onSelectedChange(events: EventObject[]) {
    this.selectedEvents = events;

    if (!this.singleMode) {
      this.mergedEvent = EventObject.mergeEvents(this.selectedEvents);
    } else {
      this.mergedEvent = null;
    }
  }

  onUpdateEvent(update: any) {
    this.eventService.update(update.updateTemplate, update.paths, update.id, update.comment)
      .subscribe(() => {
        this.eventObject = null;
        this.getEvents();
        this.snackBarService.openSnackBar('Hendelsen er blitt oppdatert');
      });
  }

  onDeleteEvent(eventObject: EventObject) {
    this.eventService.delete(EventObject.toProto(eventObject))
      .subscribe(() => {
        this.eventObject = null;
        this.selectedEvents = [];
        this.getEvents();
        this.snackBarService.openSnackBar('Hendelsen er slettet');
      });
  }

  onUpdateSelected(update: any) {
    const ids = [];
    for (const event of this.selectedEvents) {
      ids.push(event.id);
    }
    this.eventService.update(update.updateTemplate, update.paths, ids, update.comment)
      .subscribe(updateResponse => {
        this.getEvents();
        if (this.list) {
          this.list.reset();
        }
        this.selectedEvents = [];
        this.snackBarService.openSnackBar(updateResponse.getUpdated() + ' hendelser oppdatert');
      });
  }

  onDeleteSelected() {
    const numberOfEvents = this.selectedEvents.length;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      numberOfConfigs: numberOfEvents.toString()
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          from(this.selectedEvents).pipe(
            mergeMap((eventObject) => this.eventService.delete(EventObject.toProto(eventObject))),
            takeUntil(this.ngUnsubscribe),
          ).subscribe(() => {
            this.getEvents();
            this.selectedEvents = [];
            this.snackBarService.openSnackBar(numberOfEvents + ' hendelser slettet');
          });
        } else {
          this.snackBarService.openSnackBar('Sletter ikke hendelsene');
        }
      });
  }

  onShowClosed() {
    this.eventObject = null;
    if (this.eventFilter === 'allEvents') {
      this.onFilterListByAssignee('');
    } else if (this.eventFilter === 'myEvents') {
      this.onFilterListByAssignee(this.authService.name);
    }
  }

  onFilterListByAssignee(assignee?: string) {
    this.eventObject = null;
    if (assignee) {
      this.filterValues.assignee = assignee;
    } else {
      this.filterValues.assignee = '';
    }
    if (this.showClosed) {
      this.filterValues.state = [State[State.CLOSED]];
    } else {
      this.filterValues.state = [State[State.NEW], State[State.OPEN]];
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }


  tableFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function (data, filter): boolean {
      const filterValues = JSON.parse(filter);
      return data.assignee.indexOf(filterValues.assignee) !== -1 && filterValues.state.indexOf(State[data.state]) !== -1;
    };
    return filterFunction;
  }
}
