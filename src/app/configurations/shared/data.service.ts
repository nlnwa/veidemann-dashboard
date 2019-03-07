/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {ConfigObject, ConfigRef, Kind} from '../../commons/models';
import {DataSource} from '@angular/cdk/table';
import {MatPaginator, PageEvent} from '@angular/material';
import {filter, map, tap} from 'rxjs/operators';
import {DeleteResponse, FieldMask, ListRequest, UpdateRequest} from '../../../api';
import {BackendService} from './backend.service';


export interface Pager {
  pageSize: number;
  pageIndex: number;
}

export function ofKind(kind: Kind): ListRequest {
  const listRequest = new ListRequest();
  listRequest.setKind(kind.valueOf());
  return listRequest;
}

export function paged(listRequest, pager: Pager): ListRequest {
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
export class DataService extends DataSource<ConfigObject> {

  protected _kind: Kind;

  protected _data = new BehaviorSubject<ConfigObject[]>([]);
  private _renderChangesSubscription: Subscription = Subscription.EMPTY;
  private _pageChangeSubscription: Subscription = Subscription.EMPTY;
  private _renderData: Subject<ConfigObject[]> = new Subject();
  protected _paginator: MatPaginator | null;

  reset = new EventEmitter<void>();

  constructor(protected backendService: BackendService) {
    super();
    this.updateChangeSubscription();
  }


  get data() {
    return this._data.value;
  }

  set kind(kind: Kind) {
    this._kind = kind;
    this.clear();

    if (this._paginator) {
      this.reset.emit();
      this._paginator.pageIndex = 0;
      this._paginator._changePageSize(this._paginator.pageSize);
    }
  }

  set paginator(paginator: MatPaginator) {
    this._paginator = paginator;
    this.updateChangeSubscription();
    this._paginator._changePageSize(this._paginator.pageSize);
  }

  get (id: string, kind: Kind): Observable<ConfigObject> {
    const config = new ConfigRef();
    config.kind = kind;
    config.id = id;
    return this.backendService.get(config.toProto())
      .pipe(
        map( configObject => ConfigObject.fromProto(configObject))
      );
  }

  list(): Observable<ConfigObject> {
    console.debug('dataService.list', Kind[this._kind]);
    return this.backendService.list(paged(ofKind(this._kind), {
      pageIndex: this._paginator.pageIndex,
      pageSize: this._paginator.pageSize
    })).pipe(
      map(configObject => ConfigObject.fromProto(configObject)),
      tap(configObject => this.add(configObject))
    );
  }

  save(configObject: ConfigObject): Observable<ConfigObject> {
    return this.backendService.save(ConfigObject.toProto(configObject))
      .pipe(
        map(newConfig => ConfigObject.fromProto(newConfig)),
        tap(newConfig => this.add(newConfig))
      );
  }

  update(configObject): Observable<ConfigObject> {
    return this.backendService.save(ConfigObject.toProto(configObject))
      .pipe(
        map(newConfig => ConfigObject.fromProto(newConfig)),
        tap(newConfig => this.replace(newConfig))
      );
  }

  updateWithTemplate(updateTemplate: ConfigObject, paths: string[], ids?: string[]): Observable<number> {
    const listRequest = new ListRequest();
    listRequest.setKind(updateTemplate.kind.valueOf());

    if (ids && ids.length) {
      listRequest.setIdList(ids);
    }

    const updateMask = new FieldMask();
    updateMask.setPathsList(paths);

    const updateRequest = new UpdateRequest();
    updateRequest.setListRequest(listRequest);
    updateRequest.setUpdateTemplate(ConfigObject.toProto(updateTemplate));
    updateRequest.setUpdateMask(updateMask);

    return this.backendService.update(updateRequest).pipe(
      map(updateResponse => updateResponse.getUpdated()),
      // TODO find another way to reset than resetting kind
      // tap(() => this.kind = this._kind)
    );
  }

  delete(configObject: ConfigObject): Observable<DeleteResponse> {
    return this.backendService.delete(ConfigObject.toProto(configObject)).pipe(
      tap(() => this.remove(configObject))
    );
  }

  private updateChangeSubscription() {
    const pageChange: Observable<PageEvent> = this._paginator ? this._paginator.page : of(null);

    this._pageChangeSubscription.unsubscribe();
    this._pageChangeSubscription = pageChange.pipe(
      filter(pageEvent => !!pageEvent)
    ).subscribe(pageEvent => this.onPage(pageEvent));

    const dataStream = this._data;

    // Watched for paged data changes and send the result to the table to render.
    this._renderChangesSubscription.unsubscribe();
    this._renderChangesSubscription = dataStream.pipe(
      map((data) => this._pageData(data))
    ).subscribe(data => this._renderData.next(data));
  }

  /**
   * Returns a paged splice of the provided data array according to the provided MatPaginator's page
   * index and length. If there is no paginator provided, returns the data array as provided.
   */
  _pageData(data: ConfigObject[]): ConfigObject[] {
    if (!this._paginator) {
      return data;
    }
    this._paginator.length = data.length > 0 ? data.length + 1 : 0;

    const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
    return data.slice().splice(startIndex, this._paginator.pageSize);
  }

  protected onPage(pageEvent: PageEvent) {
    console.debug(Kind[this._kind], ':', pageEvent);
    this.list().subscribe();
  }

  protected add(configObject: ConfigObject) {
    if (this._data.value.some(c => c.id === configObject.id)) {
      this._data.next(this._data.value);
    } else {
      this._data.next(this._data.value.concat(configObject));
    }
  }

  protected replace(configObject: ConfigObject) {
    const index = this.data.findIndex(c => c.id === configObject.id);
    this.data[index] = configObject;
    this._data.next(this.data);
  }

  protected remove(configObject: ConfigObject) {
    const index = this._data.value.findIndex(c => c.id === configObject.id);
    this.data.splice(index, 1);
    this._data.next(this.data);
  }

  clear() {
    this._data.next([]);
  }

  connect(): Observable<ConfigObject[]> {
    return this._renderData;
  }

  disconnect(): void {

  }
}
