import {Directive, Inject} from '@angular/core';
import {BASE_LIST, LoaderDirective} from '../../../shared/directives';
import {PageLogQuery, PageLogService} from '../services';
import {BaseList, ListDataSource, PageLog} from '../../../shared/models';
import {map, switchMap, takeUntil} from 'rxjs/operators';


@Directive({
  selector: '[appQueryPageLog]'
})
export class QueryPageLogDirective extends LoaderDirective<PageLogQuery, PageLog> {
  constructor(protected service: PageLogService,
              @Inject(BASE_LIST) protected baseList: BaseList<PageLog>) {
    super(service, baseList, new ListDataSource<PageLog>());
  }

  onLoad(): void {
    super.onLoad();

    // fake counting
    this.query$.pipe(
      switchMap(query => this.dataSource.connect(null).pipe(
        map(v => (query.pageIndex + 1) * query.pageSize + (v.length % query.pageSize === 0 ? 1 : 0)))
      ),
      takeUntil(this.ngUnsubscribe),
    ).subscribe(length => this.baseList.length = length);
  }
}
