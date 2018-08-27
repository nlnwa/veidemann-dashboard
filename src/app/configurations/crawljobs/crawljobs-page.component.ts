import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import {CrawlJobService} from './crawljob.service';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {CrawlConfig, CrawlJob, CrawlScheduleConfig, Label} from '../../commons/models/config.model';
import {combineLatest, from, Subject} from 'rxjs';
import {catchError, map, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {CrawlConfigService} from '../crawlconfig/crawlconfig.service';
import {ScheduleService} from '../schedule/schedule.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DetailDirective} from '../shared/detail.directive';
import {FormBuilder} from '@angular/forms';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {CrawljobDetailsComponent} from './crawljob-details/crawljob-details.component';

@Component({
  selector: 'app-crawljobs',
  template: `
    <app-search-config [term]="term"
                       (submit)="onSearch($event)"></app-search-config>
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Høstejobber</span>
          <button mat-mini-fab (click)="onCreateCrawlJob()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-crawljob-list (rowClick)="onSelectCrawlJob($event)"
                           [data]="data$ | async"
                           (selectedChange)="onSelectedChange($event)"
                           (labelClicked)="onLabelClick($event)"
                           (page)="onPage($event)">
        </app-crawljob-list>
      </div>
      <app-crawljob-details [crawlJob]="crawlJob"
                            [crawlConfigs]="crawlConfigs"
                            [schedules]="schedules"
                            *ngIf="crawlJob && crawlConfigs && schedules && singleMode"
                            (update)="onUpdateCrawlJob($event)"
                            (save)="onSaveCrawlJob($event)"
                            (delete)="onDeleteCrawlJob($event)">
      </app-crawljob-details>
      <ng-template detail-host></ng-template>
    </div>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrawlJobsComponent implements OnInit {

  selectedConfigs = [];
  term = '';
  componentRef = null;

  crawlJob: CrawlJob;
  schedules: CrawlScheduleConfig[];
  crawlConfigs: CrawlConfig[];
  changes: Subject<void> = new Subject<void>();
  page: Subject<PageEvent> = new Subject<PageEvent>();
  data = new Subject<any>();
  data$ = this.data.asObservable();

  @ViewChild(DetailDirective) detailHost: DetailDirective;

  constructor(private crawlJobService: CrawlJobService,
              private crawlConfigService: CrawlConfigService,
              private scheduleService: ScheduleService,
              private snackBarService: SnackBarService,
              private route: ActivatedRoute,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private fb: FormBuilder,
              private dialog: MatDialog) {
  }

  get singleMode(): boolean {
    return this.selectedConfigs.length < 2;
  }

  ngOnInit() {
    this.crawlConfigService.list().pipe(map(reply => reply.value))
      .subscribe(crawlConfigs => this.crawlConfigs = crawlConfigs);

    this.scheduleService.list().pipe(map(reply => reply.value))
      .subscribe(schedules => this.schedules = schedules);

    combineLatest(this.page, this.changes.pipe(startWith(null))).pipe(
      switchMap(([pageEvent]) => {
        return this.crawlJobService.search({
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.crawlJobService.get(id)
        .subscribe(crawlJob => {
          this.crawlJob = crawlJob;
        });
    }
  }

  loadComponent(crawlJob: CrawlJob, schedules: CrawlScheduleConfig[], crawlConfigs: CrawlConfig[], labels: Label[]) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CrawljobDetailsComponent);
    const viewContainerRef = this.detailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as CrawljobDetailsComponent;
    instance.crawlJob = crawlJob;
    instance.schedules = schedules.map((schedule) => ({
      id: schedule.id,
      itemName: schedule.meta.name
    }));
    instance.crawlConfigs = crawlConfigs.map((crawlConfig) => ({
      id: crawlConfig.id,
      itemName: crawlConfig.meta.name
    }));
    instance.form.get('crawl_config_id').clearValidators();
    instance.data = false;
    instance.updateForm();
    instance.update.subscribe((crawlJobConfig) => this.onUpdateMultipleCrawlJobs(crawlJobConfig, labels));
    instance.delete.subscribe(() => this.onDeleteMultipleCrawlConfigs(this.selectedConfigs));
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

  onSelectedChange(crawlJobs: CrawlJob[]) {
    this.selectedConfigs = crawlJobs;
    if (!this.singleMode) {
      this.loadComponent(
        this.mergeCrawlJobs(crawlJobs), this.schedules, this.crawlConfigs, getInitialLabels(crawlJobs));
    } else {
      this.crawlJob = crawlJobs[0];
      if (this.componentRef !== null) {
        this.componentRef.destroy();
      }
      if (this.crawlJob === undefined) {
        this.crawlJob = null;
      }
    }
  }

  onCreateCrawlJob(): void {
    this.selectedConfigs = [];
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.crawlJob = new CrawlJob();
  }

  onSelectCrawlJob(crawlJob: CrawlJob) {
    this.router.navigate(['crawljobs', crawlJob.id]);
    this.crawlJob = crawlJob;
  }

  onSaveCrawlJob(crawlJob: CrawlJob) {
    this.crawlJobService.create(crawlJob)
      .subscribe(newCrawlJob => {
        this.crawlJob = newCrawlJob;
        this.changes.next();
        this.snackBarService.openSnackBar('Lagret');
      });
    this.changes.next();
  }

  onUpdateCrawlJob(crawlJob: CrawlJob) {
    this.crawlJobService.update(crawlJob)
      .subscribe(updatedCrawljob => {
        this.crawlJob = updatedCrawljob;
        this.changes.next();
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onUpdateMultipleCrawlJobs(crawlJobUpdate: CrawlJob, initialLabels: Label[]) {
    const numOfConfigs = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((crawlJob: CrawlJob) => {
        crawlJob.disabled = crawlJobUpdate.disabled;
        if (crawlJob.meta.label === undefined) {
          crawlJob.meta.label = [];
        }
        crawlJob.meta.label = updatedLabels(crawlJobUpdate.meta.label.concat(crawlJob.meta.label));
        for (const label of initialLabels) {
          if (!findLabel(crawlJobUpdate.meta.label, label.key, label.value)) {
            crawlJob.meta.label.splice(
              crawlJob.meta.label.findIndex(
                removedLabel => removedLabel.key === label.key && removedLabel.value === label.value),
              1);
          }
        }
        if (crawlJobUpdate.limits.depth !== null) {
          crawlJob.limits.depth = crawlJobUpdate.limits.depth;
        }
        if (crawlJobUpdate.limits.max_bytes !== '') {
          crawlJob.limits.max_bytes = crawlJobUpdate.limits.max_bytes;
        }
        if (!(crawlJobUpdate.limits.max_duration_s === '')) {
          crawlJob.limits.max_duration_s = crawlJobUpdate.limits.max_duration_s;
        }
        if (!(crawlJobUpdate.schedule_id === '')) {
          crawlJob.schedule_id = crawlJobUpdate.schedule_id;
        }
        if (crawlJobUpdate.crawl_config_id !== '') {
          crawlJob.crawl_config_id = crawlJobUpdate.crawl_config_id;
        }
        return this.crawlJobService.update(crawlJob);
      }),
      catchError((err) => {
        console.log(err);
        return of('true');
      }),
    ).subscribe(() => {
      this.selectedConfigs = [];
      this.componentRef.destroy();
      this.crawlJob = null;
      this.changes.next();
      this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner er oppdatert');
    });
  }

  onDeleteCrawlJob(crawlJob: CrawlJob) {
    this.crawlJobService.delete(crawlJob.id)
      .subscribe((response) => {
        this.crawlJob = null;
        this.changes.next();
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onDeleteMultipleCrawlConfigs(configs: CrawlJob[]) {
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
            mergeMap((config) => this.crawlJobService.delete(config.id)),
            catchError((err) => {
              console.log(err);
              return of('true');
            }),
          ).subscribe(() => {
            this.selectedConfigs = [];
            this.componentRef.destroy();
            this.crawlJob = null;
            this.changes.next();
            this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner slettet');
          });
        } else {
          this.snackBarService.openSnackBar('Sletter ikke konfigurasjonene');
        }
      });
  }

  mergeCrawlJobs(configs: CrawlJob[]) {
    const config = new CrawlJob();
    const compareObj = configs[0];
    config.id = '1234567';
    config.meta.name = 'Multi';

    const equalDisabledStatus = configs.every(function (cfg: CrawlJob) {
      return cfg.disabled === compareObj.disabled;
    });

    const equalDepth = configs.every(function (cfg: CrawlJob) {
      return cfg.limits.depth === compareObj.limits.depth;
    });

    const equalMaxDuration = configs.every(function (cfg: CrawlJob) {
      return cfg.limits.max_duration_s === compareObj.limits.max_duration_s;
    });

    const equalMaxBytes = configs.every(function (cfg: CrawlJob) {
      return cfg.limits.max_bytes === compareObj.limits.max_bytes;
    });

    const equalSchedule = configs.every(function (cfg: CrawlJob) {
      return cfg.schedule_id === compareObj.schedule_id;
    });

    const equalCrawlConfig = configs.every(function (cfg: CrawlJob) {
      return cfg.crawl_config_id === compareObj.crawl_config_id;
    });

    if (equalDisabledStatus) {
      config.disabled = compareObj.disabled;
    } else {
      config.disabled = true;
    }

    if (equalDepth) {
      config.limits.depth = compareObj.limits.depth;
    } else {
      config.limits.depth = null;
    }

    if (equalMaxDuration) {
      config.limits.max_duration_s = compareObj.limits.max_duration_s;
    } else {
      config.limits.max_duration_s = '';
    }

    if (equalMaxBytes) {
      config.limits.max_bytes = compareObj.limits.max_bytes;
    } else {
      config.limits.max_bytes = '';
    }

    if (equalSchedule) {
      config.schedule_id = compareObj.schedule_id;
    }

    if (equalCrawlConfig) {
      config.crawl_config_id = compareObj.crawl_config_id;
    }
    const label = configs.reduce((acc: CrawlJob, curr: CrawlJob) => {
      config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
      return config;
    });
    return config;
  }
}

function getInitialLabels(configs: CrawlJob[]) {
  const config = new CrawlJob();
  const label = configs.reduce((acc: CrawlJob, curr: CrawlJob) => {
    config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
    return config;
  });
  return config.meta.label;
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

function findLabel(array: Label[], key, value) {
  const labelExist = array.find(function (label) {
    return label.key === key && label.value === value;
  });
  if (!labelExist) {
    return false;
  }
  if (labelExist) {
    return true;
  }
}
