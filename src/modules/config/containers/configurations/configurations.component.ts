import {ChangeDetectionStrategy, Component, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {combineLatest, Observable, of, Subject} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  share,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

import {
  BrowserScriptType,
  ConfigObject,
  ConfigRef,
  Kind,
  RobotsPolicy,
  Role,
  RotationPolicy,
  Seed,
  SubCollectionType
} from '../../../../shared/models';
import {AuthService, ControllerApiService, ErrorService, SnackBarService} from '../../../core';
import {ConfigListComponent, DeleteDialogComponent, DeleteMultiDialogComponent, Parcel} from '../../components';
import {ReferrerError} from '../../../../shared';
import {ConfigService, LabelService} from '../../services';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ConfigPath} from '../../func';
import {SortDirection} from '@angular/material/sort';
import {ListDataSource} from '../../../../shared/models/list-datasource';
import {Sort} from '../../../commons/services/query.service';
import {ConfigQuery} from '../../../core/services/config.service';
import {distinctUntilArrayChanged} from '../../../../shared/func/rxjs';
import {RunCrawlDialogComponent} from '../../components/run-crawl-dialog/run-crawl-dialog.component';
import {RunCrawlRequest} from '../../../../shared/models/controller/controller.model';
import {RunningCrawlDialogComponent} from '../../components/running-crawl-dialog/running-crawl-dialog.component';

export interface ConfigOptions {
  rotationPolicies?: RotationPolicy[];
  subCollectionTypes?: SubCollectionType[];
  crawlConfigs?: ConfigObject[];
  crawlScheduleConfigs?: ConfigObject[];
  browserConfigs?: ConfigObject[];
  collections?: ConfigObject[];
  politenessConfigs?: ConfigObject[];
  browserScripts?: ConfigObject[];
  browserScriptTypes?: BrowserScriptType[];
  robotsPolicies?: RobotsPolicy[];
  crawlJobs?: ConfigObject[];
  roles?: Role[];
}

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfigService, LabelService]
})
export class ConfigurationsComponent implements OnDestroy {
  readonly ConfigPath = ConfigPath;
  readonly Kind = Kind;

  pageLength$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  sortDirection$: Observable<SortDirection>;
  sortActive$: Observable<string>;

  options$: Observable<ConfigOptions>;

  private selectedConfigs: ConfigObject[] = [];

  private isAllSelected = false;

  private ngUnsubscribe = new Subject();

  private configObject: Subject<ConfigObject>;
  configObject$: Observable<ConfigObject>;

  kind: Kind;
  kind$: Observable<Kind>;

  query$: Observable<ConfigQuery>;

  private reload: Subject<void>;

  entity$: Observable<ConfigObject>;

  fetchConfigObject = true;

  showCreateButton$: Observable<boolean>;

  @ViewChild('baseList') list: ConfigListComponent;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource: ListDataSource<ConfigObject>;

