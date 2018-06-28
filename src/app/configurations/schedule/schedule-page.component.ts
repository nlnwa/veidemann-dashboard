import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {ListDatabase, ListDataSource} from '../../commons/list/';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {CrawlScheduleConfig, Label} from '../../commons/models/config.model';
import {combineLatest, from, Subject} from 'rxjs';
import {catchError, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {ScheduleService} from './schedule.service';


import {ActivatedRoute} from '@angular/router';
import {DetailDirective} from '../crawlhostgroupconfig/detail.directive';
import {FormBuilder} from '@angular/forms';
import {ScheduleDetailsComponent} from './schedule-details/schedule-details.component';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-schedule',
  template: `
    <app-search-config [term]="term"
                       (submit)="onSearch($event)"></app-search-config>
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Schedule</span>
          <button mat-mini-fab (click)="onCreateSchedule()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-schedule-list (rowClick)="onSelectSchedule($event)"
                           [data]="data$ | async"
                           (selectedChange)="onSelectedChange($event)"
                           (labelClicked)="onLabelClick($event)"
                           (page)="onPage($event)">
        </app-schedule-list>
        <!--<mat-paginator [length]="pageLength"-->
        <!--[pageIndex]="pageIndex"-->
        <!--[pageSize]="pageSize"-->
        <!--[pageSizeOptions]="pageOptions">-->
        <!--</mat-paginator>-->
      </div>
      <app-schedule-details [schedule]="schedule"
                            *ngIf="schedule && singleMode"
                            (update)="onUpdateSchedule($event)"
                            (save)="onSaveSchedule($event)"
                            (delete)="onDeleteSchedule($event)">
      </app-schedule-details>
      <ng-template detail-host></ng-template>
    </div>
  `,
  styleUrls: [],
  providers: [ListDataSource, ListDatabase],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SchedulePageComponent implements OnInit {
  // pageLength = 0;
  // pageSize = 5;
  // pageIndex = 0;
  // pageOptions = [5, 10];
  //
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(ScheduleListComponent) list: ScheduleListComponent;

  selectedConfigs = [];
  term = '';
  componentRef = null;

  schedule: CrawlScheduleConfig;
  changes: Subject<void> = new Subject<void>();
  page: Subject<PageEvent> = new Subject<PageEvent>();
  data = new Subject<any>();
  data$ = this.data.asObservable();

  @ViewChild(DetailDirective) detailHost: DetailDirective;

  constructor(private scheduleService: ScheduleService,
              private snackBarService: SnackBarService,
              private route: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver,
              private fb: FormBuilder,
              private dialog: MatDialog) {
  }

  // ngAfterViewInit() {
  //   merge(this.paginator.page, this.changes).pipe(
  //     startWith(null),
  //     switchMap(() => {
  //       return this.scheduleService.search({
  //         page_size: this.paginator.pageSize,
  //         page: this.paginator.pageIndex
  //       });
  //     }),
  //     map((reply) => {
  //       this.pageLength = parseInt(reply.count, 10);
  //       this.pageSize = reply.page_size;
  //       this.pageIndex = reply.page;
  //       return reply.value;
  //     })
  //   )
  //     .subscribe((items) => {
  //       this.database.items = items;
  //     });
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id != null) {
  //     this.scheduleService.get(id)
  //       .subscribe(schedule => {
  //         this.schedule = schedule;
  //       });
  //   }
  // }

  loadComponent(schedule: CrawlScheduleConfig) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ScheduleDetailsComponent);
    const viewContainerRef = this.detailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as ScheduleDetailsComponent;
    instance.schedule = schedule;
    instance.data = false;
    instance.updateForm();
    instance.update.subscribe((scheduleConfig) => this.onUpdateMultipleSchedules(scheduleConfig));
    instance.delete.subscribe((scheduleConfig) => this.onDeleteMultipleSchedules(this.selectedConfigs));
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.scheduleService.get(id)
        .subscribe(schedule => {
          this.schedule = schedule;
        });
    }
    combineLatest(this.page, this.changes.pipe(startWith(null))).pipe(
      switchMap(([pageEvent]) => {
        return this.scheduleService.search({
          page_size: pageEvent.pageSize,
          page: pageEvent.pageIndex
        });
      }),
    ).subscribe((reply) => {
      this.data.next({
        value: reply.value,
        pageLength: parseInt(reply.count, 10),
        pageSize: reply.page_size || 0,
        pageIndex: reply.page || 0,
      });
    });
  }

  get singleMode(): boolean {
    return this.selectedConfigs.length < 2;
  }

  onPage(page: PageEvent) {
    this.page.next(page);
  }

  onLabelClick(label) {
    if (this.term.length > 0) {
      this.term = ',' + label;
    } else {
      this.term = label;
    }
  }

  onSearch(labelQuery: string[]) {
    console.log('in pageComp ', labelQuery);
  }

  onSelectedChange(configs: CrawlScheduleConfig[]) {
    this.loadComponent(this.mergeSchedules(configs));
    this.selectedConfigs = configs;
  }

  onCreateSchedule(): void {
    this.schedule = new CrawlScheduleConfig();
  }

  onSelectSchedule(schedule: CrawlScheduleConfig) {
    this.schedule = schedule;
  }

  onSaveSchedule(schedule: CrawlScheduleConfig) {
    this.scheduleService.create(schedule)
      .subscribe(newSchedule => {
        this.schedule = newSchedule;
        this.changes.next();
        this.snackBarService.openSnackBar('Lagret');
      });
    this.changes.next();
  }

  onUpdateSchedule(schedule: CrawlScheduleConfig) {
    this.scheduleService.update(schedule)
      .subscribe(updatedSchedule => {
        this.schedule = updatedSchedule;
        this.snackBarService.openSnackBar('Oppdatert');
      });
    this.changes.next();
  }

  onUpdateMultipleSchedules(scheduleUpdate: CrawlScheduleConfig) {
    const numOfConfigs = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((schedule: CrawlScheduleConfig) => {
        console.log(schedule);
        schedule.meta.label = updatedLabels(
          scheduleUpdate.meta.label.concat(schedule.meta.label));
        schedule.cron_expression = scheduleUpdate.cron_expression;
        schedule.valid_from = scheduleUpdate.valid_from;
        schedule.valid_to = scheduleUpdate.valid_to;
        return this.scheduleService.update(schedule);
      }),
      catchError((err) => {
        console.log(err);
        return of('true');
      }),
    ).subscribe((response) => {
      this.selectedConfigs = [];
      this.componentRef.destroy();
      this.schedule = null;
      this.changes.next();
      this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner er oppdatert');
    });
  }

  onDeleteSchedule(schedule: CrawlScheduleConfig) {
    this.scheduleService.delete(schedule.id)
      .subscribe((response) => {
        this.schedule = null;
        this.changes.next();
        this.snackBarService.openSnackBar('Slettet');
      });
    this.changes.next();
  }

  onDeleteMultipleSchedules(configs: CrawlScheduleConfig[]) {
    const numOfConfigs = configs.length.toString();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      numberOfConfigs: numOfConfigs
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          from(configs).pipe(
            mergeMap((config) => this.scheduleService.delete(config.id)),
            catchError((err) => {
              console.log(err);
              return of('true');
            }),
          ).subscribe((response) => {
            this.selectedConfigs = [];
            this.componentRef.destroy();
            this.schedule = null;
            this.changes.next();
            this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner slettet');
          });
        } else {
          this.snackBarService.openSnackBar('Sletter ikke konfigurasjonene');
        }
      });
  }

  mergeSchedules(configs: CrawlScheduleConfig[]) {
    const config = new CrawlScheduleConfig();
    const compareObj = configs[0];
    config.id = '1234567';
    config.meta.name = 'Multi';

    const equalCronExpression = configs.every(function (cfg: CrawlScheduleConfig) {
      return cfg.cron_expression = compareObj.cron_expression;
    });

    const equalValidFrom = configs.every(function (cfg: CrawlScheduleConfig) {
      return cfg.valid_from = compareObj.valid_from;
    });

    const equalValidTo = configs.every(function (cfg: CrawlScheduleConfig) {
      return cfg.valid_to = compareObj.valid_to;
    });

    if (equalCronExpression) {
      config.cron_expression = compareObj.cron_expression;
    }

    if (equalValidFrom) {
      config.valid_from = compareObj.valid_from;
    }

    if (equalValidTo) {
      config.valid_to = compareObj.valid_to;
    }

    const label = configs.reduce((acc: CrawlScheduleConfig, curr: CrawlScheduleConfig) => {
      config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
      return config;
    });
    return config;
  }

}

function intersectLabel(a, b) {
  const setA = Array.from(new Set(a));
  const setB = Array.from(new Set(b));
  const intersection = new Set(setA.filter((x: Label) =>
    setB.find((label: Label) => x.key === label.key && x.value === label.value) === undefined
      ? false
      : true
  ));
  return Array.from(intersection);
}


function updatedLabels(labels) {
  const result = labels.reduce((unique, o) => {
    if (!unique.find(obj => obj.key === o.key && obj.value === o.value)) {
      unique.push(o);
    }
    return unique;
  }, []);
  return result;
}
