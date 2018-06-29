import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {CrawlJobService} from './crawljob.service';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {CrawlConfig, CrawlJob, CrawlScheduleConfig, Label} from '../../commons/models/config.model';
import {combineLatest, from, Subject} from 'rxjs';
import {catchError, map, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {CrawlConfigService} from '../crawlconfig/crawlconfig.service';
import {ScheduleService} from '../schedule/schedule.service';
import {ListDatabase, ListDataSource} from '../../commons/list/';
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
  providers: [ListDataSource, ListDatabase],
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
    // Load prerequisites for app-crawljob-detail

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

  loadComponent(crawlJob: CrawlJob, schedules: CrawlScheduleConfig[], crawlConfigs: CrawlConfig[]) {
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
    instance.data = false;
    instance.updateForm();
    instance.update.subscribe((crawlJobConfig) => this.onUpdateMultipleCrawlJobs(crawlJobConfig));
    instance.delete.subscribe((crawlJobConfig) => this.onDeleteMultipleCrawlConfigs(this.selectedConfigs));
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

  onSelectedChange(configs: CrawlJob[]) {
    this.loadComponent(this.mergeCrawlJobs(configs), this.schedules, this.crawlConfigs);
    this.selectedConfigs = configs;
  }


  onCreateCrawlJob(): void {
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

  onUpdateMultipleCrawlJobs(crawlJobUpdate: CrawlJob) {
    const numOfConfigs = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((crawlJob: CrawlJob) => {
        crawlJob.disabled = crawlJobUpdate.disabled;
        crawlJob.meta.label = updatedLabels(crawlJobUpdate.meta.label.concat(crawlJob.meta.label));
        crawlJob.limits.depth = crawlJobUpdate.limits.depth;
        crawlJob.limits.max_bytes = crawlJobUpdate.limits.max_bytes;
        crawlJob.limits.max_duration_s = crawlJobUpdate.limits.max_duration_s;
        crawlJob.schedule_id = crawlJobUpdate.schedule_id;
        crawlJob.crawl_config_id = crawlJobUpdate.crawl_config_id;
        return this.crawlJobService.update(crawlJob);
      }),
      catchError((err) => {
        console.log(err);
        return of('true');
      }),
    ).subscribe((response) => {
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
          ).subscribe((response) => {
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
    }

    if (equalMaxDuration) {
      config.limits.max_duration_s = compareObj.limits.max_duration_s;
    }

    if (equalMaxBytes) {
      config.limits.max_bytes = compareObj.limits.max_bytes;
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
