import {ErrorHandler, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CrawlLog} from '../../../shared/models';
import {Detail, handleError, Page, Sort, Watch} from '../../../shared/func';
import {Getter, Searcher} from '../../../shared/directives';
import {CrawlLogListRequest} from '../../../api/log/v1/log_pb';
import {LogApiService} from './api/log-api.service';
import {map} from 'rxjs/operators';
import {FieldMask} from '../../../api/commons/v1/resources_pb';


export interface CrawlLogQuery extends Page, Sort, Watch {
  jobExecutionId: string;
  executionId: string;
}


@Injectable()
export class CrawlLogService
  implements Getter<CrawlLog>, Searcher<CrawlLogQuery, CrawlLog> {

  constructor(private logApiService: LogApiService,
              private errorHandler: ErrorHandler) {
  }

  static getListRequest(query: CrawlLogQuery): CrawlLogListRequest {
    const request = new CrawlLogListRequest();
    const template = new CrawlLog();
    const mask = new FieldMask();

    request.setOffset(query.pageIndex * query.pageSize);
    request.setPageSize(query.pageSize);

    if (query.jobExecutionId) {
      template.jobExecutionId = query.jobExecutionId;
      mask.addPaths('jobExecutionId');
    }

    if (query.executionId) {
      template.executionId = query.executionId;
      mask.addPaths('executionId');
    }

    if (mask.getPathsList().length > 0) {
      request.setQueryTemplate(CrawlLog.toProto(template));
      request.setQueryMask(mask);
    }

    if (query.watch) {
      request.setWatch(query.watch);
    }

    if (query.direction) {
      request.setOrderByPath(query.active);
      request.setOrderDescending(query.direction === 'desc');
    }

    return request;
  }

  get(query: Detail): Observable<CrawlLog> {
    const listRequest = new CrawlLogListRequest();
    listRequest.addWarcId(query.id);
    return this.logApiService.listCrawlLogs(listRequest).pipe(
      map(CrawlLog.fromProto),
      handleError(this.errorHandler, null));
  }

  search(query: CrawlLogQuery): Observable<CrawlLog> {
    return this.logApiService.listCrawlLogs(CrawlLogService.getListRequest(query)).pipe(
      map(CrawlLog.fromProto),
      handleError(this.errorHandler, null));
  }
}
