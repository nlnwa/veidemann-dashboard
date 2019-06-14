import {BackendService} from '../../../core/services';
import {ConfigObject, ConfigRef, Kind, Label} from '../../../commons/models';
import {createListRequest, DataService, pageListRequest} from './data.service';
import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {count, finalize, map, mergeMap, tap} from 'rxjs/operators';
import {FieldMask, ListRequest} from '../../../../api';
import {PageEvent} from '@angular/material/paginator';


export function withQueryTemplate(listRequest: ListRequest, queryTemplate: ConfigObject, queryMask: FieldMask) {
  listRequest.setQueryTemplate(ConfigObject.toProto(queryTemplate));
  listRequest.setQueryMask(queryMask);
  return listRequest;
}

export function withConfigRef(listRequest: ListRequest, configRef: ConfigRef): ListRequest {
  return withQueryTemplate(listRequest, getQueryTemplate(configRef), getQueryMask());
}

export function getQueryMask(): FieldMask {
  const queryMask = new FieldMask();
  queryMask.setPathsList(['seed.entityRef']);
  return queryMask;
}

export function getQueryTemplate(configRef: ConfigRef): ConfigObject {
  const queryTemplate = new ConfigObject({kind: Kind.SEED});
  queryTemplate.seed.entityRef = configRef;
  return queryTemplate;
}

@Injectable()
export class SeedDataService extends DataService {

  // entityRef
  private configRef: ConfigRef;

  constructor(protected backendService: BackendService) {
    super(backendService);
    this._kind = Kind.SEED;
  }

  set ref(configRef: ConfigRef) {
    this.configRef = configRef;
    delete this.countCache[Kind.SEED];
    this.reset();
    this.resetPaginator();
  }

  list(page: PageEvent): Observable<ConfigObject> {
    this.loading.next(true);
    return this.backendService.list(withConfigRef(pageListRequest(createListRequest(this._kind), page), this.configRef))
      .pipe(
        map(configObject => ConfigObject.fromProto(configObject)),
        tap(configObject => this.add(configObject)),
        finalize(() => this.loading.next(false))
      );
  }

  move(configObject: ConfigObject): Observable<number> {
    this.loading.next(true);
    return this._move(configObject)
      .pipe(finalize(() => this.loading.next(false)));
  }

  moveMultiple(configObjects: ConfigObject[]): Observable<number> {
    this.loading.next(true);
    return from(configObjects).pipe(
      mergeMap(configObject => this._move(configObject)),
      count(updated => !!updated),
      finalize(() => this.loading.next(false))
    );
  }

  protected _save(configObject: ConfigObject): Observable<ConfigObject> {
    return super._save(configObject);
  }

  protected add(configObject: ConfigObject) {
    super.add(configObject);
  }

  protected count(): Observable<number> {
    if (this.countCache[this._kind.valueOf()] !== undefined) {
      this._paginator.length = this.countCache[this._kind.valueOf()];
      this.pageLength = this.countCache[this._kind.valueOf()];
      return of(this.pageLength);
    }
    return this.backendService.count(withConfigRef(createListRequest(this._kind.valueOf()), this.configRef)).pipe(
      tap(countOfKind => {
        this.countCache[this._kind.valueOf()] = countOfKind;
        this.pageLength = countOfKind;
        this._paginator.length = countOfKind;
      })
    );
  }

  private _move(configObject: ConfigObject): Observable<number> {
    const refLabel = new Label({key: 'entityRef', value: configObject.seed.entityRef.id});
    const updateTemplate = new ConfigObject({kind: Kind.SEED});
    updateTemplate.meta.labelList = [refLabel];
    updateTemplate.seed.entityRef = new ConfigRef(this.configRef);
    const pathList = ['seed.entityRef', 'meta.label+'];

    return this.updateWithTemplate(updateTemplate, pathList, [configObject.id]);
  }
}
