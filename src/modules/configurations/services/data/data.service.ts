import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, from, Observable, of, Subject, Subscription} from 'rxjs';
import {ConfigObject, ConfigRef, Kind} from '../../../commons/models';
import {DataSource} from '@angular/cdk/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {distinctUntilChanged, filter, finalize, ignoreElements, map, mergeMap, share, switchMap, takeUntil, tap} from 'rxjs/operators';
import {FieldMask, GetLabelKeysRequest, LabelKeysResponse, ListRequest, UpdateRequest} from '../../../../api';
import {BackendService} from '../../../core/services';


export interface Pager {
  pageSize: number;
  pageIndex: number;
}

export function createListRequest(kind: Kind): ListRequest {
  const listRequest = new ListRequest();
  listRequest.setKind(kind.valueOf());
  return listRequest;
}

export function pageListRequest(listRequest, pager: Pager): ListRequest {
  listRequest.setOffset(pager.pageIndex * pager.pageSize);
  listRequest.setPageSize(pager.pageSize);
  return listRequest;
}

export function withIds(listRequest, ids: string[]) {
  listRequest.setIdList(ids);
  return listRequest;
}

export function withNameRegex(listRequest, regexp: string): ListRequest {
  listRequest.setNameRegex(regexp);
  return listRequest;
}

export function nameQuery(listRequest, term: string): ListRequest {
  if (!term) {
    return listRequest;
  }
  return withNameRegex(listRequest, '.*' + term + '.*');
}

export function labelQuery(listRequest, term: string) {
  listRequest.setLabelSelectorList([term]);
  return listRequest;
}

@Injectable()
export class DataService implements DataSource<ConfigObject>, OnDestroy {

  private renderData: Subject<ConfigObject[]> = new Subject();

  private pageChangeSubscription: Subscription = Subscription.EMPTY;

  private dataChangeSubscription: Subscription = Subscription.EMPTY;

  private countSubscription: Subscription = Subscription.EMPTY;

  protected loading: Subject<boolean> = new Subject<boolean>();

  // tslint:disable-next-line:variable-name
  protected _kind: Kind;

  // tslint:disable-next-line:variable-name
  protected _data: BehaviorSubject<ConfigObject[]> = new BehaviorSubject([]);

  // tslint:disable-next-line:variable-name
  protected _paginator: MatPaginator | null;

  protected countCache = {};

  protected isCountable = true;

  protected ngUnsubscribe = new Subject();

  loading$: Observable<boolean>;

  constructor(protected backendService: BackendService) {
    this.loading$ = this.loading.asObservable().pipe(
      distinctUntilChanged()
    );
  }

  get pageLength(): number {
    const kind = this._kind ? this._kind.valueOf() : Kind.UNDEFINED;
    return this.countCache[kind] || 0;
  }

  set pageLength(length: number) {
    this.countCache[this._kind.valueOf()] = length;
    this._paginator.length = length;
  }

  get data() {
    return this._data.value;
  }

  set kind(kind: Kind) {
    this._kind = kind;
    this.reset();
    this.resetPaginator();
  }

