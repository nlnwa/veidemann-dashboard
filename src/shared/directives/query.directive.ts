import {Directive, InjectionToken, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {BaseList, ConfigRef, ListDataSource, ListItem} from '../models';
import {DetailQuery} from '../func';
import {Loader} from '../services';

export interface Getter<T extends ListItem> extends Loader {
  get(query: DetailQuery | ConfigRef): Observable<T>;
}

export interface Searcher<S, T extends ListItem> extends Loader {
  search(query: S): Observable<T>;
}

export const BASE_LIST = new InjectionToken<BaseList<any>>('base.list');

@Directive()
export abstract class QueryDirective<S, T extends ListItem> implements OnChanges, OnDestroy {

  protected readonly ngUnsubscribe: Subject<void>;
  protected subject: Subject<S>;
  // TODO use ReplaySubject and ngOnInit...
  protected query$: Observable<S>;

  @Input()
  query: S;

  protected constructor(protected service: Searcher<S, T>,
                        protected list: BaseList<T>,
                        protected dataSource: ListDataSource<T>) {
    this.ngUnsubscribe = new Subject();
    this.subject = new Subject<S>();
    this.query$ = this.subject.asObservable();
    list.dataSource = dataSource;
    this.onInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.query && this.query) {
      this.onQuery();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  protected onInit(): void {
    this.query$.pipe(
      switchMap(query => this.service.search(query)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(item => this.dataSource.add(item));
  }

  protected onQuery(): void {
    this.dataSource.clear();
    this.list.reset();
    this.subject.next(this.query);
  }
}
