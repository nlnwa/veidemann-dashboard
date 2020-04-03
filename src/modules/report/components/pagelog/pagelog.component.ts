import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {PageLog} from '../../../../shared/models/report/pagelog.model';
import {ListDataSource} from '../../../../shared/models/list-datasource';
import {ConfigListComponent} from '../../../config/components';
import {ActivatedRoute, Router} from '@angular/router';
import {PageLogQuery, PageLogService} from '../../services/pagelog.service';
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
import {ListItem} from '../../../commons/components/base-list/base-list';
import {AppConfigService, ErrorService} from '../../../core/services';
import {SortDirection} from '@angular/material/sort';
import {Sort} from '../../../commons/services/query.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-pagelog',
  templateUrl: './pagelog.component.html',
  styleUrls: ['./pagelog.component.css']
})
export class PageLogComponent implements OnDestroy, AfterViewInit {

  // query form
  form: FormGroup;

  pageLength$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  sortDirection$: Observable<SortDirection>;
  sortActive$: Observable<string>;

  pageLog: Subject<PageLog>;
  pageLog$: Observable<PageLog>;

  dataSource: ListDataSource<PageLog>;

  @ViewChild('list') list: ConfigListComponent;

  private ngUnsubscribe = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private pageLogService: PageLogService,
              private errorService: ErrorService,
              public appConfigService: AppConfigService) {
    this.createQueryForm();

    this.pageLog = new Subject<PageLog>();
    this.pageLog$ = this.pageLog.asObservable();

    this.dataSource = new ListDataSource<PageLog>();

    const routeParam$ = route.queryParamMap.pipe(
      debounceTime(0), // synchronize
      map(queryParaMap => ({
        warcId: queryParaMap.get('warc_id'),
        uri: queryParaMap.get('uri'),
        executionId: queryParaMap.get('execution_id'),
        jobExecutionId: queryParaMap.get('job_execution_id'),
        sort: queryParaMap.get('sort'),
        pageSize: queryParaMap.get('s'),
        pageIndex: queryParaMap.get('p'),
        watch: queryParaMap.get('watch'),
      })),
      share(),
    );

    const warcId$ = routeParam$.pipe(
      map(({warcId}) => warcId),
      distinctUntilChanged());

    const watch$ = routeParam$.pipe(
      map(({watch}) => watch),
      distinctUntilChanged());

    const executionId$ = routeParam$.pipe(
      map(({executionId}) => executionId),
      distinctUntilChanged());

    const jobExecutionId$ = routeParam$.pipe(
      map(({jobExecutionId}) => jobExecutionId),
      distinctUntilChanged());

    const uri$ = routeParam$.pipe(
      map(({uri}) => uri),
      distinctUntilChanged());

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

    this.pageSize$ = pageSize$;

    this.pageIndex$ = pageIndex$;

    const init$ = of(null).pipe(
      distinctUntilChanged(),
    );

    const query$: Observable<PageLogQuery> = combineLatest([uri$, jobExecutionId$, executionId$, sort$,
      watch$, pageIndex$, pageSize$, init$
    ]).pipe(
      debounceTime<any>(0),
      map(([uri, jobExecutionId, executionId, sort, watch, pageIndex, pageSize]) => ({
        uri,
        jobExecutionId,
        executionId,
        sort,
        watch,
        pageIndex,
        pageSize
      })),
      share()
    );

    const searchComplete = new Subject<void>();

    const countQuery$ = searchComplete.pipe(
      withLatestFrom(query$),
      map(([_, query]) => query),
      distinctUntilChanged((a: PageLogQuery, b: PageLogQuery) =>
        // only count when these query parameters change
        (a.uri === b.uri
          && a.executionId === b.executionId
          && a.jobExecutionId === b.jobExecutionId
        )),
    );

    this.pageLength$ = countQuery$.pipe(
      switchMap(query => (query.executionId || query.jobExecutionId)
        ? this.pageLogService.count(query)
        : of(this.dataSource.length)
      ));

    query$.pipe(
      tap(query => this.updateQueryForm(query)),
      tap(() => this.dataSource.clear()),
      switchMap(query => this.pageLogService.search(query).pipe(
        // let us know when search is complete so we can determine
        // pageLength and fool the paginator (no counting for crawlExecutions in API)
        finalize(() => searchComplete.next())
      )),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(pageLog => this.dataSource.add(pageLog));

    warcId$.pipe(
      switchMap(warcId => warcId ? this.pageLogService.get(warcId) : of(null)),
      tap(s => {
        if (s === null) {
          this.list.reset();
        }
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(pageLog => this.pageLog.next(pageLog));
  }

  ngAfterViewInit(): void {
    this.form.valueChanges.subscribe(value => {
      const queryParams = {
        uri: value.uri || null,
        job_execution_id: value.jobExecutionId || null,
        execution_id: value.executionId || null,
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
        queryParams: {warc_id: item.id},
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
      jobExecutionId: '',
      executionId: '',
      uri: '',
    });
  }

  private updateQueryForm(query: PageLogQuery): void {
    this.form.patchValue(query, {emitEvent: false});
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
