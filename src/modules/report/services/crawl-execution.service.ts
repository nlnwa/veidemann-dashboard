import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';

import {CrawlExecutionsListRequest, FieldMask} from '../../../api';
import {ConfigObject, ConfigRef, CrawlExecutionState, CrawlExecutionStatus, Kind} from '../../../shared/models';
import {ReportApiService} from '../../core/services';
import {ConfigService} from '../../commons/services';
import {catchError, shareReplay} from 'rxjs/operators';
import {Detail, Page, Sort, toTimestampProto, Watch} from '../../../shared/func';
import {LoadingService} from '../../../shared/services';
import {Getter, Searcher} from '../../../shared/directives';

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
export class CrawlExecutionService extends LoadingService
  implements Searcher<CrawlExecutionStatusQuery, CrawlExecutionStatus>, Getter<CrawlExecutionStatus> {
  private readonly cache: Map<string, Observable<ConfigObject>>;

  constructor(private reportApiService: ReportApiService,
              private configService: ConfigService) {
    super();
    this.cache = new Map();
  }

  get(query: Detail & Watch): Observable<CrawlExecutionStatus> {
    const listRequest = new CrawlExecutionsListRequest();
    listRequest.addId(query.id);
    listRequest.setWatch(query.watch);
    return this.reportApiService.listCrawlExecutions(listRequest);
  }

  getSeed(id: string): Observable<ConfigObject> {
    const configRef = new ConfigRef({id, kind: Kind.SEED});
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }
    const seed$ = this.configService.get(configRef).pipe(
      shareReplay(1),
      catchError(err => {
        this.cache.delete(id);
        return EMPTY;
      })
    );
    this.cache.set(id, seed$);

    return seed$;
  }

  search(query: CrawlExecutionStatusQuery): Observable<CrawlExecutionStatus> {
    return this.load(this.reportApiService.listCrawlExecutions(this.getListRequest(query)));
  }

  private getListRequest(query: CrawlExecutionStatusQuery): CrawlExecutionsListRequest {
    const listRequest = new CrawlExecutionsListRequest();
    const queryTemplate = new CrawlExecutionStatus();
    const fieldMask = new FieldMask();

    console.log(query);
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
}
