import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CrawlJobService} from './crawljob.service';
import {MatPaginator} from '@angular/material';
import {CrawlConfig, CrawlJob, CrawlScheduleConfig} from '../../commons/models/config.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import {Subject} from 'rxjs/Subject';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {CrawlConfigService} from '../crawlconfig/crawlconfig.service';
import {ScheduleService} from '../schedule/schedule.service';
import {ListDatabase, ListDataSource} from '../../commons/list/';
import {ActivatedRoute, Router} from '@angular/router';
import {CrawlJobListComponent} from './crawljob-list/crawljob-list.component';

@Component({
  selector: 'app-crawljobs',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Høstejobber</span>
          <button mat-mini-fab (click)="onCreateCrawlJob()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-crawljob-list (rowClick)="onSelectCrawlJob($event)"></app-crawljob-list>
        <mat-paginator [length]="pageLength"
                       [pageIndex]="pageIndex"
                       [pageSize]="pageSize"
                       [pageSizeOptions]="pageOptions"></mat-paginator>
      </div>
      <app-crawljob-details [crawlJob]="crawlJob"
                            [crawlConfigs]="crawlConfigs"
                            [schedules]="schedules"
                            *ngIf="crawlJob && crawlConfigs && schedules"
                            (update)="onUpdateCrawlJob($event)"
                            (save)="onSaveCrawlJob($event)"
                            (delete)="onDeleteCrawlJob($event)"></app-crawljob-details>
    </div>
  `,
  styleUrls: [],
  providers: [ListDataSource, ListDatabase],
})
export class CrawlJobsComponent implements OnInit, AfterViewInit {
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(CrawlJobListComponent) list: CrawlJobListComponent;

  crawlJob: CrawlJob;
  schedules: CrawlScheduleConfig[];
  crawlConfigs: CrawlConfig[]
  changes: Subject<void> = new Subject<void>();

  constructor(private crawlJobService: CrawlJobService,
              private crawlConfigService: CrawlConfigService,
              private scheduleService: ScheduleService,
              private snackBarService: SnackBarService,
              private database: ListDatabase,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    // Load prerequisites for app-crawljob-detail
    this.crawlConfigService.list()
      .map(reply => reply.value)
      .subscribe(crawlConfigs => this.crawlConfigs = crawlConfigs);
    this.scheduleService.list()
      .map(reply => reply.value)
      .subscribe(schedules => this.schedules = schedules);
  }

  ngAfterViewInit() {
    // When paginator has changes or on save/update/delete
    // we reload data for the list
    Observable.merge(this.paginator.page, this.changes)
      .startWith(null)
      .switchMap(() => {
        return this.crawlJobService.search({
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

        const id = this.route.snapshot.paramMap.get('id');
        if (!id && items.length > 0) {
          this.list.onRowClick(items[0])
        } else {
          this.crawlJob = this.database.get(id);
        }
      });
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

  onDeleteCrawlJob(crawlJob: CrawlJob) {
    this.crawlJobService.delete(crawlJob.id)
      .subscribe((response) => {
        this.crawlJob = null;
        this.changes.next();
        this.snackBarService.openSnackBar('Slettet');
      });
  }
}
