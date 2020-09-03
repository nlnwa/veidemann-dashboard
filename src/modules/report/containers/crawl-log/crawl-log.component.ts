import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {SortDirection} from '@angular/material/sort';
import {CrawlLog, ListDataSource, ListItem} from '../../../../shared/models';
import {ActivatedRoute, Router} from '@angular/router';
import {AppConfigService, ErrorService} from '../../../core/services';
import {CrawlLogQuery, CrawlLogService} from '../../services';
import {debounceTime, distinctUntilChanged, map, share, shareReplay, switchMap, takeUntil, tap} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {CrawlLogListComponent} from '../../components';
import {Sort} from '../../../../shared/func';

@Component({
  selector: 'app-crawl-log',
  templateUrl: './crawl-log.component.html',
  styleUrls: ['./crawl-log.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlLogComponent implements OnInit, OnDestroy {

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
              private crawlLogService: CrawlLogService,
              private errorService: ErrorService,
              public appConfigService: AppConfigService) {

    this.crawlLog = new Subject<CrawlLog>();
    this.crawlLog$ = this.crawlLog.asObservable();

  }

  get loading$(): Observable<boolean> {
    return this.crawlLogService.loading$;
  }

  ngOnInit(): void {
    const queryParams = this.route.queryParamMap.pipe(
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

    const id$ = queryParams.pipe(
      map(({id}) => id),
      distinctUntilChanged());

    const watch$ = queryParams.pipe(
      map(({watch}) => watch),
      distinctUntilChanged());

    const jobExecutionId$ = queryParams.pipe(
      map(({jobExecutionId}) => jobExecutionId),
      distinctUntilChanged());

    const executionId$ = queryParams.pipe(
      map(({executionId}) => executionId),
      distinctUntilChanged());

    const sort$: Observable<Sort> = queryParams.pipe(
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

    const pageSize$ = queryParams.pipe(
      map(({pageSize}) => parseInt(pageSize, 10) || 25),
      distinctUntilChanged(),
      shareReplay(1)
    );

    const pageIndex$ = queryParams.pipe(
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

    const query$: Observable<CrawlLogQuery> = combineLatest([
      executionId$, jobExecutionId$, sort$, pageSize$, pageIndex$, watch$, init$
    ]).pipe(
      debounceTime<any>(0),
      map(([executionId, jobExecutionId, sort, pageSize, pageIndex, watch]) => ({
        executionId,
        jobExecutionId,
        active: (sort as Sort).active,
        direction: (sort as Sort).direction,
        pageSize,
        pageIndex,
        watch,
      })),
    );

    id$.pipe(
      switchMap(id => id ? this.crawlLogService.get({id}) : of(null)),
      tap(s => {
        if (s === null) {
          this.list.reset();
        }
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(crawlLog => this.crawlLog.next(crawlLog));
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
}
