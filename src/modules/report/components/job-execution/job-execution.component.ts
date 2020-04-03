import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  share,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {Sort} from '../../../commons/services/query.service';
import {SortDirection} from '@angular/material/sort';
import {JobExecutionState, jobExecutionStates, JobExecutionStatus} from '../../../../shared/models/report';
import {ListDataSource} from '../../../../shared/models/list-datasource';
import {ListItem} from '../../../commons/components/base-list/base-list';
import {PageEvent} from '@angular/material/paginator';
import {JobExecutionService, JobExecutionStatusQuery} from '../../services';
import {ErrorService} from '../../../core/services';
import {distinctUntilArrayChanged, isValidDate} from '../../../../shared/func';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfigObject} from '../../../../shared/models/config';
import {JobExecutionStatusListComponent} from '../job-execution-status-list/job-execution-status-list.component';

@Component({
  selector: 'app-job-execution',
  templateUrl: './job-execution.component.html',
  styleUrls: ['./job-execution.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobExecutionComponent implements AfterViewInit, OnDestroy {
  readonly jobExecutionStates = jobExecutionStates;
  readonly JobExecutionState = JobExecutionState;
  readonly crawlJobOptions: ConfigObject[];

  // query form
  form: FormGroup;

  pageLength$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  sortDirection$: Observable<SortDirection>;
  sortActive$: Observable<string>;

  jobExecutionStatus: Subject<JobExecutionStatus>;
  jobExecutionStatus$: Observable<JobExecutionStatus>;

  dataSource: ListDataSource<JobExecutionStatus>;

  @ViewChild('list') list: JobExecutionStatusListComponent;

  private ngUnsubscribe = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private jobExecutionService: JobExecutionService,
              private errorService: ErrorService) {
    this.createQueryForm();

    this.crawlJobOptions = this.route.snapshot.data.options.crawlJobs;
    this.jobExecutionStatus = new Subject<JobExecutionStatus>();
    this.jobExecutionStatus$ = this.jobExecutionStatus.asObservable();

    this.dataSource = new ListDataSource<JobExecutionStatus>();

    const routeParam$ = route.queryParamMap.pipe(
      debounceTime(0), // synchronize
      map(queryParamMap => ({
        id: queryParamMap.get('id'), // list request
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

    const id$ = routeParam$.pipe(
      map(({id}) => id),
      distinctUntilChanged());

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
      map(({pageSize}) => parseInt(pageSize, 10) || 10),
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

    const searchComplete = new Subject<void>();

    this.pageLength$ = searchComplete.pipe(
      withLatestFrom(pageSize$, pageIndex$),
      map(([_, pageSize, pageIndex]) =>
        // we don't know real count of search so if length of data modulus pageSize is zero
        // we must add 1 to allow paginator to go to next page
        this.dataSource.length % pageSize === 0 ? ((pageIndex + 1) * this.dataSource.length) + 1 : this.dataSource.length));

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

    query$.pipe(
      tap(query => this.updateQueryForm(query)),
      tap(() => this.dataSource.clear()),
      switchMap(query => this.jobExecutionService.search(query).pipe(
        // let us know when search is complete so we can determine
        // pageLength and fool the paginator (no counting for crawlExecutions in API)
        finalize(() => searchComplete.next())
      )),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(jobExecutionStatus => this.dataSource.add(jobExecutionStatus));

    id$.pipe(
      switchMap(id => id ? this.jobExecutionService.get(id) : of(null)),
      tap(s => {
        if (s === null) {
          this.list.reset();
        }
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(jobExecutionStatus => this.jobExecutionStatus.next(jobExecutionStatus));
  }

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(value => {
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
        has_error: value.hasError === null ? null : value.hasError,
      };
      this.list.reset();
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {...queryParams, id: null}
      }).catch(error => this.errorService.dispatch(error));
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

  private createQueryForm(): void {
    this.form = this.fb.group({
      stateList: null,
      jobId: '',
      startTimeFrom: '',
      startTimeTo: '',
    });
  }

  private updateQueryForm(query: JobExecutionStatusQuery): void {
    this.form.patchValue(query, {emitEvent: false});
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
