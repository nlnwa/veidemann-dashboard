import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Params, Router, RouterEvent} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {BehaviorSubject, combineLatest, Observable, of, Subject} from 'rxjs';
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

import {ConfigObject, ConfigRef, Kind, Seed} from '../../../../shared/models';
import {AuthService, ControllerApiService, ErrorService, SnackBarService} from '../../../core';
import {DeleteDialogComponent, DeleteMultiDialogComponent, Parcel, RunCrawlDialogComponent} from '../../components';
import {PageEvent} from '@angular/material/paginator';
import {SortDirection} from '@angular/material/sort';
import {ConfigService} from '../../../commons/services';
import {ConfigQuery, distinctUntilArrayChanged, Sort} from '../../../../shared/func';
import {KindService, OptionsService} from '../../services';
import {ConfigDialogData, ConfigOptions, dialogByKind, multiDialogByKind} from '../../func';
import {ReferrerError} from '../../../../shared/error';
import {ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationsComponent implements OnInit, OnDestroy, AfterViewInit {
  readonly Kind = Kind;
  shortcuts: ShortcutInput[] = [];

  length$: Observable<number>;
  pageSize$: Observable<number>;
  pageIndex$: Observable<number>;
  sortDirection$: Observable<SortDirection>;
  sortActive$: Observable<string>;

  // checked (selected by checkbox) configObjects
  private selectedConfigs: ConfigObject[];

  isAllSelected = false;

  private ngUnsubscribe: Subject<void>;

  query$: Observable<ConfigQuery>;

  private recount: Subject<void>;
  private reload: Subject<void>;

  entityId: string;
  entity$: Observable<ConfigObject>;

  showCreateButton$: Observable<boolean>;

  options: ConfigOptions;
  options$: Observable<ConfigOptions>;

  kind: Kind;
  kind$: Observable<Kind>;

  // selected configObject
  configObject$: BehaviorSubject<ConfigObject>;

  get loading$(): Observable<boolean> {
    return this.configService.loading$;
  }

  constructor(private authService: AuthService,
              private configService: ConfigService,
              private dataService: ConfigService,
              private snackBarService: SnackBarService,
              private errorService: ErrorService,
              private router: Router,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private controllerApiService: ControllerApiService,
              private kindService: KindService,
              private optionsService: OptionsService) {

    this.options$ = this.optionsService.options$.pipe(
      tap(options => this.options = options)
    );

    this.kind$ = this.kindService.kind$.pipe(
      tap(kind => this.kind = kind)
    );

    this.ngUnsubscribe = new Subject<void>();

    this.configObject$ = new BehaviorSubject<ConfigObject>(null);
    this.selectedConfigs = [];

    // for reloading the current query (on save, delete, etc.)
    this.reload = new Subject();

    this.recount = new Subject();
  }

  ngOnInit(): void {
    const queryParam$ = this.route.queryParamMap.pipe(
      debounceTime(0), // synchronize multiple query changes
      map(query => ({
        q: query.get('q'),
        entityId: query.get('entity_id'),
        scheduleId: query.get('schedule_id'),
        crawlConfigId: query.get('crawl_config_id'),
        collectionId: query.get('collection_id'),
        browserConfigId: query.get('browser_config_id'),
        politenessId: query.get('politeness_id'),
        disabled: query.get('disabled'),
        crawlJobIds: query.getAll('crawl_job_id'),
        scriptIds: query.getAll('script_id'),
        scriptSelectors: query.getAll('script_selector'),
        sort: query.get('sort'),
        pageSize: query.get('s'),
        pageIndex: query.get('p'),
      })),
      share(),
    );

    const q$: Observable<string> = queryParam$.pipe(
      map(({q}) => q),
      distinctUntilChanged());

    const entityId$: Observable<string> = queryParam$.pipe(
      map(({entityId}) => entityId),
      tap(entityId => this.entityId = entityId),
      distinctUntilChanged());

    const scheduleId$ = queryParam$.pipe(
      map(({scheduleId}) => scheduleId),
      distinctUntilChanged());

    const crawlConfigId$ = queryParam$.pipe(
      map(({crawlConfigId}) => crawlConfigId),
      distinctUntilChanged());

    const collectionId$ = queryParam$.pipe(
      map(({collectionId}) => collectionId),
      distinctUntilChanged());

    const browserConfigId$ = queryParam$.pipe(
      map(({browserConfigId}) => browserConfigId),
      distinctUntilChanged());

    const politenessId$ = queryParam$.pipe(
      map(({politenessId}) => politenessId),
      distinctUntilChanged());

    const disabled$ = queryParam$.pipe(
      map(({disabled}) => disabled),
      distinctUntilChanged());

    const crawlJobIdList$ = queryParam$.pipe(
      map(({crawlJobIds}) => crawlJobIds),
      distinctUntilArrayChanged);

    const scriptIdList$ = queryParam$.pipe(
      map(({scriptIds}) => scriptIds),
      distinctUntilArrayChanged);

    const sort$: Observable<Sort> = queryParam$.pipe(
      map(({sort}) => {
        if (!sort) {
          return null;
        }
        const parts = sort.split(':');
        const s = {active: parts[0], direction: parts[1]};
        return s.direction ? s : null;
      }),
      distinctUntilChanged<Sort>((p, q) => p && q ? p.direction === q.direction && p.active === q.active : p === q),
    );

    const sortDirection$ = sort$.pipe(
      map(sort => (sort ? sort.direction : 'asc') as SortDirection));

    const sortActive$ = sort$.pipe(
      map(sort => sort ? sort.active : 'name'));

    const pageSize$ = queryParam$.pipe(
      map(({pageSize}) => parseInt(pageSize, 10) || 25),
      distinctUntilChanged(),
      shareReplay(1)
    );

    const pageIndex$ = queryParam$.pipe(
      map(({pageIndex}) => parseInt(pageIndex, 10) || 0),
      distinctUntilChanged(),
      shareReplay(1),
    );

    const query$: Observable<ConfigQuery> = combineLatest([
      this.kind$.pipe(filter(kind => kind !== Kind.UNDEFINED)),
      entityId$,
      scheduleId$,
      crawlConfigId$,
      collectionId$,
      browserConfigId$,
      politenessId$,
      disabled$,
      crawlJobIdList$,
      scriptIdList$,
      q$,
      sortDirection$,
      sortActive$,
      pageIndex$,
      pageSize$,
      this.reload.pipe(startWith(null as object))
    ]).pipe(
      debounceTime<any>(0), // synchronize observables
      map(([
             kind,
             entityId,
             scheduleId,
             crawlConfigId,
             collectionId,
             browserConfigId,
             politenessId,
             disabled,
             crawlJobIdList,
             scriptIdList,
             term,
             direction,
             active,
             pageIndex,
             pageSize
           ]) => ({
        kind,
        entityId,
        scheduleId,
        crawlConfigId,
        collectionId,
        browserConfigId,
        politenessId,
        disabled,
        crawlJobIdList,
        scriptIdList,
        term,
        direction,
        active,
        pageIndex,
        pageSize,
      })),
      tap(() => this.configObject$.next(null)),
      share(),
    );

    const length$: Observable<number> = combineLatest([
      this.recount.pipe(startWith(null as string)),
      query$.pipe(distinctUntilChanged((a: ConfigQuery, b: ConfigQuery) =>
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
      ))
    ]).pipe(
      mergeMap(([_, query]) => this.configService.count(query)),
    );

    this.sortActive$ = sortActive$;
    this.sortDirection$ = sortDirection$;
    this.query$ = query$;
    this.length$ = length$;
    this.pageSize$ = pageSize$;
    this.pageIndex$ = pageIndex$;

    this.entity$ = entityId$.pipe(
      switchMap(id => id
        ? this.configService.get(new ConfigRef({id, kind: Kind.CRAWLENTITY}))
        : of(null)),
      startWith(null as ConfigObject)
    );

    // do not allow to create seed without entity reference
    this.showCreateButton$ = combineLatest([this.kind$, this.entity$]).pipe(
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

  ngAfterViewInit() {
    this.shortcuts.push(
      {
        key: 'shift + e',
        label: 'Configurations actions',
        description: 'Edit selected configuration',
        command: (event: ShortcutEventOutput) => {
          if (this.configObject$.value !== null) {
            this.onEdit(this.configObject$.value);
          } else if (this.selectedConfigs.length > 1) {
            this.onEditSelected();
          }
        }
      },
      {
        key: 'shift + c',
        label: 'Configurations actions',
        description: 'Clone selected configuration',
        command: (event: ShortcutEventOutput) => {
          if (this.configObject$.value !== null) {
            this.onClone(this.configObject$.value);
          }
        }
      },
      {
        key: 'shift + n',
        label: 'Configurations actions',
        description: 'Create new configuration',
        command: (event: ShortcutEventOutput) => {
          if (this.kind !== null && this.kind !== Kind.SEED) {
            this.onCreateConfigWithDialog();
          }
        }
      },
      {
        key: 'shift + f',
        label: 'Configurations actions',
        description: 'Create new  seed for entity',
        command: (event: ShortcutEventOutput) => {
          if (this.configObject$.value !== null && this.configObject$.value.kind === Kind.CRAWLENTITY) {
            this.onCreateSeedFromEntity(this.configObject$.value);
          }
        }
      },
      {
        key: 'shift + d',
        label: 'Configurations actions',
        description: 'Show details for selected configuration',
        command: (event: ShortcutEventOutput) => {
          if (this.configObject$.value !== null) {
            this.onShowDetails(this.configObject$.value);
          }
        }
      },
      {
        key: 'shift + del',
        label: 'Configurations actions',
        description: 'Delete configuration',
        command: (event: ShortcutEventOutput) => {
          if (this.configObject$.value !== null && this.selectedConfigs.length === 0) {
            this.onDeleteConfig(this.configObject$.value);
          } else if (this.selectedConfigs.length > 0) {
            this.onDeleteSelectedConfigs();
          }
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  canRead(configObject: ConfigObject): boolean {
    return this.authService.canRead(configObject.kind);
  }

  canEdit(configObject: ConfigObject): boolean {
    return this.authService.canUpdate(configObject.kind);
  }

  canClone(configObject: ConfigObject): boolean {
    return this.authService.canCreate(configObject.kind);
  }

  canRunCrawl(configObject: ConfigObject): boolean {
    return this.authService.canRunCrawl(configObject.kind);
  }

  getJobRefListQueryParams(configObject: ConfigObject): Params {
    return {crawl_job_id: configObject.seed.jobRefList.map(jobRef => jobRef.id)};
  }

  onCreateConfigWithDialog(configObject?: ConfigObject) {
    if (!configObject) {
      configObject = new ConfigObject({kind: this.kind});
      if (this.entityId) {
        configObject.seed.entityRef = new ConfigRef({kind: Kind.CRAWLENTITY, id: this.entityId});
      }
    }
    const data: ConfigDialogData = {configObject, options: this.options};
    const componentType = dialogByKind(configObject.kind);
    const dialogRef = this.dialog.open(componentType, {data});

    let reload = true;
    // if kind is different then configObjects kind we don't want to reload
    if (this.kind !== configObject.kind) {
      reload = false;
    }
    if (configObject.kind === Kind.SEED) {
      const move = dialogRef.componentInstance.move.subscribe((parcel: Parcel) => {
        this.onMoveSeed(parcel);
        move.unsubscribe();
      });
    }

    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart),
      tap(() => this.dialog.closeAll())
    ).subscribe();

    dialogRef.afterClosed().pipe(
      filter(_ => !!_)
    ).subscribe((config: ConfigObject) => {
      if (Array.isArray(config)) {
        this.onSaveMultiple(config, reload);
      } else {
        if (config.id) {
          this.onUpdateConfig(config);
        } else {
          this.onSaveConfig(config, reload);
        }
      }
    });
  }

  onEdit(configObject: ConfigObject) {
    this.onCreateConfigWithDialog(configObject);
  }

  onShowDetails(configObject: ConfigObject) {
    this.router.navigate([configObject.id], {
      relativeTo: this.route,
    }).catch(error => this.errorService.dispatch(error));
  }

  onClone(configObject: ConfigObject) {
    this.onCreateConfigWithDialog(ConfigObject.clone(configObject));
  }

  onUpdateConfig(configObject: ConfigObject) {
    this.configService.update(configObject)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newConfig => {
        this.reload.next();
        this.snackBarService.openSnackBar($localize`:@snackBarMessage.updated:Updated`);
      });
  }

  onSaveConfig(configObject: ConfigObject, reload: boolean = true) {
    this.configService.save(configObject)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newConfig => {
        if (reload) {
          this.reload.next();
          this.recount.next();
        }
        this.snackBarService.openSnackBar($localize`:@snackBarMessage.saved:Saved`);
      });
  }

  onSaveMultiple(configObjects: ConfigObject[], reload: boolean = true) {
    this.configService.saveMultiple(configObjects)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(saved => {
        if (reload) {
          this.reload.next();
          this.recount.next();
        }
        this.snackBarService.openSnackBar(saved + $localize`:@snackBarMessage.multipleSaved: configurations saved`);
      });
  }

  onQueryChange(value: Partial<ConfigQuery>): any {
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
    }).catch(error => this.errorService.dispatch(error));
  }

  onSelectAll() {
    this.isAllSelected = true;
  }

  onRowClick(config: ConfigObject) {
    this.configObject$.next(config);
  }

  onSelectedChange(configs: ConfigObject[]) {
    this.isAllSelected = false;
    this.selectedConfigs = configs;
  }

  onFilterByEntityRef(configObject: ConfigObject) {
    this.router.navigate(['../seed'], {
      queryParams: {entity_id: configObject.seed.entityRef.id},
      relativeTo: this.route.parent
    });
  }

  onFilterByScheduleRef(configObject: ConfigObject) {
    this.router.navigate(['../crawljobs'], {
      queryParams: {schedule_id: configObject.id},
      relativeTo: this.route.parent
    });
  }

  onFilterByCrawlConfigRef(configObject: ConfigObject) {
    this.router.navigate(['../crawljobs'], {
      queryParams: {crawl_config_id: configObject.id},
      relativeTo: this.route.parent
    });
  }

  onFilterByCollectionRef(configObject: ConfigObject) {
    this.router.navigate(['../crawlconfig'], {
      queryParams: {collection_id: configObject.id},
      relativeTo: this.route.parent
    });
  }

  onFilterByBrowserConfigRef(configObject: ConfigObject) {
    this.router.navigate(['../crawlconfig'], {
      queryParams: {browser_config_id: configObject.id},
      relativeTo: this.route.parent
    });
  }

  onFilterByPolitenessConfigRef(configObject: ConfigObject) {
    this.router.navigate(['../crawlconfig'], {
      queryParams: {politeness_id: configObject.id},
      relativeTo: this.route.parent
    });
  }

  onFilterByBrowserScriptRef(configObject: ConfigObject) {
    this.router.navigate(['../browserconfig'], {
      queryParams: {script_id: configObject.id},
      relativeTo: this.route.parent
    });
  }

  onFilterByCrawlJobRef(configObject: ConfigObject) {
    this.router.navigate(['../seed'], {
      queryParams: {crawl_job_id: configObject.id},
      relativeTo: this.route.parent
    });
  }

  onListSeed(configRef: ConfigRef) {
    this.router.navigate(['seed'], {queryParams: {entity_id: configRef.id}, relativeTo: this.route.parent});
  }

  onCreateSeedFromEntity(entity: ConfigObject) {
    const entityRef = ConfigObject.toConfigRef(entity);
    const configObject = new ConfigObject({kind: Kind.SEED, seed: new Seed({entityRef})});

    this.onCreateConfigWithDialog(configObject);
  }

  onMoveSeed(parcel: Parcel) {
    (Array.isArray(parcel.seed)
      ? this.dataService.moveMultiple(parcel.seed, parcel.entityRef)
      : this.dataService.move(parcel.seed, parcel.entityRef))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(moved => {
        this.snackBarService.openSnackBar(moved + $localize`:@snackBarMessage.multipleMoved: configurations moved`);
      });
  }

  onPage(page: PageEvent) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {p: page.pageIndex, s: page.pageSize},
      relativeTo: this.route
    })
      .catch(error => this.errorService.dispatch(error));
  }

  onEditSelected() {
    const configObject = ConfigObject.mergeConfigs(this.selectedConfigs);
    const data: ConfigDialogData = {configObject, options: this.options, allSelected: this.isAllSelected};
    const componentType = multiDialogByKind(configObject.kind);
    const dialogRef = this.dialog.open(componentType, {data});
    dialogRef.afterClosed().pipe(
      filter(_ => !!_)
    ).subscribe(({updateTemplate, pathList}: { updateTemplate: ConfigObject, pathList: string[] }) => {
      this.onUpdateMulti({updateTemplate, pathList});
    });
  }

  onUpdateMulti({updateTemplate, pathList}: { updateTemplate: ConfigObject, pathList: string[] }) {
    this.configService.updateWithTemplate(
      updateTemplate, pathList, this.isAllSelected ? [] : this.selectedConfigs.map(config => config.id))
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(updatedConfigs => {
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
        switchMap(() => this.configService.delete(configObject)),
        filter(deleted => !!deleted)
      )
      .subscribe(() => {
        this.router.navigate([], {
          relativeTo: this.route.parent,
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
        switchMap(() => this.configService.deleteMultiple(configObjects))
      )
      .subscribe(numDeleted => {
        if (configObjects.length !== numDeleted) {
          this.errorService.dispatch(new ReferrerError({numConfigs: configObjects.length, numDeleted}));
        } else {
          this.snackBarService.openSnackBar(
            numDeleted + $localize`:@snackBarMessage.multipleDeleted: configurations deleted`);
        }
        this.reload.next();
        this.recount.next();
      });
  }

  onRunCrawl(configObject: ConfigObject) {
    const crawlJobs = this.options.crawlJobs;
    const dialogRef = this.dialog.open(RunCrawlDialogComponent, {
      disableClose: true,
      autoFocus: true,
      data: {configObject, jobRefId: null, crawlJobs}
    });

    dialogRef.afterClosed()
      .subscribe(runCrawlRequest => {
        if (runCrawlRequest) {
          this.controllerApiService.runCrawl(runCrawlRequest)
            .subscribe(runCrawlReply => {
              if (configObject.kind === Kind.SEED) {
                this.router.navigate(
                  ['report', 'crawlexecution'],
                  {
                    queryParams: {
                      job_execution_id: runCrawlReply.jobExecutionId,
                      seed_id: configObject.id,
                    }
                  }
                ).catch(error => this.errorService.dispatch(error));
              } else {
                this.router.navigate(
                  ['report', 'jobexecution', runCrawlReply.jobExecutionId],
                  {queryParams: {watch: true}}
                ).catch(error => this.errorService.dispatch(error));
              }
            });
        }
      });
  }
}