  set paginator(paginator: MatPaginator) {
    this._paginator = paginator;
    this.updateChangeSubscription();
    this.resetPaginator();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  connect(): Observable<ConfigObject[]> {
    return this.renderData;
  }

  disconnect(): void {
  }

  reset() {
    this._data.next([]);
  }

  resetPaginator() {
    if (this._paginator) {
      this._paginator.pageIndex = 0;
      this._paginator.length = 0;
      this._paginator._changePageSize(this._paginator.pageSize);
    }
  }

  get(configRef: ConfigRef): Observable<ConfigObject> {
    this.loading.next(true);
    return this.backendService.get(ConfigRef.toProto(configRef))
      .pipe(
        map(configObject => ConfigObject.fromProto(configObject)),
        finalize(() => this.loading.next(false))
      );
  }

  list(page: PageEvent): Observable<ConfigObject> {
    this.loading.next(true);
    return this.backendService.list(pageListRequest(createListRequest(this._kind), page))
      .pipe(
        map(configObject => ConfigObject.fromProto(configObject)),
        tap(configObject => this.add(configObject)),
        finalize(() => this.loading.next(false))
      );
  }

  save(configObject: ConfigObject): Observable<ConfigObject> {
    this.loading.next(true);
    return this._save(configObject)
      .pipe(finalize(() => this.loading.next(false)));
  }

  saveMultiple(configObjects: ConfigObject[]) {
    this.loading.next(true);
    return from(configObjects).pipe(
      mergeMap(configObject => this._save(configObject)),
      finalize(() => this.loading.next(false)),
    );
  }

  update(configObject): Observable<ConfigObject> {
    this.loading.next(true);
    return this.backendService.save(ConfigObject.toProto(configObject))
      .pipe(
        map(newConfig => ConfigObject.fromProto(newConfig)),
        tap(newConfig => this.replace(newConfig)),
        finalize(() => this.loading.next(false))
      );
  }

  updateWithTemplate(updateTemplate: ConfigObject, paths: string[], ids?: string[]): Observable<number> {
    const listRequest = createListRequest(updateTemplate.kind.valueOf());

    if (ids && ids.length) {
      listRequest.setIdList(ids);
    }

    const updateMask = new FieldMask();
    updateMask.setPathsList(paths);

    const updateRequest = new UpdateRequest();
    updateRequest.setListRequest(listRequest);
    updateRequest.setUpdateTemplate(ConfigObject.toProto(updateTemplate));
    updateRequest.setUpdateMask(updateMask);

    this.loading.next(true);
    return this.backendService.update(updateRequest).pipe(
      map(updateResponse => updateResponse.getUpdated()),
      finalize(() => this.loading.next(false))
    );
  }


  delete(configObject: ConfigObject): Observable<boolean> {
    this.loading.next(true);
    return this._delete(configObject)
      .pipe(
        finalize(() => {
          this.resetPaginator();
          this.loading.next(false);
        })
      );
  }

  deleteMultiple(configObjects: ConfigObject[]): Observable<boolean> {
    this.loading.next(true);
    return from(configObjects).pipe(
      mergeMap((configObject) => this._delete(configObject)),
      finalize(() => {
        this.resetPaginator();
        this.loading.next(false);
      })
    );
  }

  protected _save(configObject: ConfigObject): Observable<ConfigObject> {
    return this.backendService.save(ConfigObject.toProto(configObject))
      .pipe(
        map(newConfig => ConfigObject.fromProto(newConfig)),
        tap(newConfig => this.add(newConfig)),
        tap(() => this.incrementCount())
      );
  }

  protected _delete(configObject: ConfigObject): Observable<boolean> {
    return this.backendService.delete(ConfigObject.toProto(configObject))
      .pipe(
        map(deleteResponse => deleteResponse.getDeleted()),
        tap(deleted => deleted && this.remove(configObject)),
        tap(deleted => deleted && this.decrementCount())
      );
  }

  protected count(): Observable<number> {
    if (this.pageLength) {
      return of(this.pageLength);
    }
    if (this._kind) {
      return this.backendService.count(createListRequest(this._kind.valueOf()))
        .pipe();
    } else {
      return of(0);
    }
  }

  protected hasPage(pageEvent: PageEvent): boolean {
    return this.data.length > pageEvent.pageIndex * pageEvent.pageSize;
  }

  /**
   * Returns a paged splice of the provided data array according to the provided MatPaginator's page
   * index and length. If there is no paginator provided, returns the data array as provided.
   */
  protected getPage(page: PageEvent): ConfigObject[] {
    const startIndex = page.pageIndex * page.pageSize;
    return this.data.slice().splice(startIndex, page.pageSize);
  }

  protected fetchPage(page: PageEvent): Observable<ConfigObject> {
    return this.list(page);
  }

  protected add(configObject: ConfigObject) {
    this._data.next(this._data.value.concat(configObject));
  }

  protected replace(configObject: ConfigObject) {
    const index = this.data.findIndex(c => c.id === configObject.id);
    this.data[index] = configObject;
    this._data.next(this.data);
  }

  protected remove(configObject: ConfigObject) {
    const index = this._data.value.findIndex(c => c.id === configObject.id);
    if (index !== -1) {
      this.data.splice(index, 1);
      this._data.next(this.data);
    }
  }

  protected getPagerPage(): PageEvent {
    return this._paginator
      ? {
        pageIndex: this._paginator.pageIndex,
        pageSize: this._paginator.pageSize,
        previousPageIndex: 0,
        length: 0
      }
      : null;
  }

  private incrementCount() {
    this.pageLength += 1;
  }

  private decrementCount() {
    this.pageLength -= 1;
  }

  private updateChangeSubscription() {
    const pageChange = this._paginator ? this._paginator.page : of(null);

    const pageChange$ = pageChange.pipe(
      filter(pageEvent => !!pageEvent),
      share()
    );

    this.countSubscription.unsubscribe();
    this.countSubscription = pageChange$.pipe(
      filter((pageEvent: PageEvent) =>
        this.isCountable && pageEvent.previousPageIndex === 0 && pageEvent.pageIndex === 0),
      switchMap(() => this.count()),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(count => this.pageLength = count);

    this.pageChangeSubscription.unsubscribe();
    this.pageChangeSubscription = pageChange$.pipe(
      switchMap(pageEvent => {
        if (this.hasPage(pageEvent)) {
          return of(this.getPage(pageEvent));
        } else {
          return this.fetchPage(pageEvent).pipe(
            ignoreElements(),
            map(() => this.getPage(pageEvent))
          );
        }
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(data => this.renderData.next(data));

    const data$ = this._data.asObservable();

    this.dataChangeSubscription.unsubscribe();
    this.dataChangeSubscription = data$.pipe(
      map(() => this.getPagerPage()),
      filter(pageEvent => !!pageEvent),
      map(pageEvent => this.getPage(pageEvent)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(data => this.renderData.next(data));
  }
}
