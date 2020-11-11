import {Directive, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, share} from 'rxjs/operators';
import {Getter} from '../../../shared/directives';
import {ListItem} from '../../../shared/models';


@Directive()
export abstract class DetailDirective<T extends ListItem> implements OnInit {

  protected query$: Observable<any>;

  item$: Observable<T>;

  protected constructor(protected route: ActivatedRoute,
                        protected service: Getter<T>) {
  }

  ngOnInit(): void {
    const routeParam$ = combineLatest([this.route.paramMap, this.route.queryParamMap]).pipe(
      debounceTime(0), // synchronize
      map(([paramMap, queryParamMap]) => ({
        id: paramMap.get('id'),
        watch: queryParamMap.get('watch'),
      })),
      share(),
    );

    const id$: Observable<string> = routeParam$.pipe(
      map(({id}) => id),
      distinctUntilChanged());

    const watch$: Observable<boolean> = routeParam$.pipe(
      map(({watch}) => watch === 'true'),
      distinctUntilChanged());

    this.query$ = combineLatest([id$, watch$])
      .pipe(
        map(([id, watch]) => ({id, watch})),
        share(),
      );
  }
}
