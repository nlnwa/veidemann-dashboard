import {BackendService} from './backend.service';
import {ConfigObject, ConfigRef, Kind} from '../../commons/models';
import {DataService, ofKind, paged} from './data.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {FieldMask, ListRequest} from '../../../api';


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
}