  constructor(private authService: AuthService,
              private dataService: ConfigService,
              private snackBarService: SnackBarService,
              private errorService: ErrorService,
              private router: Router,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private labelService: LabelService,
              private controllerApiService: ControllerApiService) {
    this.dataSource = new ListDataSource<ConfigObject>();

    this.options$ = this.route.data.pipe(
      map(data => data.options),
      tap(_ => {
        // make sure any detail view relying on some option not present is removed before a new set of options is loaded
        this.configObject.next(null);
      }),
      shareReplay(1),
    );

    // for reloading the current query (on save, delete, etc.)
    this.reload = new Subject();

    this.configObject = new Subject();
    this.configObject$ = this.configObject.asObservable();

    const routeParam$ = combineLatest([route.queryParamMap, route.paramMap]).pipe(
      debounceTime(0), // synchronize queryParamMap and paramMap observables
      map(([queryParamMap, paramMap]) => ({
        kind: paramMap.get('kind'),
        id: queryParamMap.get('id'),
        q: queryParamMap.get('q'),
        entityId: queryParamMap.get('entity_id'),
        scheduleId: queryParamMap.get('schedule_id'),
        crawlConfigId: queryParamMap.get('crawl_config_id'),
        collectionId: queryParamMap.get('collection_id'),
        browserConfigId: queryParamMap.get('browser_config_id'),
        politenessId: queryParamMap.get('politeness_id'),
        disabled: queryParamMap.get('disabled'),
        crawlJobIds: queryParamMap.getAll('crawl_job_id'),
        scriptIds: queryParamMap.getAll('script_id'),
        scriptSelectors: queryParamMap.getAll('script_selector'),
        sort: queryParamMap.get('sort'),
        pageSize: queryParamMap.get('s'),
        pageIndex: queryParamMap.get('p'),
      })),
      share(),
    );

    const kind$ = routeParam$.pipe(
      map(({kind}) => ConfigPath[kind]),
      distinctUntilChanged(),
      shareReplay(1));

    const id$: Observable<string> = routeParam$.pipe(
      map(({id}) => id),
      distinctUntilChanged());

    const q$: Observable<string> = routeParam$.pipe(
      map(({q}) => q),
      distinctUntilChanged());

    const entityId$: Observable<string> = routeParam$.pipe(
      map(({entityId}) => entityId),
      distinctUntilChanged(),
      shareReplay(1)); // to get entity to show on first load

    const scheduleId$ = routeParam$.pipe(
      map(({scheduleId}) => scheduleId),
      distinctUntilChanged());

    const crawlConfigId$ = routeParam$.pipe(
      map(({crawlConfigId}) => crawlConfigId),
      distinctUntilChanged());

    const collectionId$ = routeParam$.pipe(
      map(({collectionId}) => collectionId),
      distinctUntilChanged());

    const browserConfigId$ = routeParam$.pipe(
      map(({browserConfigId}) => browserConfigId),
      distinctUntilChanged());

    const politenessId$ = routeParam$.pipe(
      map(({politenessId}) => politenessId),
      distinctUntilChanged());

    const disabled$ = routeParam$.pipe(
      map(({disabled}) => disabled),
      distinctUntilChanged());

    const crawlJobIdList$ = routeParam$.pipe(
      map(({crawlJobIds}) => crawlJobIds),
      distinctUntilArrayChanged);

    const scriptIdList$ = routeParam$.pipe(
      map(({scriptIds}) => scriptIds),
      distinctUntilArrayChanged);

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
      shareReplay(1),
    );

    const pageSize$ = routeParam$.pipe(
      map(({pageSize}) => parseInt(pageSize, 10) || 10),
      distinctUntilChanged(),
      shareReplay(1)
    );

    const pageIndex$ = routeParam$.pipe(
      map(({pageIndex}) => parseInt(pageIndex, 10) || 0),
      distinctUntilChanged(),
      shareReplay(1),
    );

    const reload$ = this.reload.pipe(
      startWith(false),
      shareReplay(1)
    );

    const query$: Observable<ConfigQuery> = combineLatest([
      kind$.pipe(filter(kind => kind !== Kind.UNDEFINED)),
      entityId$, scheduleId$, crawlConfigId$, collectionId$,
      browserConfigId$, politenessId$, disabled$, crawlJobIdList$, scriptIdList$,
      q$, sort$, pageIndex$, pageSize$, reload$
    ]).pipe(
      debounceTime<any>(0), // synchronize observables
      map(([kind, entityId, scheduleId, crawlConfigId, collectionId,
             browserConfigId, politenessId, disabled, crawlJobIdList, scriptIdList,
             term, sort, pageIndex, pageSize]) => ({
        kind, entityId, scheduleId, crawlConfigId, collectionId,
        browserConfigId, politenessId, disabled, crawlJobIdList, scriptIdList, term,
        sort, pageIndex, pageSize
      })),
      shareReplay(1),
    );

    this.query$ = query$;

