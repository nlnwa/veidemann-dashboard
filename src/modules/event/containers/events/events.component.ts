import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, of, Subject} from 'rxjs';
import {ConfigObject, EventObject, EventType, Kind} from '../../../../shared/models';
import {AuthService, ErrorService, SnackBarService} from '../../../core';
import {EventQuery, EventService} from '../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Sort, SortDirection} from '@angular/material/sort';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  share,
  shareReplay,
  startWith,
  takeUntil
} from 'rxjs/operators';
import {Severity, State} from '../../../../shared/models/event/event.model';
import {PageEvent} from '@angular/material/paginator';
import {EventDialogComponent, EventDialogData} from '../../components/event-dialog/event-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {EventAlternativeSeedDialogComponent} from '../../components/event-types/event-alternative-seed/event-alternative-seed-dialog/event-alternative-seed-dialog.component';
import {ConfigService} from '../../../commons/services';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {

  readonly Kind = Kind;
  readonly State = State;
  readonly EventType = EventType;

  private eventObject: Subject<EventObject>;

  private ngUnsubscribe = new Subject();
  private reload: Subject<void>;
  private recount: Subject<void>;

  length$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  sortDirection$: Observable<SortDirection>;
  sortActive$: Observable<string>;
  query$: Observable<EventQuery>;

  get loading$(): Observable<boolean> {
    return this.eventService.loading$;
  }

  constructor(private authService: AuthService,
              private eventService: EventService,
              private snackBarService: SnackBarService,
              private configService: ConfigService,
              private errorService: ErrorService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) {
    this.eventObject = new Subject();

    this.ngUnsubscribe = new Subject<void>();
    this.reload = new Subject();
    this.recount = new Subject();
  }


  ngOnInit(): void {
    const routeParam$ = this.route.queryParamMap.pipe(
      debounceTime(0),
      map(queryParaMap => ({
        assignee: queryParaMap.get('assignee'),
        source: queryParaMap.get('source'),
        state: queryParaMap.get('state'),
        severity: queryParaMap.get('severity'),
        sort: queryParaMap.get('sort'),
        pageSize: queryParaMap.get('s'),
        pageIndex: queryParaMap.get('p')
      })),
      share(),
    );

    const assignee$ = routeParam$.pipe(
      map(({assignee}) => assignee),
      distinctUntilChanged());

    const source$ = routeParam$.pipe(
      map(({source}) => source),
      distinctUntilChanged());

    const state$: Observable<State> = routeParam$.pipe(
      map(({state}) => State[state]),
      distinctUntilChanged());

    const severity$: Observable<Severity> = routeParam$.pipe(
      map(({severity}) => Severity[severity]),
      distinctUntilChanged());

    const sort$: Observable<Sort> = routeParam$.pipe(
      map(({sort}) => {
        if (!sort) {
          return null;
        }
        const parts = sort.split(':');
        const s = {active: parts[0], direction: parts[1]};
        return s.direction ? s : null;
      }),
      distinctUntilChanged<Sort>((p, q) => p && q ? p.direction === q.direction && p.active === q.active : p === q),
      shareReplay(1)
    );

    const pageSize$ = routeParam$.pipe(
      map(({pageSize}) => parseInt(pageSize, 10) || 25),
      distinctUntilChanged(),
      shareReplay(1)
    );

    const pageIndex$ = routeParam$.pipe(
      map(({pageIndex}) => parseInt(pageIndex, 10) || 0),
      distinctUntilChanged(),
      shareReplay(1),
    );

    const sortDirection$ = sort$.pipe(
      map(sort => (sort ? sort.direction : '') as SortDirection));

    const sortActive$ = sort$.pipe(
      map(sort => sort ? sort.active : ''));

    const init$ = of(null).pipe(
      distinctUntilChanged(),
    );

    const query$: Observable<EventQuery> = combineLatest([
      assignee$,
      source$,
      state$,
      severity$,
      sortActive$,
      sortDirection$,
      pageIndex$,
      pageSize$,
      init$,
      this.reload.pipe(startWith(null as object))
    ]).pipe(
      debounceTime<any>(0),
      map(([
             assignee,
             source,
             state,
             severity,
             active,
             direction,
             pageIndex,
             pageSize
           ]) => ({
        assignee,
        source,
        state,
        severity,
        active,
        direction,
        pageIndex,
        pageSize
      })),
      share()
    );

    const length$: Observable<number> = combineLatest([
      this.recount.pipe(startWith(null as string)),
      query$.pipe(distinctUntilChanged((a: EventQuery, b: EventQuery) =>
        (a.severity === b.severity
          && a.source === b.source
          && a.assignee === b.assignee
          && a.state === b.state)
      ))
    ]).pipe(
      mergeMap(([_, query]) => this.eventService.count(query))
    );

    this.pageSize$ = pageSize$;
    this.pageIndex$ = pageIndex$;
    this.sortActive$ = sortActive$;
    this.sortDirection$ = sortDirection$;
    this.query$ = query$;
    this.length$ = length$;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  canEdit(): boolean {
    return this.authService.canUpdate('event');
  }

  onPage(page: PageEvent) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {p: page.pageIndex, s: page.pageSize}
    }).catch(error => this.errorService.dispatch(error));
  }

  onSort(sort: Sort) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {sort: sort.active && sort.direction ? `${sort.active}:${sort.direction}` : null}
    }).catch(error => this.errorService.dispatch(error));
  }

  onQueryChange(query: Partial<EventQuery>) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        p: query.pageIndex || null,
        s: query.pageSize || null,
        assignee: query.assignee || null,
        source: query.source || null,
        state: query.state || null,
        severity: query.severity || null
      },
    }).catch(error => this.errorService.dispatch(error));
  }

  onEdit(eventObject: EventObject) {
    const data: EventDialogData = {eventObject};
    const dialogRef = this.dialog.open(EventDialogComponent, {data});

    dialogRef.afterClosed().pipe(
      filter(_ => !!_)
    ).subscribe((event: EventObject) => {
      if (event.id) {
        this.onUpdateEvent(event);
      }
    });
  }

  onUpdateEvent(eventObject: EventObject) {
    this.eventService.save(eventObject)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(update => {
        this.reload.next();
        this.snackBarService.openSnackBar($localize`:@snackBarMessage.updated:Updated`);
      });
  }

  onAddAlternativeUrl(eventObject: EventObject) {
    const data: EventDialogData = {eventObject};
    const dialogRef = this.dialog.open(EventAlternativeSeedDialogComponent, {data});

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result.annotation) {
          const updateTemplate = new ConfigObject({kind: Kind.SEED});
          updateTemplate.meta.annotationList = [result.annotation];
          const pathList = ['meta.annotation+'];
          this.configService.updateWithTemplate(updateTemplate, pathList, [result.id]).subscribe(update => {
            this.snackBarService.openSnackBar('Annotation added to seed');
          });
        }
        if (result.closeEvent) {
          eventObject.state = State.CLOSED;
          this.onUpdateEvent(eventObject);
        }
      });
  }

  onAssignToMe(event: EventObject) {
    const eventObject = event;
    const user = this.authService.email;
    eventObject.assignee = user;
    this.eventService.save(eventObject)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(update => {
        this.reload.next();
        this.snackBarService.openSnackBar('Assigned to user: ' + user);
      });
  }

  onCloseEvent(event: EventObject) {
    event.state = State.CLOSED;
    this.eventService.save(event).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(update => {
        this.reload.next();
        this.snackBarService.openSnackBar('Event closed');
      });
  }

  onShowDetails(event: EventObject) {
    this.router.navigate([event.id], {
      relativeTo: this.route,
    }).catch(error => this.errorService.dispatch(error));
  }

}
