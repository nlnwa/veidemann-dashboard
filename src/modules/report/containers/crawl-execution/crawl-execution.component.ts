import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {combineLatest, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, share, shareReplay, startWith} from 'rxjs/operators';

import {distinctUntilArrayChanged, isValidDate, Sort} from '../../../../shared/func';
import {CrawlExecutionState, CrawlExecutionStatus} from '../../../../shared/models/report';
import {ConfigObject, ListDataSource, ListItem, Kind} from '../../../../shared/models';
import {ControllerApiService, ErrorService, SnackBarService} from '../../../core/services';
import {CrawlExecutionService, CrawlExecutionStatusQuery} from '../../services';
import {BASE_LIST} from '../../../../shared/directives';
import {CrawlExecutionStatusListComponent} from '../../components';
import {SortDirection} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {AbortCrawlDialogComponent} from '../../components/abort-crawl-dialog/abort-crawl-dialog.component';


@Component({
    selector: 'app-crawl-execution',
    templateUrl: './crawl-execution.component.html',
    styleUrls: ['./crawl-execution.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ListDataSource, {
            provide: BASE_LIST,
            useClass: CrawlExecutionStatusListComponent,
        }],
    standalone: false
})
export class CrawlExecutionComponent implements OnInit {
  readonly CrawlExecutionState = CrawlExecutionState;
  readonly Kind = Kind;

  private reload$: Observable<void>;
  private reload: Subject<void>;

  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  sortDirection$: Observable<SortDirection>;
  sortActive$: Observable<string>;
  query$: Observable<CrawlExecutionStatusQuery>;

  crawlJobOptions: ConfigObject[];

  get loading$(): Observable<boolean> {
    return this.crawlExecutionService.loading$;
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private crawlExecutionService: CrawlExecutionService,
              private dataSource: ListDataSource<CrawlExecutionStatus>,
              private errorService: ErrorService,
              private dialog: MatDialog,
              private controllerApiService: ControllerApiService,
              private snackBarService: SnackBarService) {
    this.crawlJobOptions = this.route.snapshot.data.options.crawlJobs;
    this.reload = new Subject<void>();
    this.reload$ = this.reload.asObservable();
  }

