import {Directive, Inject} from '@angular/core';
import {BASE_LIST, QueryDirective} from '../../../shared/directives';
import {PageLogQuery, PageLogService} from '../services';
import {PageLog} from '../../../shared/models/log';
import {BaseList, ListDataSource} from '../../../shared/models';
import {distinctUntilChanged, filter, map, switchMap, takeUntil} from 'rxjs/operators';


@Directive({
    selector: '[appQueryPageLog]',
    standalone: false
})
export class QueryPageLogDirective extends QueryDirective<PageLogQuery, PageLog> {
  constructor(protected service: PageLogService,
              @Inject(BASE_LIST) protected baseList: BaseList<PageLog>) {
    super(service, baseList, new ListDataSource<PageLog>());
  }

  onInit(): void {
    super.onInit();

    // fake counting
    this.query$.pipe(
      switchMap(query => this.dataSource.connect(null).pipe(
        map(v => (query.pageIndex + 1) * query.pageSize + (v.length % query.pageSize === 0 ? 1 : 0)))
      ),
      takeUntil(this.ngUnsubscribe),
    ).subscribe(length => this.baseList.length = length);
  }
}
