import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {SortDirection} from '@angular/material/sort';
import {CrawlLog} from '../../../../shared/models/report/crawllog.model';
import {ListDataSource} from '../../../../shared/models/list-datasource';
import {ActivatedRoute, Router} from '@angular/router';
import {CrawlLogQuery, CrawlLogService} from '../../services/crawl-log.service';
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
import {Sort} from '../../../commons/services/query.service';
import {PageEvent} from '@angular/material/paginator';
import {AppConfigService, ErrorService} from '../../../core/services';
import {CrawlLogListComponent} from '../crawl-log-list/crawl-log-list.component';

@Component({
  selector: 'app-crawl-log',
  templateUrl: './crawl-log.component.html',
  styleUrls: ['./crawl-log.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlLogComponent implements OnInit, OnDestroy, AfterViewInit {

  // query form
  form: FormGroup;

  pageLength$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  sortDirection$: Observable<SortDirection>;
  sortActive$: Observable<string>;

  crawlLog: Subject<CrawlLog>;
  crawlLog$: Observable<CrawlLog>;

  dataSource: ListDataSource<CrawlLog>;

  @ViewChild('list') list: CrawlLogListComponent;

  private ngUnsubscribe = new Subject();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private crawlLogService: CrawlLogService,
              private errorService: ErrorService,
              public appConfigService: AppConfigService) {
    this.createQueryForm();

    this.crawlLog = new Subject<CrawlLog>();
    this.crawlLog$ = this.crawlLog.asObservable();

    this.dataSource = new ListDataSource<CrawlLog>();

    const routeParam$ = route.queryParamMap.pipe(
      debounceTime(0),
      map(queryParaMap => ({
        id: queryParaMap.get('id'), // list request
        jobExecutionId: queryParaMap.get('job_execution_id'), // query template
        executionId: queryParaMap.get('execution_id'), // query template
        sort: queryParaMap.get('sort'), // list request
        pageSize: queryParaMap.get('s'), // list request
        pageIndex: queryParaMap.get('p'), // list request
        watch: queryParaMap.get('watch'), // list request
      })),
      share(),
    );

    const id$ = routeParam$.pipe(
      map(({id}) => id),
      distinctUntilChanged());

    const watch$ = routeParam$.pipe(
      map(({watch}) => watch),
      distinctUntilChanged());

    const jobExecutionId$ = routeParam$.pipe(
      map(({jobExecutionId}) => jobExecutionId),
      distinctUntilChanged());

    const executionId$ = routeParam$.pipe(
      map(({executionId}) => executionId),
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

    const searchComplete = new Subject<void>();

    this.pageLength$ = searchComplete.pipe(
      withLatestFrom(pageSize$, pageIndex$),
      map(([_, pageSize, pageIndex]) =>
        // we don't know real count of search so if length of data modulus pageSize is zero
        // we must add 1 to allow paginator to go to next page
        this.dataSource.length % pageSize === 0 ? (pageIndex + 1) * this.dataSource.length + 1 : this.dataSource.length));

    this.pageSize$ = pageSize$;

    this.pageIndex$ = pageIndex$;

    const init$ = of(null).pipe(
      distinctUntilChanged(),
    );

    const query$: Observable<CrawlLogQuery> = combineLatest([
      executionId$, jobExecutionId$, sort$, pageSize$, pageIndex$, watch$, init$
    ]).pipe(
      debounceTime<any>(0),
      map(([executionId, jobExecutionId, sort, pageSize, pageIndex, watch]) => ({
        executionId,
        jobExecutionId,
        sort,
        pageSize,
        pageIndex,
        watch,
      })),
    );

    query$.pipe(
      tap(query => this.updateQueryForm(query)),
      tap(() => this.dataSource.clear()),
      switchMap(query => this.crawlLogService.search(query).pipe(
        // let us know when search is complete so we can determine
        // pageLength and fool the paginator (no counting for crawlLog in API)
        finalize(() => searchComplete.next())
      )),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(crawlLog => this.dataSource.add(crawlLog));

    id$.pipe(
      switchMap(id => id ? this.crawlLogService.get(id) : of(null)),
      tap(s => {
        if (s === null) {
          this.list.reset();
        }
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(crawlLog => this.crawlLog.next(crawlLog));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(value => {
      const queryParams = {
        execution_id: value.executionId || null,
        job_execution_id: value.jobExecutionId || null
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

  get loading$(): Observable<boolean> {
    return this.crawlLogService.loading$;
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
      jobExecutionId: '',
      executionId: ''
    });
  }

  private updateQueryForm(query: CrawlLogQuery): void {
    this.form.patchValue(query, {emitEvent: false});
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
