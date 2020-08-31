import {Directive, OnInit} from '@angular/core';
import {QueryDirective, Searcher} from '../../../shared/directives';
import {BaseList, ListDataSource, ListItem} from '../../../shared/models';
import {finalize, switchMap, takeUntil} from 'rxjs/operators';
import {Page} from '../../../shared/func';


@Directive()
export abstract class QueryWithPageLengthDirective<S extends Page, T extends ListItem> extends QueryDirective<S, T> implements OnInit {
  protected constructor(protected service: Searcher<S, T>,
                        protected baseList: BaseList<T>,
                        protected dataSource: ListDataSource<T>) {
    super(service, baseList, dataSource);
  }

  ngOnInit(): void {
    this.query$.pipe(
      switchMap(query => this.service.search(query).pipe(
        // let us know when search is complete so we can determine
        // pageLength and fool the paginator (no counting for crawlExecutions in API)
        finalize(() => {
          // we don't know real count of search so if length of data modulus pageSize is zero
          // we must add 1 to allow paginator to go to next page
          this.dataSource.length = this.dataSource.length % query.pageSize === 0
            ? (query.pageIndex + 1) * this.dataSource.length + 1
            : this.dataSource.length;
        })
      )),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(crawlExecutionStatus => this.dataSource.add(crawlExecutionStatus));
  }
}
