import {ConfigObject, Kind} from '../../commons/models';
import {FieldMask, ListRequest} from '../../../api';

export interface Pager {
  pageSize: number;
  pageIndex: number;
}

export interface Sort {
  active: string;
  direction: string;
}

export interface Query {
  kind: Kind;
  entityId: string;
  scheduleId: string;
  crawlConfigId: string;
  collectionId: string;
  browserConfigId: string;
  politenessId: string;
  crawlJobIdList: string[];
  scriptIdList: string[];
  term: string;
  sort: Sort;
  pageSize: number;
  pageIndex: number;
}

export function createListRequest(kind: Kind): ListRequest {
  const listRequest = new ListRequest();
  listRequest.setKind(kind.valueOf());
  return listRequest;
}

export function pageListRequest(listRequest: ListRequest, pager: Pager): ListRequest {
  if (!pager) {
    return listRequest;
  }
  listRequest.setOffset(pager.pageIndex * pager.pageSize);
  listRequest.setPageSize(pager.pageSize);
  return listRequest;
}

export function withIds(listRequest, ids: string[]): ListRequest {
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
  // TODO make sure it is ok to prefix/postfix with ".*"
  return withNameRegex(listRequest, '.*' + term + '.*');
}

export function labelQuery(listRequest, term: string): ListRequest {
  listRequest.setLabelSelectorList([term]);
  return listRequest;
}

export function withQueryTemplate(listRequest: ListRequest, queryTemplate: ConfigObject, queryMask: FieldMask): ListRequest {
  listRequest.setQueryTemplate(ConfigObject.toProto(queryTemplate));
  listRequest.setQueryMask(queryMask);
  return listRequest;
}

export function withSort(listRequest: ListRequest, sort: Sort): ListRequest {
  listRequest.setOrderByPath('meta.' + sort.active);
  listRequest.setOrderDescending(sort.direction === 'desc');
  return listRequest;
}