    query$.pipe(
      tap(_ => this.dataSource.clear()),
      switchMap(query => this.dataService.search(query)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(configObject => this.dataSource.add(configObject));

    const countQuery$ = query$.pipe(
      distinctUntilChanged((a: ConfigQuery, b: ConfigQuery) =>
        // only count when these query parameters change
        (a.kind === b.kind
          && a.term === b.term
          && a.entityId === b.entityId
          && a.scheduleId === b.scheduleId
          && a.crawlConfigId === b.crawlConfigId
          && a.collectionId === b.collectionId
          && a.browserConfigId === b.browserConfigId
          && a.politenessId === b.politenessId
          && a.disabled === b.disabled
          && (a.crawlJobIdList.length === b.crawlJobIdList.length
              ? a.crawlJobIdList.every(p => b.crawlJobIdList.some(q => p === q))
              : false
          )
          && (a.scriptIdList.length === b.scriptIdList.length
              ? a.scriptIdList.every(p => b.scriptIdList.some(q => p === q))
              : false
          )
        )
      ));

    this.sortDirection$ = sort$.pipe(
      map(sort => (sort ? sort.direction : '') as SortDirection));

    this.sortActive$ = sort$.pipe(
      map(sort => sort ? sort.active : ''));

    // count configObjects when query change or on reload
    this.pageLength$ = combineLatest([countQuery$, reload$]).pipe(
      map(([countQuery, _]) => countQuery),
      mergeMap(countQuery => this.dataService.count(countQuery)),
      shareReplay(1),
    );

    this.pageSize$ = pageSize$;

    this.pageIndex$ = pageIndex$;

    this.kind$ = kind$.pipe(
      tap(kind => {
        // make sure we empty dataSource because it is shared between
        // rolemapping list
        this.dataSource.clear();
        this.kind = kind;
        this.labelService.kind = kind;
        this.reset();
      }));

    // configObject stream based on kind and id
    combineLatest([
      kind$,
      id$.pipe(
        // toggle id stream on/off based on passId token
        // (e.g. when saving a configObject we don't want to
        // refetch configObject when we set query parameter id -
        // we already got it in the response from the call to save)
        filter(() => {
          if (this.fetchConfigObject) {
            return true;
          } else {
            this.fetchConfigObject = !this.fetchConfigObject;
            return false;
          }
        }))
    ]).pipe(
      map(([kind, id]) => new ConfigRef({kind, id})),
      switchMap(configRef => configRef && configRef.id ? this.dataService.get(configRef) : of(null)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(configObject => this.configObject.next(configObject));

    this.entity$ = entityId$.pipe(
      switchMap(id => id
        ? this.dataService.get(new ConfigRef({id, kind: Kind.CRAWLENTITY}))
        : of(null)),
      shareReplay(1),
    );

    // do not allow to create seed without entity reference
    this.showCreateButton$ = combineLatest([kind$, this.entity$]).pipe(
      map(([kind, entity]) => {
        switch (kind) {
          case Kind.SEED:
            return entity !== null;
          case Kind.UNDEFINED:
            return false;
          default:
            return true;
        }
      }));
  }

  get loading$(): Observable<boolean> {
    return this.dataService.loading$;
  }

  get isSingleMode(): boolean {
    return !this.isAllSelected && this.selectedConfigs.length < 1;
  }

  get canAdministrate(): boolean {
    return this.authService.isAdmin();
  }

  get canConfigure(): boolean {
    return this.authService.isAdmin() || this.authService.isCurator();
  }

  get canConsult(): boolean {
    return this.authService.isConsultant();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getJobRefListQueryParams(configObject: ConfigObject): Params {
    return {crawl_job_id: configObject.seed.jobRefList.map(jobRef => jobRef.id)};
  }

  onQueryChange(value: Partial<ConfigQuery>): any {
    this.reset();

    const queryParams = {
      entity_id: value.entityId || null,
      schedule_id: value.scheduleId || null,
      crawl_config_id: value.crawlConfigId || null,
      collection_id: value.collectionId || null,
      browser_config_id: value.browserConfigId || null,
      politeness_id: value.politenessId || null,
      disabled: value.disabled || null,
      crawl_job_id: value.crawlJobIdList.length ? value.crawlJobIdList : null,
      script_id: value.scriptIdList.length ? value.scriptIdList : null,
      q: value.term || null
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {...queryParams, id: null}
    });
  }

  onSort(sort: Sort) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {sort: sort.active && sort.direction ? `${sort.active}:${sort.direction}` : null}
    });
  }

  onSelectAll() {
    this.isAllSelected = true;
    this.configObject.next(new ConfigObject({kind: this.kind}));
  }

