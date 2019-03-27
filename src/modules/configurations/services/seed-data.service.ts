import {BackendService} from '../../core/services';
import {ConfigObject, ConfigRef, Kind} from '../../commons/models';
import {DataService, ofKind, paged} from './data.service';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';
import {FieldMask, ListRequest, UpdateRequest} from '../../../api';


function withQueryTemplate(listRequest: ListRequest, queryTemplate: ConfigObject, queryMask: FieldMask) {
  listRequest.setQueryTemplate(ConfigObject.toProto(queryTemplate));
  listRequest.setQueryMask(queryMask);
  return listRequest;
}

@Injectable()
export class SeedDataService extends DataService {

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

  updateWithTemplate(updateTemplate: ConfigObject, paths: string[], ids?: string[]): Observable<number> {
    const listRequest = this.withConfigRef(ofKind(updateTemplate.kind.valueOf()));

    const updateMask = new FieldMask();
    updateMask.setPathsList(paths);

    const updateRequest = new UpdateRequest();
    updateRequest.setListRequest(listRequest);
    updateRequest.setUpdateTemplate(ConfigObject.toProto(updateTemplate));
    updateRequest.setUpdateMask(updateMask);

    return this.backendService.update(updateRequest).pipe(
      map(updateResponse => updateResponse.getUpdated()),
      tap(() => this.kind = this._kind)
    );
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
