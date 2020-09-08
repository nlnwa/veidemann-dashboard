import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, map, share, shareReplay} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import {SortDirection} from '@angular/material/sort';
import {JobExecutionState, jobExecutionStates} from '../../../../shared/models/report';
import {ListItem} from '../../../../shared/models';
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
  query$: Observable<JobExecutionStatusQuery>;

  get loading$(): Observable<boolean> {
    return this.jobExecutionService.loading$;
  }

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

    const sortDirection$ = sort$.pipe(
      map(sort => (sort ? sort.direction : '') as SortDirection));

    const sortActive$ = sort$.pipe(
      map(sort => sort ? sort.active : ''));

    const init$ = of(null);

    const query$: Observable<JobExecutionStatusQuery> = combineLatest([
      jobId$, stateList$, sortActive$, sortDirection$, pageIndex$, pageSize$, startTimeFrom$,
      startTimeTo$, watch$, init$
    ]).pipe(
      debounceTime<any>(0),
      map(([jobId, stateList, active, direction, pageIndex, pageSize, startTimeFrom,
             startTimeTo, watch]) => ({
        jobId,
        stateList,
        active,
        direction,
        pageIndex,
        pageSize,
        startTimeFrom,
        startTimeTo,
        watch,
      })),
      share()
    );

    this.pageSize$ = pageSize$;
    this.pageIndex$ = pageIndex$;
    this.sortActive$ = sortActive$;
    this.sortDirection$ = sortDirection$;
    this.query$ = query$;

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

  onQueryChange(query: Partial<JobExecutionStatusQuery>) {
    const queryParams = {
      state: query.stateList && query.stateList.length ? query.stateList : null,
      job_id: query.jobId || null,
      start_time_to: query.startTimeTo || null,
      start_time_from: query.startTimeFrom || null,
      watch: query.watch || null,
    };
    this.router.navigate([], {relativeTo: this.route, queryParams})
      .catch(error => this.errorService.dispatch(error));
  }

  onSelectedChange(item: ListItem | ListItem[]) {
    if (!Array.isArray(item)) {
      this.router.navigate([item.id], {
        relativeTo: this.route,
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
