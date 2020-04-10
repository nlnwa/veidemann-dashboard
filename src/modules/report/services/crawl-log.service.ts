import {Injectable} from '@angular/core';
import {QueryService, Sort} from '../../commons/services/query.service';
import {ReportApiService} from '../../core/services';
import {Observable} from 'rxjs';
import {CrawlLog} from '../../../shared/models/report';
import {CrawlLogListRequest} from '../../../api/gen/report/v1/report_pb';
import {FieldMask} from '../../../api';

export interface CrawlLogQuery {
  jobExecutionId: string;
  executionId: string;
  sort: Sort;
  pageSize: number;
  pageIndex: number;
  watch: boolean;
}


@Injectable()
export class CrawlLogService extends QueryService {
  constructor(private reportApiService: ReportApiService) {
    super();
  }

  get(warcId: string): Observable<CrawlLog> {
    const listRequest = new CrawlLogListRequest();
    listRequest.addWarcId(warcId);
    return this.reportApiService.listCrawlLogs(listRequest);
  }

  search(query: CrawlLogQuery): Observable<CrawlLog> {
    return this.load(this.reportApiService.listCrawlLogs(this.getListRequest(query)));
  }

  private getListRequest(query: CrawlLogQuery): CrawlLogListRequest {
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

    if (query.sort) {
      listRequest.setOrderByPath(query.sort.active);
      listRequest.setOrderDescending(query.sort.direction === 'desc');
    }

    return listRequest;
  }
}
