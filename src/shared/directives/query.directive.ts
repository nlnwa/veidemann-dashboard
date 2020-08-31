import {Directive, InjectionToken, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {BaseList, ConfigRef, ListDataSource, ListItem} from '../models';
import {DetailQuery} from '../func';
import {Loader} from '../services';
import {BaseListComponent} from '../../modules/commons/components';

export interface Getter<T extends ListItem> extends Loader {
  get(query: DetailQuery | string | ConfigRef): Observable<T>;
}

export interface Searcher<S, T extends ListItem> extends Loader {
  search(query: S): Observable<T>;
}

export const BASE_LIST = new InjectionToken<BaseList<any>>('base.list');

@Directive()
export abstract class QueryDirective<S, T extends ListItem> implements OnInit, OnChanges, OnDestroy {

  protected readonly ngUnsubscribe: Subject<void>;
  protected subject: Subject<S>;
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.query) {
      this.dataSource.clear();
      this.list.reset();
      this.subject.next(this.query);
    }
  }

  ngOnInit(): void {
    this.subject.pipe(
      switchMap(query => this.service.search(query)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(item => this.dataSource.add(item));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
