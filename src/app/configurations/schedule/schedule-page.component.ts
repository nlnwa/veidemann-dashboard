import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ListDatabase, ListDataSource} from '../../commons/list/';
import {MatPaginator} from '@angular/material';
import {ScheduleListComponent} from './schedule-list/schedule-list.component';
import {Schedule} from '../../commons/models/config.model';
import {Subject} from 'rxjs/Subject';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {Observable} from 'rxjs/Observable';
import {ScheduleService} from './schedule.service';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'app-search',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Schedule</span>
          <button mat-mini-fab (click)="onCreateSchedule()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-schedule-list (rowClick)="onSelectSchedule($event)"></app-schedule-list>
        <mat-paginator [length]="pageLength"
                       [pageIndex]="pageIndex"
                       [pageSize]="pageSize"
                       [pageSizeOptions]="pageOptions">
        </mat-paginator>
      </div>
      <app-schedule-details [schedule]="schedule"
                            *ngIf="schedule"
                            (update)="onUpdateSchedule($event)"
                            (save)="onSaveSchedule($event)"
                            (delete)="onDeleteSchedule($event)">
      </app-schedule-details>
    </div>
  `,
  styleUrls: [],
  providers: [ListDataSource, ListDatabase],
})

export class SchedulePageComponent implements AfterViewInit {
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(ScheduleListComponent) list: ScheduleListComponent;

  schedule: Schedule;
  changes: Subject<void> = new Subject<void>();

  constructor(private scheduleService: ScheduleService,
              private snackBarService: SnackBarService,
              private database: ListDatabase) {

  }

  ngAfterViewInit() {
    Observable.merge(this.paginator.page, this.changes)
      .startWith(null)
      .switchMap(() => {
        return this.scheduleService.search({
          page_size: this.paginator.pageSize,
          page: this.paginator.pageIndex
        });
      })
      .map((reply) => {
        this.pageLength = parseInt(reply.count, 10);
        this.pageSize = reply.page_size;
        this.pageIndex = reply.page;
        return reply.value;
      })
      .subscribe((items) => {
        this.database.items = items;
      });
  }

  onCreateSchedule(): void {
    this.schedule = new Schedule();
  }

  onSelectSchedule(schedule: Schedule) {
    this.schedule = schedule;
  }

  onSaveSchedule(schedule: Schedule) {
    this.scheduleService.create(schedule)
      .subscribe(newSchedule => {
        this.schedule = newSchedule;
        this.snackBarService.openSnackBar('Lagret');
      });
    this.changes.next();
  }

  onUpdateSchedule(schedule: Schedule) {
    this.scheduleService.update(schedule)
      .subscribe(updatedSchedule => {
        this.schedule = updatedSchedule;
        this.snackBarService.openSnackBar('Oppdatert');
      });
    this.changes.next();
  }

  onDeleteSchedule(schedule: Schedule) {
    this.scheduleService.delete(schedule.id)
      .subscribe((response) => {
        this.schedule = response;
        this.snackBarService.openSnackBar('Slettet');
      });
    this.changes.next();
  }

}
