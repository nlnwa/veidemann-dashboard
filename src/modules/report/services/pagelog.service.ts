import {Injectable} from '@angular/core';
import {QueryService, Sort} from '../../commons/services/query.service';
import {ConfigObject} from '../../../shared/models/config';
import {ReportApiService} from '../../core/services';
import {Observable} from 'rxjs';
import {PageLog} from '../../../shared/models/report';
import {PageLogListRequest} from '../../../api/gen/report/v1/report_pb';
import {FieldMask} from '../../../api';

export interface PageLogQuery {
  uri: string;
  executionId: string;
  jobExecutionId: string;
  pageSize: number;
  pageIndex: number;
  watch: boolean;
  sort: Sort;
 // offset: number;
 // orderByPath: string;
 // orderDescending: boolean;
}

@Injectable()
export class PageLogService extends QueryService {
  private readonly cache: Map<string, ConfigObject>;

  constructor(private reportApiService: ReportApiService){
    super();
    this.cache = new Map();
  }

  get(warcId: string): Observable<PageLog> {
    const listRequest = new PageLogListRequest();
    listRequest.addWarcId(warcId);
    return this.reportApiService.listPageLogs(listRequest);
  }

  search(query: PageLogQuery): Observable<PageLog> {
    return this.load(this.reportApiService.listPageLogs(this.getListRequest(query)));
  }

  count(query: PageLogQuery): Observable<number> {
    const request = this.getListRequest(query);
    return this.reportApiService.countPageLogs(request);
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

    if (query.sort) {
      listRequest.setOrderByPath(query.sort.active);
      listRequest.setOrderDescending(query.sort.direction === 'desc');
    }

    return listRequest;
  }
}