  onSelectedChange(configs: ConfigObject | ConfigObject[]) {
    this.isAllSelected = false;

    if (!Array.isArray(configs)) {
      this.selectedConfigs = [];
      // navigate to self with id query parameter
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {id: configs.id},
      }).catch(error => this.errorService.dispatch(error));
    } else {
      this.selectedConfigs = configs;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParamsHandling: 'merge',
        queryParams: {id: null},
      }).catch(error => this.errorService.dispatch(error))
        .then(() => {
          const mergedConfigObject = ConfigObject.mergeConfigs(configs);
          setTimeout(() => this.configObject.next(mergedConfigObject));
        });
    }
  }

  onFilterByEntityRef(configObject: ConfigObject) {
    this.reset();
    this.router.navigate(['seed'], {queryParams: {entity_id: configObject.seed.entityRef.id}, relativeTo: this.route.parent});
  }

  onFilterByScheduleRef(configObject: ConfigObject) {
    this.router.navigate(['crawljobs'], {queryParams: {schedule_id: configObject.id}, relativeTo: this.route.parent});
  }

  onFilterByCrawlConfigRef(configObject: ConfigObject) {
    this.router.navigate(['crawljobs'], {queryParams: {crawl_config_id: configObject.id}, relativeTo: this.route.parent});
  }

  onFilterByCollectionRef(configObject: ConfigObject) {
    this.router.navigate(['crawlconfig'], {queryParams: {collection_id: configObject.id}, relativeTo: this.route.parent});
  }

  onFilterByBrowserConfigRef(configObject: ConfigObject) {
    this.router.navigate(['crawlconfig'], {queryParams: {browser_config_id: configObject.id}, relativeTo: this.route.parent});
  }

  onFilterByPolitenessConfigRef(configObject: ConfigObject) {
    this.router.navigate(['crawlconfig'], {queryParams: {politeness_id: configObject.id}, relativeTo: this.route.parent});
  }

  onFilterByBrowserScriptRef(configObject: ConfigObject) {
    this.router.navigate(['browserconfig'], {queryParams: {script_id: configObject.id}, relativeTo: this.route.parent});
  }

  onFilterByCrawlJobRef(configObject: ConfigObject) {
    this.router.navigate(['seed'], {queryParams: {crawl_job_id: configObject.id}, relativeTo: this.route.parent});
  }

  onListSeed(configRef: ConfigRef) {
    this.router.navigate(['seed'], {queryParams: {entity_id: configRef.id}, relativeTo: this.route.parent});
  }

  onCreateConfig(): void {
    this.reset();
    const configObject = new ConfigObject({kind: this.kind});

    if (this.kind === Kind.SEED && this.route.snapshot.queryParamMap.get('entity_id')) {
      const kind = Kind.CRAWLENTITY;
      const id = this.route.snapshot.queryParamMap.get('entity_id');
      const entityRef = new ConfigRef({kind, id});
      configObject.seed = new Seed({entityRef});
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {id: null}
    })
      .catch(error => this.errorService.dispatch(error))
      .then(() => setTimeout(() => this.configObject.next(configObject)));
  }


  onCreateSeedFromEntity(entity: ConfigObject) {
    const entityRef = ConfigObject.toConfigRef(entity);
    const configObject = new ConfigObject({kind: Kind.SEED, seed: new Seed({entityRef})});
    this.router.navigate(['seed'], {queryParams: {entity_id: entityRef.id}, relativeTo: this.route.parent})
      .catch(err => this.errorService.dispatch(err))
      .then(() => setTimeout(() => this.configObject.next(configObject)));
  }

  onClone(configObject: ConfigObject) {
    this.reset();

    // we don't want the id of any selected configObject to be present in the url
    // when we create a clone
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {id: null}
    })
      .catch(error => this.errorService.dispatch(error))
      .then(() => setTimeout(() => this.configObject.next(ConfigObject.clone(configObject))));
  }

  onPage(page: PageEvent) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {p: page.pageIndex, s: page.pageSize},
      relativeTo: this.route
    })
      .catch(error => this.errorService.dispatch(error));
  }

  onSaveConfig(configObject: ConfigObject) {
    this.dataService.save(configObject)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newConfig => {
        this.configObject.next(newConfig);
        this.reload.next();
        this.fetchConfigObject = false;
        this.router.navigate([], {
          queryParamsHandling: 'merge',
          queryParams: {id: newConfig.id},
          relativeTo: this.route,
        })
          .catch(error => this.errorService.dispatch(error));
        this.snackBarService.openSnackBar($localize`:@snackBarMessage.saved:Saved`);
      });
  }

  onUpdateConfig(configObject: ConfigObject) {
    this.dataService.update(configObject)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newConfig => {
        this.configObject.next(newConfig);
        this.reload.next();
        this.snackBarService.openSnackBar($localize`:@snackBarMessage.updated:Updated`);
      });
  }

  onUpdateMulti({updateTemplate, pathList}: { updateTemplate: ConfigObject, pathList: string[] }) {
    this.dataService.updateWithTemplate(
      updateTemplate, pathList, this.isAllSelected ? [] : this.selectedConfigs.map(config => config.id))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(updatedConfigs => {
        this.reset();
        this.reload.next();
        this.snackBarService.openSnackBar(
          updatedConfigs + $localize`:@snackBarMessage.multipleUpdated: configurations updated`);
      });
  }

  onDeleteConfig(configObject: ConfigObject) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: {configObject},
    });

    dialogRef.afterClosed()
      .pipe(
        filter(result => !!result),
        switchMap(() => this.dataService.delete(configObject)),
        filter(deleted => !!deleted)
      )
      .subscribe(() => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParamsHandling: 'merge',
          queryParams: {id: null},
        }).catch(error => this.errorService.dispatch(error));
        this.reload.next();
        this.snackBarService.openSnackBar($localize`:@snackBarMessage.deleted:Deleted`);
      });
  }

  onDeleteSelectedConfigs() {
    this.onDeleteConfigObjects(this.selectedConfigs);
  }

  onDeleteConfigObjects(configObjects: ConfigObject[]) {
    const dialogRef = this.dialog.open(DeleteMultiDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: {numberOfConfigs: configObjects.length}
    });

    dialogRef.afterClosed()
      .pipe(
        filter(_ => _),
        switchMap(() => this.dataService.deleteMultiple(configObjects))
      )
      .subscribe(numDeleted => {
        if (configObjects.length !== numDeleted) {
          this.errorService.dispatch(new ReferrerError({numConfigs: configObjects.length, numDeleted}));
        } else {
          this.snackBarService.openSnackBar(
            numDeleted + $localize`:@snackBarMessage.multipleDeleted: configurations deleted`);
        }
        this.reset();
        this.reload.next();
      });
  }

  onMoveSeed(parcel: Parcel) {
    (Array.isArray(parcel.seed)
      ? this.dataService.moveMultiple(parcel.seed, parcel.entityRef)
      : this.dataService.move(parcel.seed, parcel.entityRef))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(moved => {
        this.snackBarService.openSnackBar(moved + $localize`:@snackBarMessage.multipleMoved: configurations moved`);
        this.reload.next();
      });
  }

  onRunCrawl(configObject: ConfigObject) {
    const dialogRef = this.dialog.open(RunCrawlDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: {configObject, jobRefId: null}
    });
    dialogRef.afterClosed()
      .subscribe(runCrawlRequest => {
        if (runCrawlRequest) {
          this.controllerApiService.runCrawl(runCrawlRequest).subscribe(runCrawlReply => {
            const dialogReference = this.dialog.open(RunningCrawlDialogComponent, {
              disableClose: false,
              autoFocus: true,
              data: {runCrawlRequest, runCrawlReply, configObject}
            })
          })
        }
      })
  }

  onSaveMultipleSeeds(configObjects: ConfigObject[]) {
    this.dataService.saveMultiple(configObjects)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(saved => {
        this.snackBarService.openSnackBar(saved + $localize`:@snackBarMessage.multipleSaved: configurations saved`);
        this.configObject.next(null);
        this.reload.next();
      });
  }

  private reset() {
    this.configObject.next(null);
    this.isAllSelected = false;
    this.selectedConfigs = [];
    if (this.list) {
      this.list.reset();
    }
  }
}




