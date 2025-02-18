import {Directive, Host, Inject} from '@angular/core';
import {BASE_LIST} from '../../../shared/directives';
import {BaseList, JobExecutionStatus, ListDataSource} from '../../../shared/models';
import {QueryWithPageLengthDirective} from './query-with-page-length.directive';
import {JobExecutionService, JobExecutionStatusQuery} from '../services';


@Directive({
    selector: '[appQueryJobExecutionStatus]',
    standalone: false
})
export class QueryJobExecutionStatusDirective extends QueryWithPageLengthDirective<JobExecutionStatusQuery, JobExecutionStatus> {

  constructor(protected service: JobExecutionService,
              @Host() @Inject(BASE_LIST) protected baseList: BaseList<JobExecutionStatus>,
              protected dataSource: ListDataSource<JobExecutionStatus>) {
    super(service, baseList, dataSource);
  }

  protected onQuery() {
    if (this.query.watch) {
      this.subject.next(this.query);
    } else {
      super.onQuery();
    }
  }
}
