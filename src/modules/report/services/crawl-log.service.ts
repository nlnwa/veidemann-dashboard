import {Injectable} from '@angular/core';
import {LogApiService} from '../../core/services';
import {Observable} from 'rxjs';
import {CrawlLog} from '../../../shared/models/log';
import {FieldMask, CrawlLogListRequest} from '../../../api';
import {LoadingService} from '../../../shared/services';
import {Detail, Page, Sort, Watch} from '../../../shared/func';
import {Getter, Searcher} from '../../../shared/directives';


export interface CrawlLogQuery extends Page, Sort, Watch {
  jobExecutionId: string;
  executionId: string;
}


@Injectable()
export class CrawlLogService extends LoadingService
  implements Getter<CrawlLog>, Searcher<CrawlLogQuery, CrawlLog> {

  constructor(private logApiService: LogApiService) {
    super();
  }

  static getListRequest(query: CrawlLogQuery): CrawlLogListRequest {
    const listRequest = new CrawlLogListRequest();
    const queryTemplate = new CrawlLog();
    const fieldMask = new FieldMask();

    listRequest.setOffset(query.pageIndex * query.pageSize);
    listRequest.setPageSize(query.pageSize);

    if (query.jobExecutionId) {
      queryTemplate.jobExecutionId = query.jobExecutionId;
      fieldMask.addPaths('jobExecutionId');
    }

    if (query.executionId) {
      queryTemplate.executionId = query.executionId;
      fieldMask.addPaths('executionId');
    }

    if (fieldMask.getPathsList().length > 0) {
      listRequest.setQueryTemplate(CrawlLog.toProto(queryTemplate));
      listRequest.setQueryMask(fieldMask);
    }

    if (query.watch) {
      listRequest.setWatch(query.watch);
    }

    if (query.direction) {
      listRequest.setOrderByPath(query.active);
      listRequest.setOrderDescending(query.direction === 'desc');
    }

    return listRequest;
  }


  get(query: Detail): Observable<CrawlLog> {
    const listRequest = new CrawlLogListRequest();
    listRequest.addWarcId(query.id);
    return this.logApiService.listCrawlLogs(listRequest);
  }

  search(query: CrawlLogQuery): Observable<CrawlLog> {
    return this.load(this.logApiService.listCrawlLogs(CrawlLogService.getListRequest(query)));
  }
}
