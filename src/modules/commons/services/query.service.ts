import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, finalize, map, scan} from 'rxjs/operators';

export interface Pager {
  pageSize: number;
  pageIndex: number;
}

export interface Sort {
  active: string;
  direction: string;
}

export abstract class QueryService {
  private loading: Subject<boolean> = new Subject<boolean>();
  loading$: Observable<boolean> = this.loading.pipe(
    map(isLoading => isLoading ? 1 : -1),
    scan((acc, curr) => acc + curr, 0),
    map(sem => sem > 0),
    distinctUntilChanged()
  );

  protected load(observable: Observable<any>): Observable<any> {
    this.loading.next(true);
    return observable.pipe(finalize(() => this.loading.next(false)));
  }
}
