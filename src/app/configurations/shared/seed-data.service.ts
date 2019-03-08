import {BackendService} from './backend.service';
import {ConfigObject, ConfigRef, Kind} from '../../commons/models';
import {DataService, ofKind, paged} from './data.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {FieldMask, ListRequest, UpdateRequest} from '../../../api';


function withQueryTemplate(listRequest: ListRequest, queryTemplate: ConfigObject, queryMask: FieldMask) {
  listRequest.setQueryTemplate(ConfigObject.toProto(queryTemplate));
  listRequest.setQueryMask(queryMask);
  return listRequest;
}

@Injectable()
export class SeedDataService extends DataService {

  set ref(configRef: ConfigRef) {
    this.configRef = configRef;
    this.clear();
    if (this._paginator) {
      this._paginator._changePageSize(this._paginator.pageSize);
    }
  }

  configRef: ConfigRef;

  constructor(protected backendService: BackendService) {
    super(backendService);
    this._kind = Kind.SEED;
  }


  list(): Observable<ConfigObject> {
    const queryTemplate = new ConfigObject({kind: Kind.SEED});
    queryTemplate.seed.entityRef = this.configRef;
    const queryMask = new FieldMask();
    queryMask.setPathsList(['seed.entityRef']);

    return this.backendService.list(withQueryTemplate(paged(ofKind(this._kind), {
      pageIndex: this._paginator.pageIndex,
      pageSize: this._paginator.pageSize
    }), queryTemplate, queryMask)).pipe(
      map(configObject => ConfigObject.fromProto(configObject)),
      tap(configObject => this.add(configObject))
    );
  }

  save(configObject: ConfigObject): Observable<ConfigObject> {
    configObject.seed.entityRef = this.configRef;
    return super.save(configObject);
  }

  updateWithTemplate(updateTemplate: ConfigObject, paths: string[], ids?: string[]): Observable<number> {
    const queryTemplate = new ConfigObject({kind: Kind.SEED});
    queryTemplate.seed.entityRef = this.configRef;
    const queryMask = new FieldMask();
    queryMask.setPathsList(['seed.entityRef']);

    const listRequest = withQueryTemplate(ofKind(updateTemplate.kind.valueOf()),
      queryTemplate, queryMask);

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
}