  ngOnInit() {
    const queryParam = this.route.queryParamMap.pipe(
      debounceTime(0), // synchronize
      map(queryParamMap => ({
        jobExecutionId: queryParamMap.get('job_execution_id'),
        jobId: queryParamMap.get('job_id'), // query template
        seedId: queryParamMap.get('seed_id'), // query template
        hasError: queryParamMap.get('has_error'), // list request
        startTimeTo: queryParamMap.get('start_time_to'), // list request
        startTimeFrom: queryParamMap.get('start_time_from'), // list request
        stateList: queryParamMap.getAll('state'), // list request
        sort: queryParamMap.get('sort'), // list request
        pageSize: queryParamMap.get('s'), // list request
        pageIndex: queryParamMap.get('p'), // list request
        watch: queryParamMap.get('watch'), // list request
      })),
      share(),
    );

    const watch$ = queryParam.pipe(
      map(({watch}) => watch),
      distinctUntilChanged());

    const jobId$ = queryParam.pipe(
      map(({jobId}) => jobId),
      distinctUntilChanged());

    const jobExecutionId$ = queryParam.pipe(
      map(({jobExecutionId}) => jobExecutionId),
      distinctUntilChanged());

    const seedId$ = queryParam.pipe(
      map(({seedId}) => seedId),
      distinctUntilChanged());

    const stateList$: Observable<CrawlExecutionState[]> = queryParam.pipe(
      map(({stateList}) => stateList),
      distinctUntilArrayChanged);

    const hasError$: Observable<boolean> = queryParam.pipe(
      map(({hasError}) => hasError === 'true'),
      distinctUntilChanged(),
    );

    const startTimeTo$: Observable<string> = queryParam.pipe(
      map(({startTimeTo}) => startTimeTo),
      map(date => date && isValidDate(new Date(date)) ? date : null),
      distinctUntilChanged(),
    );

    const startTimeFrom$: Observable<string> = queryParam.pipe(
      map(({startTimeFrom}) => startTimeFrom),
      map(date => date && isValidDate(new Date(date)) ? date : null),
      distinctUntilChanged(),
    );

    const sort$: Observable<Sort> = queryParam.pipe(
      map(({sort}) => {
        if (!sort) {
          return null;
        }
        const parts = sort.split(':');
        const s = {active: parts[0], direction: parts[1]};
        return s.direction ? s : null;
      }),
      distinctUntilChanged<Sort>((p, q) => p && q ? p.direction === q.direction && p.active === q.active : p === q),
      shareReplay(1),
    );

    const sortDirection$ = sort$.pipe(
      map(sort => (sort ? sort.direction : '') as SortDirection),
    );

    const sortActive$ = sort$.pipe(
      map(sort => sort ? sort.active : ''),
    );

    const pageSize$ = queryParam.pipe(
      map(({pageSize}) => parseInt(pageSize, 10) || 25),
      distinctUntilChanged(),
      shareReplay(1)
    );

    const pageIndex$ = queryParam.pipe(
      map(({pageIndex}) => parseInt(pageIndex, 10) || 0),
      distinctUntilChanged(),
      shareReplay(1),
    );

    const query$: Observable<CrawlExecutionStatusQuery> = combineLatest([
      jobId$, jobExecutionId$, seedId$, stateList$, sortActive$, sortDirection$, pageIndex$, pageSize$, hasError$,
      startTimeFrom$, startTimeTo$, watch$, this.reload$.pipe(startWith(null as string))
    ]).pipe(
      debounceTime<any>(0),
      map(([jobId, jobExecutionId, seedId, stateList, active, direction, pageIndex, pageSize,
             hasError, startTimeFrom, startTimeTo, watch]) => ({
        jobId,
        jobExecutionId,
        stateList,
        seedId,
        active,
        direction,
        pageIndex,
        pageSize,
        hasError,
        startTimeFrom,
        startTimeTo,
        watch,
      })),
      share(),
    );

    this.query$ = query$;
    this.pageIndex$ = pageIndex$;
    this.pageSize$ = pageSize$;
    this.sortActive$ = sortActive$;
    this.sortDirection$ = sortDirection$;
  }

  onQueryChange(query: Partial<CrawlExecutionStatusQuery>) {
    const queryParams = {
      state: query.stateList || null,
      seed_id: query.seedId || null,
      job_id: query.jobId || null,
      job_execution_id: query.jobExecutionId || null,
      start_time_to: query.startTimeTo || null,
      start_time_from: query.startTimeFrom || null,
      has_error: query.hasError || null,
      watch: query.watch || null
    };
    this.router.navigate([], {relativeTo: this.route, queryParams})
      .catch(error => this.errorService.dispatch(error));
  }

  onSort(sort: Sort) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {sort: sort.active && sort.direction ? `${sort.active}:${sort.direction}` : null}
    }).catch(error => this.errorService.dispatch(error));
  }

  onPage(page: PageEvent) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {p: page.pageIndex, s: page.pageSize}
    }).catch(error => this.errorService.dispatch(error));
  }

  isDone(item: CrawlExecutionStatus): boolean {
    return CrawlExecutionStatus.DONE_STATES.includes(item.state);
  }

  canAbort(state: CrawlExecutionState) {
    return !CrawlExecutionStatus.DONE_STATES.includes(state);
  }

  onAbortCrawlExecution(crawlExecutionStatus: CrawlExecutionStatus) {
    const dialogRef = this.dialog.open(AbortCrawlDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: {crawlExecutionStatus}
    });
    dialogRef.afterClosed()
      .subscribe(executionId => {
        if (executionId) {
          this.controllerApiService.abortCrawlExecution(executionId).subscribe(crawlExecStatus => {
            if (crawlExecStatus.state === CrawlExecutionState.ABORTED_MANUAL) {
              this.snackBarService.openSnackBar('Crawl aborted');
              this.reload.next(null);
            }
          });
        }
      });
  }
}
