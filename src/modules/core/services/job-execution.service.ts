import {ErrorHandler, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Detail, handleError, marshalTimestamp, Page, Sort, Watch} from '../../../shared/func';
import {Getter, Searcher} from '../../../shared/directives';
import {JobExecutionState, JobExecutionStatus} from '../../../shared/models';
import {JobExecutionsListRequest} from '../../../api/report/v1/report_pb';
import {FieldMask} from '../../../api/commons/v1/resources_pb';
import {ReportApiService} from './api/report-api.service';

export interface JobExecutionStatusQuery extends Page, Sort, Watch {
  jobId: string;
  stateList: JobExecutionState[];
  startTimeTo: string;
  startTimeFrom: string;
}

@Injectable({providedIn: 'root'})
export class JobExecutionService
  implements Searcher<JobExecutionStatusQuery, JobExecutionStatus>, Getter<JobExecutionStatus> {

  constructor(private reportApiService: ReportApiService,
              private errorHandler: ErrorHandler) {
  }

  get(query: Detail): Observable<JobExecutionStatus> {
    const listRequest = new JobExecutionsListRequest();
    listRequest.addId(query.id);
    listRequest.setWatch(query.watch);
    return this.reportApiService.listJobExecutions(listRequest).pipe(
      map(JobExecutionStatus.fromProto),
      handleError(this.errorHandler, null));
  }


  search(query: JobExecutionStatusQuery): Observable<JobExecutionStatus> {
    return this.reportApiService.listJobExecutions(JobExecutionService.parseQuery(query)).pipe(
      map(JobExecutionStatus.fromProto),
      handleError(this.errorHandler, null));
  }

  private static parseQuery(query: JobExecutionStatusQuery): JobExecutionsListRequest {
    const request = new JobExecutionsListRequest();
    const template = new JobExecutionStatus();
    const mask = new FieldMask();

    request.setOffset(query.pageIndex * query.pageSize);
    request.setPageSize(query.pageSize);

    if (query.jobId) {
      template.jobId = query.jobId;
      mask.addPaths('jobId');
    }

    if (mask.getPathsList().length > 0) {
      request.setQueryTemplate(JobExecutionStatus.toProto(template));
      request.setQueryMask(mask);
    }

    if (query.startTimeTo) {
      request.setStartTimeTo(marshalTimestamp(query.startTimeTo));
    }

    if (query.startTimeFrom) {
      request.setStartTimeFrom(marshalTimestamp(query.startTimeFrom));
    }

    if (query.stateList.length) {
      request.setStateList(query.stateList.map(state => state.valueOf()));
    }

    if (query.watch) {
      request.setWatch(query.watch);
    }


    if (query.direction && query.active) {
      request.setOrderByPath(query.active);
      request.setOrderDescending(query.direction === 'desc');
    }

    return request;
  }
}
