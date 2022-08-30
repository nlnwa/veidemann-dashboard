import {Directive, InjectionToken, Input, OnChanges, OnDestroy, SimpleChanges} from '@angular/core';
import {switchMap, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {BaseList, ConfigRef, ListDataSource, ListItem} from '../models';
import {Detail} from '../func';

export interface Getter<T> {
  get(query: Detail | ConfigRef): Observable<T>;
}

export interface Searcher<S, T extends ListItem> {
  search(query: S): Observable<T>;
}

export const BASE_LIST = new InjectionToken<BaseList<any>>('base.list');

@Directive()
export abstract class LoaderDirective<S, T extends ListItem> implements OnChanges, OnDestroy {

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
    this.onLoad();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.query && this.query) {
      this.onQuery(changes.query.previousValue, changes.query.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  protected onLoad(): void {
    this.query$.pipe(
      switchMap(query => this.service.search(query)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(item => this.dataSource.add(item));
  }

  protected onQuery(previous: S, current: S): void {
    this.dataSource.clear();
    this.list.reset();
    this.list.clearSelection();
    this.subject.next(this.query);
  }
}
