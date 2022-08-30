import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, finalize, map, scan} from 'rxjs/operators';
import {Injectable} from '@angular/core';

export interface Loader {
  loading$: Observable<boolean>;
}

@Injectable()
export class LoadingService implements Loader {

  private loading: Subject<boolean>;

  loading$: Observable<boolean>;


  protected constructor() {
    this.loading = new Subject();
    this.loading$ = this.loading.pipe(
      map(_ => _ ? 1 : -1),
      scan((acc, curr) => acc + curr, 0),
      map(_ => _ > 0),
      distinctUntilChanged()
    );
  }

  protected load(observable: Observable<any>): Observable<any> {
    this.loading.next(true);
    return observable.pipe(
      finalize(() => this.loading.next(false))
    );
  }
}
