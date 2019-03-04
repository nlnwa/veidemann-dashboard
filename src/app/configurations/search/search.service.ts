import {merge, Observable} from 'rxjs';
import {ConfigObject, Kind} from '../../commons/models';
import {ConfigObjectProto, ListRequest, SeedProto} from '../../../api';
import {BackendService} from '../shared/backend.service';
import {map, mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {labelQuery, nameQuery, ofKind, paged, Pager} from '../shared/data.service';


/* tslint:disable:no-bitwise */
export enum ResultType {
  EntityName = 1 << 0,
  EntityLabel = 1 << 1,
  SeedName = 1 << 2,
  SeedLabel = 1 << 3,
}

const entityNameType = (item: any) => applyType(item, ResultType.EntityName);
const entityLabelType = (item: any) => applyType(item, ResultType.EntityLabel);
const seedNameType = (item: any) => applyType(item, ResultType.SeedName);
const seedLabelType = (item: any) => applyType(item, ResultType.SeedLabel);

const applyType = (item: any, type: ResultType) => {
  item.type = type;
  return item;
};

interface Search extends Pager {
  term: string;
}


@Injectable()
export class SearchService {

  history = {
    // 'he': {pageIndex, pageSize}
  };

  constructor(private backendService: BackendService) {
  }

  search(term: string = '', {pageIndex = 0, pageSize = 0} = {}): Observable<ConfigObject> {
    const pager = {pageIndex, pageSize};

    const entityName$: Observable<ConfigObject> = this.backendService.list(nameQuery(paged(ofKind(Kind.CRAWLENTITY), pager), term))
      .pipe(
        map(configObject => ConfigObject.fromProto(configObject)),
        map(configObject => entityNameType(configObject))
      );

    const entityLabel$: Observable<ConfigObject> = this.backendService.list(labelQuery(paged(ofKind(Kind.CRAWLENTITY), pager), term))
      .pipe(
        map(configObject => ConfigObject.fromProto(configObject)),
        map(configObject => entityLabelType(configObject))
      );

    const seedLabel$: Observable<ConfigObject> = this.backendService.list(labelQuery(paged(ofKind(Kind.SEED), pager), term))
      .pipe(
        mergeMap(seed => {
          const listRequest = new ListRequest();
          listRequest.setKind(Kind.CRAWLENTITY.valueOf());
          listRequest.setIdList([seed.getId()]);
          return this.backendService.list(listRequest).pipe(
            map(configObject => ConfigObject.fromProto(configObject)),
            map(configObject => seedLabelType(configObject))
          );
        }));

    const seedName$: Observable<ConfigObject> = this.backendService.list(nameQuery(paged(ofKind(Kind.SEED), pager), term))
      .pipe(mergeMap((seed: ConfigObjectProto) => {
          const listRequest = new ListRequest();
          listRequest.setKind(Kind.CRAWLENTITY.valueOf());
          listRequest.setIdList([seed.getId()]);
          return this.backendService.list(listRequest).pipe(
            map((entity: ConfigObjectProto) => ConfigObject.fromProto(entity)),
            map(configObject => seedNameType(configObject))
          );
        })
      );


    return term.length > 1 ? merge(entityName$, entityLabel$, seedLabel$, seedName$) : entityName$;
  }
}
