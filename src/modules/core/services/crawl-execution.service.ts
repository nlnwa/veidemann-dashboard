import {ErrorHandler, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ConfigObject, CrawlExecutionState, CrawlExecutionStatus} from '../../../shared/models';
import {map} from 'rxjs/operators';
import {Detail, handleError, marshalTimestamp, Page, Sort, Watch} from '../../../shared/func';
import {Getter, Searcher} from '../../../shared/directives';
import {ReportApiService} from './api/report-api.service';
import {CrawlExecutionsListRequest} from '../../../api/report/v1/report_pb';
import {FieldMask} from '../../../api/commons/v1/resources_pb';

export interface CrawlExecutionStatusQuery extends Page, Sort, Watch {
  jobId: string;
  jobExecutionId: string;
  seedId: string;
  stateList: CrawlExecutionState[];
  hasError: boolean;
  startTimeTo: string;
  startTimeFrom: string;
}

@Injectable()
export class CrawlExecutionService
  implements Searcher<CrawlExecutionStatusQuery, CrawlExecutionStatus>, Getter<CrawlExecutionStatus> {

  private readonly cache: Map<string, Observable<ConfigObject>>;

  constructor(private reportApiService: ReportApiService,
              private errorHandler: ErrorHandler) {
    this.cache = new Map();
  }

  get(query: Detail & Watch): Observable<CrawlExecutionStatus> {
    const listRequest = new CrawlExecutionsListRequest();
    listRequest.addId(query.id);
    listRequest.setWatch(query.watch);
    return this.reportApiService.listCrawlExecutions(listRequest).pipe(
      map(CrawlExecutionStatus.fromProto),
    );
  }

  search(query: CrawlExecutionStatusQuery): Observable<CrawlExecutionStatus> {
    return this.reportApiService.listCrawlExecutions(this.getListRequest(query)).pipe(
      map(CrawlExecutionStatus.fromProto),
      handleError(this.errorHandler, null),);
  }

  private getListRequest(query: CrawlExecutionStatusQuery): CrawlExecutionsListRequest {
    const listRequest = new CrawlExecutionsListRequest();
    const queryTemplate = new CrawlExecutionStatus();
    const fieldMask = new FieldMask();

    listRequest.setOffset(query.pageIndex * query.pageSize);
    listRequest.setPageSize(query.pageSize);

    if (query.jobId) {
      queryTemplate.jobId = query.jobId;
      fieldMask.addPaths('jobId');
    }

    if (query.jobExecutionId) {
      queryTemplate.jobExecutionId = query.jobExecutionId;
      fieldMask.addPaths('jobExecutionId');
    }

    if (query.seedId) {
      queryTemplate.seedId = query.seedId;
      fieldMask.addPaths('seedId');
    }

    if (fieldMask.getPathsList().length > 0) {
      listRequest.setQueryTemplate(CrawlExecutionStatus.toProto(queryTemplate));
      listRequest.setQueryMask(fieldMask);
    }

    if (query.hasError) {
      listRequest.setHasError(query.hasError);
    }

    if (query.startTimeTo) {
      listRequest.setStartTimeTo(marshalTimestamp(query.startTimeTo));
    }

    if (query.startTimeFrom) {
      listRequest.setStartTimeFrom(marshalTimestamp(query.startTimeFrom));
    }

    if (query.stateList.length) {
      listRequest.setStateList(query.stateList.map(state => state.valueOf()));
    }

    if (query.watch) {
      listRequest.setWatch(query.watch);
    }

    if (query.direction && query.active) {
      listRequest.setOrderByPath(query.active);
      listRequest.setOrderDescending(query.direction === 'desc');
    }

    return listRequest;
  }
}
