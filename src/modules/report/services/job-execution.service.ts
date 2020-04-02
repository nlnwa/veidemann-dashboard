import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {FieldMask, JobExecutionsListRequest} from '../../../api';
import {ConfigObject, ConfigRef, JobExecutionState, JobExecutionStatus, Kind} from '../../../shared/models';
import {ReportApiService} from '../../core/services';
import {QueryService, Sort} from '../../commons/services/query.service';
import {ConfigService} from '../../core/services/config.service';
import {tap} from 'rxjs/operators';
import {toTimestampProto} from '../../../shared/func';

export interface JobExecutionStatusQuery {
  jobId: string;
  stateList: JobExecutionState[];
  sort: Sort;
  pageSize: number;
  pageIndex: number;
  startTimeTo: string;
  startTimeFrom: string;
  watch: boolean;
}

@Injectable()
export class JobExecutionService extends QueryService {

  private readonly cache: Map<string, ConfigObject>;

  constructor(private reportApiService: ReportApiService,
              private configService: ConfigService) {
    super();
    this.cache = new Map();
  }

  get(id: string): Observable<JobExecutionStatus> {
    const listRequest = new JobExecutionsListRequest();
    listRequest.addId(id);
    return this.reportApiService.listJobExecutions(listRequest);
  }

  getJob(id: string): Observable<ConfigObject> {
    const configRef = new ConfigRef({id, kind: Kind.CRAWLJOB});
    return this.cache.has(id) ? of(this.cache.get(id)) : this.configService.get(configRef).pipe(
      tap(configObject => this.cache.set(id, configObject)),
    );
  }

  search(query: JobExecutionStatusQuery): Observable<JobExecutionStatus> {
    return this.load(this.reportApiService.listJobExecutions(this.getListRequest(query)));
  }

  private getListRequest(query: JobExecutionStatusQuery): JobExecutionsListRequest {
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


    if (query.sort) {
      listRequest.setOrderByPath(query.sort.active);
      listRequest.setOrderDescending(query.sort.direction === 'desc');
    }

    return listRequest;
  }
}
