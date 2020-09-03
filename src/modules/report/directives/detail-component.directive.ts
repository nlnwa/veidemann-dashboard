import {Directive, OnInit} from '@angular/core';
import {combineLatest, concat, Observable, of, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  mergeMap,
  sample,
  share,
  takeUntil,
  takeWhile,
  tap
} from 'rxjs/operators';
import {Getter} from '../../../shared/directives';
import {ListItem} from '../../../shared/models';
import {DetailQuery, WatchQuery} from '../../../shared/func';

export interface Stateful {
  state: number;
}

@Directive()
export abstract class DetailDirective<T extends ListItem & Stateful> implements OnInit {
  item$: Observable<T>;

  DONE_STATES: number[] = [0];

  protected constructor(protected route: ActivatedRoute,
                        protected service: Getter<T>) {
  }

  ngOnInit(): void {
    const routeParam$ = combineLatest([this.route.paramMap, this.route.queryParamMap]).pipe(
      debounceTime(0), // synchronize
      map(([paramMap, queryParamMap]) => ({
        id: paramMap.get('id'), // query template
        watch: queryParamMap.get('watch'), // list request
      })),
      share(),
    );

    const id$ = routeParam$.pipe(
      map(({id}) => id),
      distinctUntilChanged());

    const watch$ = routeParam$.pipe(
      map(({watch}) => watch),
      distinctUntilChanged());

    const init$ = of(null).pipe(
      distinctUntilChanged(),
    );

    const query$: Observable<DetailQuery & WatchQuery> = combineLatest([id$, watch$, init$])
      .pipe(
        debounceTime<any>(0),
        map(([id, watch]) => ({id, watch})),
        tap(query => console.log('query', query)),
        share(),
      );

    const weKnowItsSaneToWatch = new Subject();
    const noNeedToWatch = new Subject();

    const watchedItem$: Observable<T> = query$.pipe(
      takeUntil(noNeedToWatch),
      sample(weKnowItsSaneToWatch),
      filter(query => query.watch),
      tap(() => console.log('yeah watching')),
      mergeMap(query => this.service.get(query).pipe(
        tap((item) => console.log(item)),
      )),
      takeWhile(config => this.DONE_STATES.includes(config.state)),
      finalize(() => console.log('DONE'))
    );


    const notWatchedItem$: Observable<T> = query$.pipe(
      map(query => {
        console.log('query');
        query.watch = false;
        return query;
      }),
      mergeMap(query => this.service.get(query)),
      tap(item => {
        console.log('item', item);
        if (this.DONE_STATES.includes(item.state)) {
          console.log('no need to watch');
          noNeedToWatch.next();
        } else {
          console.log('we know it\'s sane to watch');
          weKnowItsSaneToWatch.next();
        }
      })
    );

    this.item$ = concat(notWatchedItem$, watchedItem$);
  }
}
