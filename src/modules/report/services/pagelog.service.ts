import {Injectable} from '@angular/core';
import {ConfigObject} from '../../../shared/models/config';
import {LogApiService} from '../../core/services';
import {Observable} from 'rxjs';
import {PageLog} from '../../../shared/models/log';
import {FieldMask, PageLogListRequest} from '../../../api';
import {LoadingService} from '../../../shared/services';
import {Detail, Page, Sort, Watch} from '../../../shared/func';
import {Getter} from '../../../shared/directives';

export interface PageLogQuery extends Page, Sort, Watch {
  uri: string;
  executionId: string;
  jobExecutionId: string;
  // offset: number;
  // orderByPath: string;
  // orderDescending: boolean;
}

@Injectable()
export class PageLogService extends LoadingService implements Getter<PageLog> {
  private readonly cache: Map<string, ConfigObject>;

  constructor(private logApiService: LogApiService) {
    super();
    this.cache = new Map();
  }

  get(query: Detail): Observable<PageLog> {
    const listRequest = new PageLogListRequest();
    listRequest.addWarcId(query.id);
    return this.logApiService.listPageLogs(listRequest);
  }

  search(query: PageLogQuery): Observable<PageLog> {
    return this.load(this.logApiService.listPageLogs(this.getListRequest(query)));
  }

  private getListRequest(query: PageLogQuery): PageLogListRequest {
    const listRequest = new PageLogListRequest();
    const queryTemplate = new PageLog();
    const fieldMask = new FieldMask();

    listRequest.setOffset(query.pageIndex * query.pageSize);
    listRequest.setPageSize(query.pageSize);

    if (query.executionId) {
      queryTemplate.executionId = query.executionId;
      fieldMask.addPaths('executionId');
    }

    if (query.jobExecutionId) {
      queryTemplate.jobExecutionId = query.jobExecutionId;
      fieldMask.addPaths('jobExecutionId');
    }

    if (query.uri) {
      queryTemplate.uri = query.uri;
      fieldMask.addPaths('uri');
    }

    if (fieldMask.getPathsList().length > 0) {
      listRequest.setQueryTemplate(PageLog.toProto(queryTemplate));
      listRequest.setQueryMask(fieldMask);
    }

    if (query.watch) {
      listRequest.setWatch(query.watch);
    }

    if (query.active && query.direction) {
      listRequest.setOrderByPath(query.active);
      listRequest.setOrderDescending(query.direction === 'desc');
    }

    return listRequest;
  }
}
