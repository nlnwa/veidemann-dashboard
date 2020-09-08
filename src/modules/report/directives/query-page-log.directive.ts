import {Directive, Inject} from '@angular/core';
import {BASE_LIST, QueryDirective} from '../../../shared/directives';
import {PageLogQuery, PageLogService} from '../services';
import {PageLog} from '../../../shared/models/report';
import {BaseList, ListDataSource} from '../../../shared/models';
import {distinctUntilChanged, map, switchMap, takeUntil, tap} from 'rxjs/operators';
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
      tap(() => console.log('count page log')),
      switchMap(query => (query.executionId || query.jobExecutionId)
        ? this.service.count(query)
        : this.dataSource.connect(null).pipe(
          map(v => query.pa + 1)
        )
      ),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(length => this.baseList.length = length);
  }
}
