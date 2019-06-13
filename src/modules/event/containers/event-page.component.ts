import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../../core/services/event/event.service';
import {EventListComponent} from '../component/';
import {EventListRequest, ListRequest} from '../../../api';
import {map, mergeMap, takeUntil, toArray} from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
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
    <div fxLayout="column" fxLayoutGap="8px">

      <div fxLayout="column">
        <div fxLayout="row">
          <mat-button-toggle-group value="allEvents" [appearance]="" [(ngModel)]="eventFilter">
            <mat-button-toggle value="allEvents" (click)="onFilterListByAssignee()">
              Alle hendelser
            </mat-button-toggle>
            <mat-button-toggle value="myEvents" (click)="onFilterListByAssignee(assignee)">
              Mine hendelser
            </mat-button-toggle>
          </mat-button-toggle-group>
          <span fxFlex></span>
          <mat-slide-toggle [(ngModel)]="showClosed" (change)="onToggleClosed()">Vis closed</mat-slide-toggle>
        </div>
        <app-event-list [dataSource]="dataSource"
                        (rowClick)="onSelectEvent($event)"
                        (selectedChange)="onSelectedChange($event)"
                        (assignToMe)="onAssignToMe($event)">
        </app-event-list>
      </div>

      <ng-container *ngIf="eventObject$ | async as eventObject">
        <app-event-details [eventObject]="eventObject"
                           [assigneeList]="assigneeList"
                           *ngIf="singleMode"
                           (update)="onUpdateEvent($event)"
                           (delete)="onDeleteEvent($event)">
        </app-event-details>
        <app-event-details-multi *ngIf="!singleMode"
                                 [eventObject]="eventObject"
                                 [assigneeList]="assigneeList"
                                 (update)="onUpdateSelected($event)"
                                 (delete)="onDeleteSelected()">
        </app-event-details-multi>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SearchDataService,
  ]
})

export class EventPageComponent implements OnInit, OnDestroy {
  readonly State = State;

  dataSource = new MatTableDataSource<EventObject>();

  eventObject: Subject<EventObject> = new Subject();
  eventObject$ = this.eventObject.asObservable();

  selectedEvents: EventObject[] = [];

  showClosed = false;

  eventFilter = 'allEvents';

  assigneeList: string[] = [];

  filterValues = {
    assignee: '',
    state: [State[State.NEW], State[State.OPEN]]
  };

  @ViewChild(EventListComponent, { static: true }) eventList: EventListComponent;

  private ngUnsubscribe: Subject<void> = new Subject();

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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getEvents(): void {
    const listRequest = new EventListRequest();
    this.eventService.list(listRequest).pipe(
      map(eventObject => EventObject.fromProto(eventObject)),
      takeUntil(this.ngUnsubscribe),
      toArray(),
    ).subscribe(eventObjects => {
      this.dataSource.data = eventObjects;
      this.dataSource.filterPredicate = this.tableFilter();
      this.onFilterListByAssignee();
    });
  }

  getAssigneeList(): void {
    const roleRequest = new ListRequest();
    roleRequest.setKind(Kind.ROLEMAPPING.valueOf());
    this.backendService.list(roleRequest).pipe(
      map(role => ConfigObject.fromProto(role)),
      takeUntil(this.ngUnsubscribe),
      toArray(),
    ).subscribe(roles => {
      this.assigneeList = roles.map(role => {
        if (role.roleMapping.email !== '') {
          return role.roleMapping.email;
        } else if (role.roleMapping.group !== '') {
          return role.roleMapping.group;
        }
      });
    });
  }

  onSelectEvent(eventObject: EventObject) {
    if (eventObject) {
      this.eventService.get(eventObject.id)
        .pipe(
          map(e => EventObject.fromProto(e)),
          takeUntil(this.ngUnsubscribe),
        )
        .subscribe(e => this.eventObject.next(e));
    } else {
      this.eventObject.next(null);
    }
  }

  onSelectedChange(events: EventObject[]) {
    this.selectedEvents = events;

    if (!this.singleMode) {
      this.eventObject.next(EventObject.mergeEvents(this.selectedEvents));
    } else {
      this.eventObject.next(null);
    }
  }

  onUpdateEvent({updateTemplate, paths, id, comment}) {
    this.eventService.update(updateTemplate, paths, id, comment)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.eventObject.next(null);
        this.getEvents();
        this.snackBarService.openSnackBar('Hendelsen er blitt oppdatert');
        this.eventList.reset();
      });
  }

  onUpdatedEvent(id) {
    this.eventService.get(id)
      .pipe(
        map(eventObject => EventObject.fromProto(eventObject)),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe(eventObject => {
        const data = this.dataSource.data;
        const index = data.findIndex(e => e.id === id);
        if (index !== -1) {
          data[index] = eventObject;
          this.dataSource.data = data;
        }
      });
  }

  onDeleteEvent(eventObject: EventObject) {
    this.eventService.delete(EventObject.toProto(eventObject))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.eventObject.next(null);
        this.selectedEvents = [];
        this.getEvents();
        this.snackBarService.openSnackBar('Hendelsen er slettet');
      });
  }

  onUpdateSelected({updateTemplate, paths, comment}) {
    const ids = this.selectedEvents.map(e => e.id);

    this.eventService.update(updateTemplate, paths, ids, comment)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(updateResponse => {
        this.eventObject.next(null);
        this.selectedEvents = [];
        this.eventList.reset();
        this.getEvents();
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
      .pipe(takeUntil(this.ngUnsubscribe))
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

  onToggleClosed() {
    this.eventObject.next(null);
    this.eventList.reset();
    this.selectedEvents = [];
    if (this.eventFilter === 'allEvents') {
      this.onFilterListByAssignee('');
    } else if (this.eventFilter === 'myEvents') {
      this.onFilterListByAssignee(this.authService.name);
    }
  }

  onFilterListByAssignee(assignee?: string) {
    this.eventObject.next(null);
    this.eventList.reset();
    this.selectedEvents = [];
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

  onAssignToMe(eventObject: EventObject) {
    const id = [eventObject.id];
    const updateTemplate = new EventObject({assignee: this.authService.email});
    const paths = ['assignee'];

    if (eventObject.state === State.NEW.valueOf()) {
      updateTemplate.state = State.OPEN;
      paths.push('state');
    }
    this.eventService.update(updateTemplate, paths, id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        if (response.getUpdated() > 0) {
          this.snackBarService.openSnackBar('Hendelse tildelt bruker: ' + this.authService.email);
          this.onUpdatedEvent(eventObject.id);
        }
      });
  }

  tableFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function (data, filter): boolean {
      const filterValues = JSON.parse(filter);
      return data.assignee.indexOf(filterValues.assignee) !== -1 && filterValues.state.indexOf(State[data.state]) !== -1;
    };
    return filterFunction;
  }
}
