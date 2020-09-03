import {Directive, Inject} from '@angular/core';
import {BASE_LIST, QueryDirective} from '../../../shared/directives';
import {PageLogQuery, PageLogService} from '../services';
import {PageLog} from '../../../shared/models/report';
import {BaseList, ListDataSource} from '../../../shared/models';
import {distinctUntilChanged, switchMap, takeUntil} from 'rxjs/operators';
import {of} from 'rxjs';


@Directive({
  selector: '[appQueryPageLog]'
})
export class QueryPageLogDirective extends QueryDirective<PageLogQuery, PageLog> {
  constructor(protected service: PageLogService,
              @Inject(BASE_LIST) protected baseList: BaseList<PageLog>) {
    super(service, baseList, new ListDataSource<PageLog>());
  }

  onInit(): void {
    super.onInit();

    this.query$.pipe(
      distinctUntilChanged((a: PageLogQuery, b: PageLogQuery) =>
        // only count when these query parameters change
        (a.uri === b.uri
          && a.executionId === b.executionId
          && a.jobExecutionId === b.jobExecutionId
        )),
      switchMap(query => (query.executionId || query.jobExecutionId)
        ? this.service.count(query)
        : of(this.dataSource.length)
      ),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(length => this.baseList.length = length);
  }
}
