import {Directive, Host, Inject} from '@angular/core';
import {BASE_LIST} from '../../../shared/directives';
import {BaseList, JobExecutionStatus, ListDataSource} from '../../../shared/models';
import {LoadWithPageLengthDirective} from './load-with-page-length.directive';
import {JobExecutionService, JobExecutionStatusQuery} from '../services';


@Directive({
  selector: '[appQueryJobExecutionStatus]'
})
export class QueryJobExecutionStatusDirective extends LoadWithPageLengthDirective<JobExecutionStatusQuery, JobExecutionStatus> {

  constructor(protected service: JobExecutionService,
              @Host() @Inject(BASE_LIST) protected baseList: BaseList<JobExecutionStatus>,
              protected dataSource: ListDataSource<JobExecutionStatus>) {
    super(service, baseList, dataSource);
  }

  protected onQuery(previous: JobExecutionStatusQuery, current: JobExecutionStatusQuery) {
    if (this.query.watch) {
      this.subject.next(this.query);
    } else {
      super.onQuery(previous, current);
    }
  }
}
