import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {FieldMask, JobExecutionsListRequest} from '../../../api';
import {ConfigObject, ConfigRef, JobExecutionState, JobExecutionStatus, Kind} from '../../../shared/models';
import {ReportApiService} from '../../core/services';
import {ConfigService} from '../../commons/services';
import {tap} from 'rxjs/operators';
import {Detail, Page, Sort, toTimestampProto, Watch} from '../../../shared/func';
import {LoadingService} from '../../../shared/services';
import {Getter, Searcher} from '../../../shared/directives';

export interface JobExecutionStatusQuery extends Page, Sort, Watch {
  jobId: string;
  stateList: JobExecutionState[];
  startTimeTo: string;
  startTimeFrom: string;
}

@Injectable()
export class JobExecutionService extends LoadingService
  implements Searcher<JobExecutionStatusQuery, JobExecutionStatus>, Getter<JobExecutionStatus> {

  private readonly cache: Map<string, ConfigObject>;

  constructor(private reportApiService: ReportApiService,
              private configService: ConfigService) {
    super();
    this.cache = new Map();
  }

  private static getListRequest(query: JobExecutionStatusQuery): JobExecutionsListRequest {
    const listRequest = new JobExecutionsListRequest();
    const queryTemplate = new JobExecutionStatus();
    const fieldMask = new FieldMask();

    listRequest.setOffset(query.pageIndex * query.pageSize);
    listRequest.setPageSize(query.pageSize);

    if (query.jobId) {
      queryTemplate.jobId = query.jobId;
      fieldMask.addPaths('jobId');
    }

    if (fieldMask.getPathsList().length > 0) {
      listRequest.setQueryTemplate(JobExecutionStatus.toProto(queryTemplate));
      listRequest.setQueryMask(fieldMask);
    }

    if (query.startTimeTo) {
      listRequest.setStartTimeTo(toTimestampProto(query.startTimeTo));
    }

    if (query.startTimeFrom) {
      listRequest.setStartTimeFrom(toTimestampProto(query.startTimeFrom));
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

  get(query: Detail): Observable<JobExecutionStatus> {
    const listRequest = new JobExecutionsListRequest();
    listRequest.addId(query.id);
    listRequest.setWatch(query.watch);
    return this.reportApiService.listJobExecutions(listRequest);
  }

  getJob(id: string): Observable<ConfigObject> {
    const configRef = new ConfigRef({id, kind: Kind.CRAWLJOB});
    return this.cache.has(id) ? of(this.cache.get(id)) : this.configService.get(configRef).pipe(
      tap(configObject => this.cache.set(id, configObject)),
    );
  }

  search(query: JobExecutionStatusQuery): Observable<JobExecutionStatus> {
    return this.load(this.reportApiService.listJobExecutions(JobExecutionService.getListRequest(query)));
  }
}
