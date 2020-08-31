import {Directive, Host, Inject, Self} from '@angular/core';
import {BASE_LIST} from '../../../shared/directives';
import {BaseList, JobExecutionStatus, ListDataSource} from '../../../shared/models';
import {QueryWithPageLengthDirective} from './query-with-page-length.directive';
import {JobExecutionService, JobExecutionStatusQuery} from '../services';
import {BaseListComponent} from '../../commons/components';


@Directive({
  selector: '[appQueryJobExecutionStatus]'
})
export class QueryJobExecutionStatusDirective extends QueryWithPageLengthDirective<JobExecutionStatusQuery, JobExecutionStatus> {

  constructor(protected service: JobExecutionService,
              @Host() @Inject(BASE_LIST) protected baseList: BaseList<JobExecutionStatus>,
              protected dataSource: ListDataSource<JobExecutionStatus>) {
    super(service, baseList, dataSource);
  }
}
