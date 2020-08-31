import {Directive, OnInit} from '@angular/core';
import {combineLatest, Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, share, switchMap} from 'rxjs/operators';
import {Getter} from '../../../shared/directives';
import {ListItem} from '../../../shared/models';
import {DetailQuery} from '../../../shared/func';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DetailComponent<T extends ListItem> implements OnInit {
  item$: Observable<T>;

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

    const query$: Observable<DetailQuery> = combineLatest([id$, watch$, init$])
      .pipe(
        debounceTime<any>(0),
        map(([id, watch]) => ({id, watch})),
      );

    this.item$ = query$.pipe(
      switchMap(query => this.service.get(query)),
    );
  }
}
