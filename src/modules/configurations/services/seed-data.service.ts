import {BackendService} from '../../core/services';
import {ConfigObject, ConfigRef, Kind} from '../../commons/models';
import {DataService, ofKind, paged} from './data.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';
import {FieldMask, ListRequest} from '../../../api';


function withQueryTemplate(listRequest: ListRequest, queryTemplate: ConfigObject, queryMask: FieldMask) {
  listRequest.setQueryTemplate(ConfigObject.toProto(queryTemplate));
  listRequest.setQueryMask(queryMask);
  return listRequest;
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
    this.reset();
  }

  list(): Observable<ConfigObject> {
    this.loading.next(true);
    return this.backendService.list(this.withConfigRef(paged(ofKind(this._kind), {
      pageIndex: this._paginator.pageIndex,
      pageSize: this._paginator.pageSize
    }))).pipe(
      map(configObject => ConfigObject.fromProto(configObject)),
      tap(configObject => {
        if (configObject.seed.entityRef.id === this.configRef.id) {
          this.add(configObject);
        }
      }),
      finalize(() => this.loading.next(false)),
    );
  }

  save(configObject: ConfigObject): Observable<ConfigObject> {
    configObject.seed.entityRef = this.configRef;
    return super.save(configObject);
  }

  move(configObject: ConfigObject): Observable<number> {
    const updateTemplate = new ConfigObject({kind: Kind.SEED});
    const seed = updateTemplate.seed;

    seed.entityRef = new ConfigRef(this.configRef);
    const pathList = ['seed.entityRef'];

    return this.updateWithTemplate(updateTemplate, pathList, [configObject.id]);
  }

  seedsOfEntity(configObject: ConfigObject): any {
    const listRequest = new ListRequest();

    const queryMask = new FieldMask();
    queryMask.setPathsList(['seed.entityRef']);

    const queryTemplate = new ConfigObject({kind: Kind.SEED});
    queryTemplate.seed.entityRef = configObject.seed.entityRef;

    listRequest.setIdList([]);
    listRequest.setQueryMask(queryMask);
    listRequest.setKind(Kind.SEED.valueOf());
    listRequest.setQueryTemplate(ConfigObject.toProto(queryTemplate));

    return this.backendService.count(listRequest);
  }

  protected count(): Observable<number> {
    if (this.countCache[this._kind.valueOf()] !== undefined) {
      this._paginator.length = this.countCache[this._kind.valueOf()];
      this.pageLength = this.countCache[this._kind.valueOf()];
      return of(this.pageLength);
    }
    return this.backendService.count(this.withConfigRef(ofKind(this._kind.valueOf()))).pipe(
      tap(countOfKind => {
        this.countCache[this._kind.valueOf()] = countOfKind;
        this.pageLength = countOfKind;
        this._paginator.length = countOfKind;
      })
    );
  }

  private withConfigRef(listRequest: ListRequest): ListRequest {
    return withQueryTemplate(listRequest, this.getQueryTemplate(), this.getQueryMask());
  }

  private getQueryMask(): FieldMask {
    const queryMask = new FieldMask();
    queryMask.setPathsList(['seed.entityRef']);
    return queryMask;
  }

  private getQueryTemplate(): ConfigObject {
    const queryTemplate = new ConfigObject({kind: Kind.SEED});
    queryTemplate.seed.entityRef = this.configRef;
    return queryTemplate;
  }
}
