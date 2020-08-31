import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, map, share, shareReplay, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {SortDirection} from '@angular/material/sort';
import {JobExecutionState, jobExecutionStates} from '../../../../shared/models/report';
import {ListItem} from '../../../../shared/models/list-datasource';
import {PageEvent} from '@angular/material/paginator';
import {JobExecutionService, JobExecutionStatusQuery} from '../../services';
import {ErrorService} from '../../../core/services';
import {distinctUntilArrayChanged, isValidDate, Sort} from '../../../../shared/func';
import {ConfigObject} from '../../../../shared/models/config';

@Component({
  selector: 'app-job-execution',
  templateUrl: './job-execution.component.html',
  styleUrls: ['./job-execution.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobExecutionComponent implements OnInit {
  readonly jobExecutionStates = jobExecutionStates;
  readonly JobExecutionState = JobExecutionState;
  readonly crawlJobOptions: ConfigObject[];

  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  sortDirection$: Observable<SortDirection>;
  sortActive$: Observable<string>;

  private query: JobExecutionStatusQuery;
  query$: Observable<JobExecutionStatusQuery>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private jobExecutionService: JobExecutionService,
              private errorService: ErrorService) {

    this.crawlJobOptions = this.route.snapshot.data.options.crawlJobs;

  }

  ngOnInit(): void {
    const routeParam$ = this.route.queryParamMap.pipe(
      debounceTime(0), // synchronize
      map(queryParamMap => ({
        startTimeTo: queryParamMap.get('start_time_to'), // list request
        startTimeFrom: queryParamMap.get('start_time_from'), // list request
        jobId: queryParamMap.get('job_id'), // query template
        stateList: queryParamMap.getAll('state'), // list request
        sort: queryParamMap.get('sort'), // list request
        pageSize: queryParamMap.get('s'), // list request
        pageIndex: queryParamMap.get('p'), // list request
        watch: queryParamMap.get('watch'), // list request
      })),
      share(),
    );

    const watch$ = routeParam$.pipe(
      map(({watch}) => watch),
      distinctUntilChanged());

    const jobId$ = routeParam$.pipe(
      map(({jobId}) => jobId),
      distinctUntilChanged());

    const stateList$: Observable<JobExecutionState[]> = routeParam$.pipe(
      map(({stateList}) => stateList),
      distinctUntilArrayChanged);

    const startTimeTo$: Observable<string> = routeParam$.pipe(
      map(({startTimeTo}) => startTimeTo),
      map(date => date && isValidDate(new Date(date)) ? date : null),
      distinctUntilChanged(),
    );

    const startTimeFrom$: Observable<string> = routeParam$.pipe(
      map(({startTimeFrom}) => startTimeFrom),
      map(date => date && isValidDate(new Date(date)) ? date : null),
      distinctUntilChanged(),
    );

    const sort$: Observable<Sort> = routeParam$.pipe(
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

    const pageSize$ = routeParam$.pipe(
      map(({pageSize}) => parseInt(pageSize, 10) || 25),
      distinctUntilChanged(),
      shareReplay(1)
    );

    const pageIndex$ = routeParam$.pipe(
      map(({pageIndex}) => parseInt(pageIndex, 10) || 0),
      distinctUntilChanged(),
      shareReplay(1),
    );

    this.sortDirection$ = sort$.pipe(
      map(sort => (sort ? sort.direction : '') as SortDirection));

    this.sortActive$ = sort$.pipe(
      map(sort => sort ? sort.active : ''));

    this.pageSize$ = pageSize$;

    this.pageIndex$ = pageIndex$;

    const init$ = of(null).pipe(
      distinctUntilChanged(),
    );

    const query$: Observable<JobExecutionStatusQuery> = combineLatest([
      jobId$, stateList$, sort$, pageIndex$, pageSize$, startTimeFrom$,
      startTimeTo$, watch$, init$
    ]).pipe(
      debounceTime<any>(0),
      map(([jobId, stateList, sort, pageIndex, pageSize, startTimeFrom,
             startTimeTo, watch]) => ({
        jobId,
        stateList,
        sort,
        pageIndex,
        pageSize,
        startTimeFrom,
        startTimeTo,
        watch,
      })),
    );

    this.query$ = query$.pipe(
      tap(query => this.query = query)
    );
    // id$.pipe(
    //   switchMap(id => id ? this.jobExecutionService.get(id) : of(null)),
    //   tap(s => {
    //     if (s === null) {
    //       this.list.reset();
    //     }
    //   }),
    //   takeUntil(this.ngUnsubscribe)
    // ).subscribe(jobExecutionStatus => this.jobExecutionStatus.next(jobExecutionStatus));
  }

  onQueryChange(value: Partial<JobExecutionStatusQuery>) {
    const startTimeTo = value.startTimeTo && isValidDate(new Date(value.startTimeTo))
      ? new Date(value.startTimeTo).toISOString()
      : null;
    const startTimeFrom = value.startTimeFrom && isValidDate(new Date(value.startTimeFrom))
      ? new Date(value.startTimeFrom).toISOString()
      : null;
    const queryParams = {
      state: value.stateList && value.stateList.length ? value.stateList : null,
      job_id: value.jobId || null,
      start_time_to: startTimeTo,
      start_time_from: startTimeFrom,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams,
    }).catch(error => this.errorService.dispatch(error));
  }

  get loading$(): Observable<boolean> {
    return this.jobExecutionService.loading$;
  }

  onShowRunning() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {state: JobExecutionState.RUNNING}
    }).catch(error => this.errorService.dispatch(error));
  }

  onToggleWatch() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {watch: !this.query.watch || null}
    }).catch(error => this.errorService.dispatch(error));
  }

  onSelectedChange(item: ListItem | ListItem[]) {
    if (!Array.isArray(item)) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {id: item.id},
      }).catch(error => this.errorService.dispatch(error));
    }
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

}
