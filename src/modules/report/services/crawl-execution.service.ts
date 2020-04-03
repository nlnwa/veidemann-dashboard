import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {CrawlExecutionsListRequest, FieldMask} from '../../../api';
import {ConfigObject, ConfigRef, CrawlExecutionState, CrawlExecutionStatus, Kind} from '../../../shared/models';
import {ReportApiService} from '../../core/services';
import {QueryService, Sort} from '../../commons/services/query.service';
import {ConfigService} from '../../core/services/config.service';
import {tap} from 'rxjs/operators';
import {toTimestampProto} from '../../../shared/func';

export interface CrawlExecutionStatusQuery {
  jobId: string;
  seedId: string;
  stateList: CrawlExecutionState[];
  sort: Sort;
  pageSize: number;
  pageIndex: number;
  hasError: boolean;
  startTimeTo: string;
  startTimeFrom: string;
  watch: boolean;
}

@Injectable()
export class CrawlExecutionService extends QueryService {
  private readonly cache: Map<string, ConfigObject>;

  constructor(private reportApiService: ReportApiService,
              private configService: ConfigService) {
    super();
    this.cache = new Map();
  }

  get(jobExecutionId: string): Observable<CrawlExecutionStatus> {
    const listRequest = new CrawlExecutionsListRequest();
    listRequest.addId(jobExecutionId);
    return this.reportApiService.listCrawlExecutions(listRequest);
  }

  getSeed(id: string): Observable<ConfigObject> {
    const configRef = new ConfigRef({id, kind: Kind.SEED});
    return this.cache.has(id) ? of(this.cache.get(id)) : this.configService.get(configRef).pipe(
      tap(configObject => this.cache.set(id, configObject)),
    );
  }

  search(query: CrawlExecutionStatusQuery): Observable<CrawlExecutionStatus> {
    return this.load(this.reportApiService.listCrawlExecutions(this.getListRequest(query)));
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
