import {Pipe, PipeTransform} from '@angular/core';
import {CrawlExecutionState, CrawlExecutionStatus, JobExecutionState, JobExecutionStatus} from '../../../shared/models';
import {Observable, of} from 'rxjs';
import {first, map, reduce, switchMap,} from 'rxjs/operators';
import {ExecutionId} from '../../../shared/models/controller/controller.model';
import {ControllerApiService, ReportApiService} from '../../core/services';
import {CrawlExecutionsListRequest, FieldMask} from '../../../api';

@Pipe({
  name: 'getUrlQueueForJobExecution'
})
export class JobexecutionTotalQueuePipe implements PipeTransform {
  constructor(private reportApiService: ReportApiService, private controllerApiService: ControllerApiService) {
  }

  transform(jobExectionStatus: JobExecutionStatus): Observable<number> {
    if (!jobExectionStatus) {
      return of(0);
    }

    const activeJobStates = [
      JobExecutionState.CREATED,
      JobExecutionState.RUNNING
    ];

    const activeExecutionStates = [
      CrawlExecutionState.CREATED.valueOf(),
      CrawlExecutionState.FETCHING.valueOf(),
      CrawlExecutionState.SLEEPING.valueOf()
    ];

    if (!activeJobStates.includes(jobExectionStatus.state)) {
      return of(0);
    }

    const listRequest = new CrawlExecutionsListRequest();

    const queryTemplate = new CrawlExecutionStatus();
    queryTemplate.jobExecutionId =  jobExectionStatus.id;
    queryTemplate.jobId = jobExectionStatus.jobId;

    const fieldMask = new FieldMask();
    fieldMask.addPaths('jobExecutionId');
    fieldMask.addPaths('jobId')


    const returnedFields = new FieldMask();
    returnedFields.addPaths('state');
    returnedFields.addPaths('id');
    returnedFields.addPaths('jobExecutionId');

    listRequest.setQueryTemplate(CrawlExecutionStatus.toProto(queryTemplate));
    listRequest.setQueryMask(fieldMask);
    listRequest.setReturnedFieldsMask(returnedFields);
    listRequest.setStateList(activeExecutionStates);

    return this.reportApiService.listCrawlExecutions(listRequest).pipe(
      switchMap(crawlExecutionStatus => {
        if (!activeExecutionStates.includes(crawlExecutionStatus.state)) {
          return of(0);
        }
        const executionId = new ExecutionId({id: crawlExecutionStatus.id});
        return this.controllerApiService.queueCountForCrawlExecution(executionId).pipe(
          first(),
          map(countResponse => countResponse.count));
      }),
      reduce((acc, curr) => acc + curr, 0),
    );
  }
}
