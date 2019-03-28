import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../services/event.service';
import {EventListComponent} from '../component/event-list/event-list.component';
import {EventListRequest} from '../../../api';
import {map, toArray} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {EventObject} from '../../commons/models';
import {AuthService} from '../../core/services/auth';

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
                         *ngIf="eventObject && singleMode">
      </app-event-details>
      <app-event-multi-update *ngIf="!singleMode"
                              [eventObjects]="selectedEvents">
      </app-event-multi-update>
    </div>
  `,
  styleUrls: [],
  providers: [
    EventService
  ]
})

export class EventPageComponent implements OnInit {

  dataSource = new MatTableDataSource<EventObject>();

  eventObject: EventObject;

  eventObject$ = new Subject<EventObject[]>();

  selectedEvents: EventObject[] = [];

  mergedEvent: EventObject;

  showClosed = false;

  eventFilter = 'allEvents';

  filterValues = {
    assignee: '',
    state: ['NEW', 'OPEN']
  };

  @ViewChild(EventListComponent) list: EventListComponent;

  constructor(private eventService: EventService, private authService: AuthService) {
  }

  get singleMode(): boolean {
    return this.selectedEvents.length < 2;
  }

  get assignee(): string {
    return this.authService.name;
  }


  ngOnInit() {
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

  onSelectEvent(eventObject: EventObject) {
    this.eventObject = eventObject;
  }

  onSelectedChange(events: EventObject[]) {
    this.selectedEvents = events;

    if (!this.singleMode) {
      this.mergedEvent = EventObject.mergeEvents(this.selectedEvents);
    }
  }

  onShowClosed() {
    if (this.eventFilter === 'allEvents') {
      this.onFilterListByAssignee('');
    } else if (this.eventFilter === 'myEvents') {
      this.onFilterListByAssignee(this.authService.name);
    }
  }

  onFilterListByAssignee(assignee?: string) {
    if (assignee) {
      this.filterValues.assignee = assignee;
    } else {
      this.filterValues.assignee = '';
    }
    if (this.showClosed) {
      this.filterValues.state = ['CLOSED'];
    } else {
      this.filterValues.state = ['NEW', 'OPEN'];
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }


  tableFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function (data, filter): boolean {
      const filterValues = JSON.parse(filter);
      return data.assignee.indexOf(filterValues.assignee) !== -1 && filterValues.state.indexOf(data.state.toString()) !== -1;
    };
    return filterFunction;
  }
}
