import {Injectable} from '@angular/core';
import {ReportApiService} from '../../core/services';
import {Observable} from 'rxjs';
import {CrawlLog} from '../../../shared/models/report';
import {CrawlLogListRequest} from '../../../api/gen/report/v1/report_pb';
import {FieldMask} from '../../../api';
import {LoadingService} from '../../../shared/services';
import {Detail, Page, Sort} from '../../../shared/func';
import {Getter, Searcher} from '../../../shared/directives';


export interface CrawlLogQuery extends Page, Sort {
  jobExecutionId: string;
  executionId: string;
  watch: boolean;
}


@Injectable()
export class CrawlLogService extends LoadingService
  implements Getter<CrawlLog>, Searcher<CrawlLogQuery, CrawlLog> {
  constructor(private reportApiService: ReportApiService) {
    super();
  }

  static getListRequest(query

                          :
                          CrawlLogQuery
  ):
    CrawlLogListRequest {
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
    return this.reportApiService.listCrawlLogs(listRequest);
  }

  search(query
           :
           CrawlLogQuery
  ):
    Observable<CrawlLog> {
    return this.load(this.reportApiService.listCrawlLogs(CrawlLogService.getListRequest(query)));
  }
}
