import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {PageLog} from '../../../../shared/models/report/pagelog.model';
import {ListDataSource, ListItem} from '../../../../shared/models/list-datasource';
import {ActivatedRoute, Router} from '@angular/router';
import {PageLogQuery, PageLogService} from '../../services/pagelog.service';
import {debounceTime, distinctUntilChanged, map, share, shareReplay} from 'rxjs/operators';
import {AppConfigService, ErrorService} from '../../../core/services';
import {SortDirection} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '../../../../shared/func';
import {BASE_LIST} from '../../../../shared/directives';
import {PageLogListComponent} from '../../components';

@Component({
  selector: 'app-pagelog',
  templateUrl: './pagelog.component.html',
  styleUrls: ['./pagelog.component.css'],
  providers: [
    ListDataSource,
    {
      provide: BASE_LIST,
      useClass: PageLogListComponent,
    }
  ],
})
export class PageLogComponent implements OnInit {

  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  sortDirection$: Observable<SortDirection>;
  sortActive$: Observable<string>;
  query$: Observable<PageLogQuery>;

  pageLog: Subject<PageLog>;
  pageLog$: Observable<PageLog>;

  get loading$(): Observable<boolean> {
    return this.pageLogService.loading$;
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private pageLogService: PageLogService,
              private errorService: ErrorService,
              public appConfigService: AppConfigService) {
    this.pageLog = new Subject<PageLog>();
    this.pageLog$ = this.pageLog.asObservable();
  }

  ngOnInit(): void {
    const routeParam$ = this.route.queryParamMap.pipe(
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

    // const warcId$ = routeParam$.pipe(
    //   map(({warcId}) => warcId),
    //   distinctUntilChanged());

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

    const init$ = of(null).pipe(
      distinctUntilChanged(),
    );

    const query$: Observable<PageLogQuery> = combineLatest([uri$, jobExecutionId$, executionId$, sortActive$,
      sortDirection$, watch$, pageIndex$, pageSize$, init$
    ]).pipe(
      debounceTime<any>(0),
      map(([uri, jobExecutionId, executionId, active, direction, watch, pageIndex, pageSize]) => ({
        uri, jobExecutionId, executionId, active, direction, watch, pageIndex, pageSize
      })),
      share()
    );

    this.pageSize$ = pageSize$;
    this.pageIndex$ = pageIndex$;
    this.query$ = query$;
    //
    // warcId$.pipe(
    //   switchMap(warcId => warcId ? this.pageLogService.get(warcId) : of(null)),
    //   tap(s => {
    //     if (s === null) {
    //       this.list.reset();
    //     }
    //   }),
    //   takeUntil(this.ngUnsubscribe)
    // ).subscribe(pageLog => this.pageLog.next(pageLog));
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
