import {Directive, OnInit} from '@angular/core';
import {combineLatest, Observable, Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, share, startWith} from 'rxjs/operators';
import {Getter} from '../../../shared/directives';
import {ListItem} from '../../../shared/models';


@Directive()
export abstract class DetailDirective<T extends ListItem> implements OnInit {

  protected query$: Observable<any>;

  protected reload$: Observable<void>;
  protected reload: Subject<void>;

  item$: Observable<T>;

  protected constructor(protected route: ActivatedRoute,
                        protected service: Getter<T>) {
    this.reload = new Subject<void>();
    this.reload$ = this.reload.asObservable();
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

    this.query$ = combineLatest([id$, watch$, this.reload$.pipe(startWith(null as string))])
      .pipe(
        map(([id, watch]) => ({id, watch})),
        share(),
      );
  }
}
