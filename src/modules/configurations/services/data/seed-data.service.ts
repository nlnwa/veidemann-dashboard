import {BackendService} from '../../../core/services';
import {ConfigObject, ConfigRef, Kind, Label} from '../../../commons/models';
import {createListRequest, DataService, pageListRequest} from './data.service';
import {Injectable} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {catchError, count, finalize, map, mergeMap, takeUntil, tap} from 'rxjs/operators';
import {FieldMask, ListRequest} from '../../../../api';
import {PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material';


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

  dataSource: MatTableDataSource<ConfigObject>;

  constructor(protected backendService: BackendService) {
    super(backendService);
    this._kind = Kind.SEED;
    this.dataSource = new MatTableDataSource([]);
  }

  set ref(configRef: ConfigRef) {
    this.configRef = configRef;

    this.reset();

    if (this.configRef) {
      this.list()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe();
    }
  }

  reset() {
    this.dataSource.data = [];
  }

  reload() {
    this.reset();
    this.list().pipe(takeUntil(this.ngUnsubscribe)).subscribe();
  }

  list(page?: PageEvent): Observable<ConfigObject> {
    this.loading.next(true);
    return this.backendService.list(withConfigRef(createListRequest(this._kind), this.configRef))
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
    this.dataSource.data = this.dataSource.data.concat(configObject);
  }

  protected decrementCount() {
  }

  protected incrementCount() {
  }

  protected replace(configObject: ConfigObject) {
    const data = this.dataSource.data;
    const index = data.findIndex(c => c.id === configObject.id);
    data[index] = configObject;
    this.dataSource.data = data;
  }

  protected remove(configObject: ConfigObject) {
     this.dataSource.data = this.dataSource.data.filter(config => config !== configObject);
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
