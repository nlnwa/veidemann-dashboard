import {ErrorHandler, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PageLog} from '../../../shared/models';
import {Detail, handleError, Page, Sort, Watch} from '../../../shared/func';
import {Getter} from '../../../shared/directives';
import {PageLogListRequest} from '../../../api/log/v1/log_pb';
import {map} from 'rxjs/operators';
import {FieldMask} from '../../../api/commons/v1/resources_pb';
import {LogApiService} from './api/log-api.service';

export interface PageLogQuery extends Page, Sort, Watch {
  uri: string;
  executionId: string;
  jobExecutionId: string;
  // offset: number;
  // orderByPath: string;
  // orderDescending: boolean;
}

@Injectable({providedIn: 'root'})
export class PageLogService implements Getter<PageLog> {

  constructor(private logApiService: LogApiService,
              private errorHandler: ErrorHandler) {
  }

  get(query: Detail): Observable<PageLog> {
    const listRequest = new PageLogListRequest();
    listRequest.addWarcId(query.id);
    return this.logApiService.listPageLogs(listRequest).pipe(
      map(PageLog.fromProto),
      handleError(this.errorHandler, null));
  }

  search(query: PageLogQuery): Observable<PageLog> {
    return this.logApiService.listPageLogs(PageLogService.getListRequest(query)).pipe(
      map(PageLog.fromProto),
      handleError(this.errorHandler, null));
  }

  private static getListRequest(query: PageLogQuery): PageLogListRequest {
    const request = new PageLogListRequest();
    const template = new PageLog();
    const mask = new FieldMask();

    request.setOffset(query.pageIndex * query.pageSize);
    request.setPageSize(query.pageSize);

    if (query.executionId) {
      template.executionId = query.executionId;
      mask.addPaths('executionId');
    }

    if (query.jobExecutionId) {
      template.jobExecutionId = query.jobExecutionId;
      mask.addPaths('jobExecutionId');
    }

    if (query.uri) {
      template.uri = query.uri;
      mask.addPaths('uri');
    }

    if (mask.getPathsList().length > 0) {
      request.setQueryTemplate(PageLog.toProto(template));
      request.setQueryMask(mask);
    }

    if (query.watch) {
      request.setWatch(query.watch);
    }

    if (query.active && query.direction) {
      request.setOrderByPath(query.active);
      request.setOrderDescending(query.direction === 'desc');
    }

    return request;
  }
}
