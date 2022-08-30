import {Directive} from '@angular/core';
import {LoaderDirective, Searcher} from '../../../shared/directives';
import {BaseList, ListDataSource, ListItem} from '../../../shared/models';
import {finalize, switchMap, takeUntil, tap} from 'rxjs/operators';
import {Page, Watch} from '../../../shared/func';


@Directive()
export abstract class LoadWithPageLengthDirective<S extends Page & Watch, T extends ListItem> extends LoaderDirective<S, T> {
  protected constructor(protected service: Searcher<S, T>,
                        protected baseList: BaseList<T>,
                        protected dataSource: ListDataSource<T>) {
    super(service, baseList, dataSource);
  }

  onLoad(): void {
    this.query$.pipe(
      tap(query => {
        if (query.watch) {
          this.dataSource.capacity = query.pageSize;
        } else {
          this.dataSource.capacity = 0;
        }
      }),
      switchMap(query => this.service.search(query).pipe(
        // let us know when search is complete so that we can determine
        // pageLength and fool the paginator (no counting for crawlExecutions in API)
        finalize(() => {
          // we don't know real count of search so if length of data modulus pageSize is zero
          // we must add 1 to allow paginator to go to next page
          this.baseList.length = this.dataSource.length % query.pageSize === 0
            ? (query.pageIndex + 1) * this.dataSource.length + 1
            : this.dataSource.length;
        })
      )),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(item => this.dataSource.add(item));
  }
}
