import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {SortDirection} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorService} from '../../../core/services';
import {CrawlLogQuery, CrawlLogService} from '../../services';
import {debounceTime, distinctUntilChanged, map, share, shareReplay} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '../../../../shared/func';

@Component({
  selector: 'app-crawl-log',
  templateUrl: './crawl-log.component.html',
  styleUrls: ['./crawl-log.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlLogComponent implements OnInit {

  pageLength$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  sortDirection$: Observable<SortDirection>;
  sortActive$: Observable<string>;
  query$: Observable<CrawlLogQuery>;

  get loading$(): Observable<boolean> {
    return this.crawlLogService.loading$;
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private crawlLogService: CrawlLogService,
              private errorService: ErrorService) {
  }

  ngOnInit(): void {
    const queryParams = this.route.queryParamMap.pipe(
      debounceTime(0),
      map(queryParaMap => ({
        jobExecutionId: queryParaMap.get('job_execution_id'), // query template
        executionId: queryParaMap.get('execution_id'), // query template
        sort: queryParaMap.get('sort'), // list request
        pageSize: queryParaMap.get('s'), // list request
        pageIndex: queryParaMap.get('p'), // list request
        watch: queryParaMap.get('watch'), // list request
      })),
      share(),
    );

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
      shareReplay(1),
    );

    const pageIndex$ = queryParams.pipe(
      map(({pageIndex}) => parseInt(pageIndex, 10) || 0),
      distinctUntilChanged(),
      shareReplay(1),
    );

    const sortDirection$ = sort$.pipe(
      map(sort => (sort ? sort.direction : '') as SortDirection));

    const sortActive$ = sort$.pipe(
      map(sort => sort ? sort.active : ''));

    const query$: Observable<CrawlLogQuery> = combineLatest([
      executionId$, jobExecutionId$, sortActive$, sortDirection$, pageSize$, pageIndex$, watch$
    ]).pipe(
      debounceTime<any>(0),
      map(([executionId, jobExecutionId, active, direction, pageSize, pageIndex, watch]) => ({
        executionId,
        jobExecutionId,
        active,
        direction,
        pageSize,
        pageIndex,
        watch,
      })),
      share(),
    );

    this.sortActive$ = sortActive$;
    this.sortDirection$ = sortDirection$;
    this.pageSize$ = pageSize$;
    this.pageIndex$ = pageIndex$;
    this.query$ = query$;
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

  onQueryChange(query: Partial<CrawlLogQuery>) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        p: query.pageIndex || null,
        s: query.pageSize || null,
        job_execution_id: query.jobExecutionId || null,
        execution_id: query.executionId || null,
        watch: query.watch || null
      },
    }).catch(error => this.errorService.dispatch(error));
  }
}
