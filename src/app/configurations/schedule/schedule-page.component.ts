import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {CrawlScheduleConfig, Label} from '../../commons/models/config.model';
import {combineLatest, from, Subject} from 'rxjs';
import {catchError, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {ScheduleService} from './schedule.service';
import {ActivatedRoute} from '@angular/router';
import {DetailDirective} from '../shared/detail.directive';
import {FormBuilder, Validators} from '@angular/forms';
import {ScheduleDetailsComponent} from './schedule-details/schedule-details.component';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {
  VALID_CRON_DOM_PATTERN,
  VALID_CRON_DOW_PATTERN,
  VALID_CRON_HOUR_PATTERN,
  VALID_CRON_MINUTE_PATTERN,
  VALID_CRON_MONTH_PATTERN
} from '../../commons/validator';
import {getInitialLabels, findLabel, updatedLabels, intersectLabel} from '../../commons/group-update/labels/common-labels';

@Component({
  selector: 'app-schedule',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Schedule</span>
          <button mat-mini-fab (click)="onCreateSchedule()"
                  [disabled]="!singleMode ? true : false"
                  [matTooltip]="!singleMode ? 'Kan ikke opprette en ny konfigurasjon når flere er valgt.':'Legg til en ny konfigurasjon.'">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-selection-base-list (rowClick)="onSelectSchedule($event)"
                                 [data]="data$ | async"
                                 (selectedChange)="onSelectedChange($event)"
                                 (page)="onPage($event)">
        </app-selection-base-list>
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
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SchedulePageComponent implements OnInit {

  selectedConfigs = [];
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

  get singleMode(): boolean {
    return this.selectedConfigs.length < 2;
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

  loadComponent(schedule: CrawlScheduleConfig, labels: Label[], initialValidFrom: boolean, initialValidTo: boolean) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ScheduleDetailsComponent);
    const viewContainerRef = this.detailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as ScheduleDetailsComponent;
    instance.schedule = schedule;
    instance.form.get('cron_expression').clearValidators();
    instance.form.get('cron_expression.minute').setValidators(Validators.pattern(new RegExp(VALID_CRON_MINUTE_PATTERN)));
    instance.form.get('cron_expression.hour').setValidators(Validators.pattern(new RegExp(VALID_CRON_HOUR_PATTERN)));
    instance.form.get('cron_expression.dom').setValidators(Validators.pattern(new RegExp(VALID_CRON_DOM_PATTERN)));
    instance.form.get('cron_expression.month').setValidators(Validators.pattern(new RegExp(VALID_CRON_MONTH_PATTERN)));
    instance.form.get('cron_expression.dow').setValidators(Validators.pattern(new RegExp(VALID_CRON_DOW_PATTERN)));
    instance.data = false;
    instance.updateForm();
    instance.update.subscribe((scheduleConfig) =>
      this.onUpdateMultipleSchedules(scheduleConfig, labels, initialValidFrom, initialValidTo));
    instance.delete.subscribe(() => this.onDeleteMultipleSchedules(this.selectedConfigs));
  }

  onPage(page: PageEvent) {
    this.page.next(page);
  }

  onSelectedChange(crawlScheduleConfigs: CrawlScheduleConfig[]) {
    this.selectedConfigs = crawlScheduleConfigs;
    if (!this.singleMode) {
      this.loadComponent(this.mergeSchedules(
        crawlScheduleConfigs),
        getInitialLabels(crawlScheduleConfigs, CrawlScheduleConfig),
        commonValidFrom(crawlScheduleConfigs),
        commonValidTo(crawlScheduleConfigs));
    } else {
      this.schedule = crawlScheduleConfigs[0];
      if (this.componentRef !== null) {
        this.componentRef.destroy();
      }
      if (this.schedule === undefined) {
        this.schedule = null;
      }
    }
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
        this.changes.next();
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onUpdateMultipleSchedules(scheduleUpdate: CrawlScheduleConfig,
                            initialLabels: Label[],
                            initialValidFrom: boolean,
                            initialValidTo: boolean) {
    const numOfConfigs = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((schedule: CrawlScheduleConfig) => {
        if (schedule.meta.label === undefined) {
          schedule.meta.label = [];
        }
        schedule.meta.label = updatedLabels(scheduleUpdate.meta.label.concat(schedule.meta.label));
        for (const label of initialLabels) {
          if (!findLabel(scheduleUpdate.meta.label, label.key, label.value)) {
            schedule.meta.label.splice(
              schedule.meta.label.findIndex(
                removedLabel => removedLabel.key === label.key && removedLabel.value === label.value),
              1);
          }
        }
        if (scheduleUpdate.cron_expression !== undefined || null) {
          const newCron = [];
          const updatedCron = scheduleUpdate.cron_expression.split(' ');
          const existingCron = schedule.cron_expression.split(' ');
          for (let i = 0; i < existingCron.length; i++) {
            if (updatedCron[i] !== '') {
              newCron[i] = updatedCron[i];
            } else {
              newCron[i] = existingCron[i];
            }
          }
          schedule.cron_expression = newCron.join(' ');
        }
        if (scheduleUpdate.valid_from != null) {
          schedule.valid_from = scheduleUpdate.valid_from;
        } else {
          if (initialValidFrom) {
            schedule.valid_from = null;
          }
        }
        if (scheduleUpdate.valid_to != null) {
          schedule.valid_to = scheduleUpdate.valid_to;
        } else {
          if (initialValidTo) {
            schedule.valid_to = null;
          }
        }
        return this.scheduleService.update(schedule);
      }),
      catchError((err) => {
        console.log(err);
        return of('true');
      }),
    ).subscribe(() => {
      this.selectedConfigs = [];
      this.componentRef.destroy();
      this.schedule = null;
      this.changes.next();
      this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner er oppdatert');
    });
  }

  onDeleteSchedule(schedule: CrawlScheduleConfig) {
    this.scheduleService.delete(schedule.id)
      .subscribe(() => {
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
          ).subscribe(() => {
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

    const equalCronExpressionMinute = configs.every(function (cfg: CrawlScheduleConfig) {
      const cronSplit = cfg.cron_expression.split(' ');
      const compareCronSplit = compareObj.cron_expression.split(' ');
      return cronSplit[0] === compareCronSplit[0];
    });

    const equalCronExpressionHour = configs.every(function (cfg: CrawlScheduleConfig) {
      const cronSplit = cfg.cron_expression.split(' ');
      const compareCronSplit = compareObj.cron_expression.split(' ');
      return cronSplit[1] === compareCronSplit[1];
    });

    const equalCronExpressionDOM = configs.every(function (cfg: CrawlScheduleConfig) {
      const cronSplit = cfg.cron_expression.split(' ');
      const compareCronSplit = compareObj.cron_expression.split(' ');
      return cronSplit[2] === compareCronSplit[2];
    });

    const equalCronExpressionMonth = configs.every(function (cfg: CrawlScheduleConfig) {
      const cronSplit = cfg.cron_expression.split(' ');
      const compareCronSplit = compareObj.cron_expression.split(' ');
      return cronSplit[3] === compareCronSplit[3];
    });
    const equalCronExpressionDOW = configs.every(function (cfg: CrawlScheduleConfig) {
      const cronSplit = cfg.cron_expression.split(' ');
      const compareCronSplit = compareObj.cron_expression.split(' ');
      return cronSplit[4] === compareCronSplit[4];
    });

    const equalValidFrom = commonValidFrom(configs);

    const equalValidTo = commonValidTo(configs);

    const equalCron = [];
    const splittedCron = configs[0].cron_expression.split(' ');
    if (equalCronExpressionMinute) {
      equalCron[0] = splittedCron[0];
    } else {
      equalCron[0] = '';
    }
    if (equalCronExpressionHour) {
      equalCron[1] = splittedCron[1];
    } else {
      equalCron[1] = '';
    }

    if (equalCronExpressionDOM) {
      equalCron[2] = splittedCron[2];
    } else {
      equalCron[2] = '';
    }

    if (equalCronExpressionMonth) {
      equalCron[3] = splittedCron[3];
    } else {
      equalCron[3] = '';
    }

    if (equalCronExpressionDOW) {
      equalCron[4] = splittedCron[4];
    } else {
      equalCron[4] = '';
    }

    config.cron_expression = equalCron.join(' ');

    if (equalValidFrom) {
      config.valid_from = compareObj.valid_from;
    } else {
      config.valid_from = '';
    }

    if (equalValidTo) {
      config.valid_to = compareObj.valid_to;
    } else {
      config.valid_to = '';
    }

    const label = configs.reduce((acc: CrawlScheduleConfig, curr: CrawlScheduleConfig) => {
      config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
      return config;
    });
    return config;
  }

}

function commonValidFrom(configs: CrawlScheduleConfig[]): boolean {
  const compareObj = configs[0];
  const equalValidFrom = configs.every(function (cfg: CrawlScheduleConfig) {
    return cfg.valid_from === compareObj.valid_from;
  });
  return equalValidFrom;
}

function commonValidTo(configs: CrawlScheduleConfig[]): boolean {
  const compareObj = configs[0];
  const equalValidTo = configs.every(function (cfg: CrawlScheduleConfig) {
    return cfg.valid_to === compareObj.valid_to;
  });
  return equalValidTo;
}
