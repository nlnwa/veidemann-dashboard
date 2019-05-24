import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';

import {combineLatest, EMPTY, from, Observable, of, Subject} from 'rxjs';

import {ErrorService, SnackBarService} from '../../../core';
import {catchError, debounceTime, filter, map, mergeMap, switchMap, takeUntil, tap} from 'rxjs/operators';
import {DetailDirective} from '../../directives/detail.directive';
import {
  BrowserConfig,
  BrowserScript,
  ConfigObject,
  CrawlConfig,
  CrawlHostGroupConfig,
  CrawlJob,
  CrawlScheduleConfig,
  Kind,
  Meta,
  PolitenessConfig,
  RoleMapping
} from '../../../commons/models';
import {DeleteDialogComponent} from '../../components';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services';
import {Title} from '@angular/platform-browser';
import {componentOfKind, pathToKind} from '../../func/kind';
import {BaseListComponent, ReferrerError} from '../../../commons';


@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ConfigurationsComponent implements OnInit, OnDestroy {
  readonly Kind = Kind;

  @Input()
  kind: Kind;

  @Input()
  entityRef;

  configObject: Subject<ConfigObject> = new Subject();
  configObject$ = this.configObject.asObservable();
  options: any = {};

  selectedConfigs: ConfigObject[] = [];
  allSelected = false;

  protected ngUnsubscribe = new Subject();

  componentRef: ComponentRef<any>;

  @ViewChild(DetailDirective) detailHost: DetailDirective;
  @ViewChild('baseList') list: BaseListComponent;

  constructor(protected dataService: DataService,
              protected snackBarService: SnackBarService,
              protected errorService: ErrorService,
              protected componentFactoryResolver: ComponentFactoryResolver,
              protected router: Router,
              public titleService: Title,
              protected dialog: MatDialog,
              protected route: ActivatedRoute) {
  }

  get loading$(): Observable<boolean> {
    return this.dataService.loading$;
  }

  get showActionButton(): boolean {
    return !this.entityRef && !(!this.entityRef && this.kind === Kind.SEED);
  }


  get viewContainerRef(): ViewContainerRef {
    return this.detailHost.viewContainerRef;
  }

  static getTitle(kind: Kind): string {
    switch (kind) {
      case Kind.CRAWLENTITY:
        return 'Entity';
      case Kind.SEED:
        return 'Seed';
      case Kind.CRAWLJOB:
        return 'CrawlJob';
      case Kind.CRAWLCONFIG:
        return 'CrawlConfig';
      case Kind.CRAWLSCHEDULECONFIG:
        return 'CrawlScheduleConfig';
      case Kind.BROWSERCONFIG:
        return 'BrowserConfig';
      case Kind.POLITENESSCONFIG:
        return 'PolitenessConfig';
      case Kind.BROWSERSCRIPT:
        return 'BrowserScript';
      case Kind.CRAWLHOSTGROUPCONFIG:
        return 'CrawlHostGroupConfig';
      case Kind.ROLEMAPPING:
        return 'RoleMapping';
      case Kind.COLLECTION:
        return 'Collection';
      case Kind.UNDEFINED:
      default:
        return 'not implemented';
    }
  }

  get singleMode(): boolean {
    return !this.allSelected && this.selectedConfigs.length < 2;
  }

  ngOnInit() {
    this.route.data.pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.options = data.options;
    });

    if (this.entityRef) {
      this.dataService.kind = this.kind;
      return;
    }

    const paramMap$ = this.route.paramMap.pipe(
      map(params => params.get('kind')),
      map(kind => pathToKind(kind)),
      filter(kind => kind !== Kind.UNDEFINED),
      tap(kind => {
        this.kind = this.dataService.kind = kind;
        this.reset();
        this.titleService.setTitle('Veidemann | ' + ConfigurationsComponent.getTitle(kind));
      }));

    const queryParam$ = this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.get('id')),
    );

    combineLatest([paramMap$, queryParam$]).pipe(
      debounceTime(0),
      mergeMap(([kind, id]) => id ? this.dataService.get({id, kind}) : of(null)),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(configObject => this.configObject.next(configObject));
  }

  ngOnDestroy(): void {
    this.destroyComponent();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSelectedChange(configs: ConfigObject[]) {
    this.selectedConfigs = configs;
    this.allSelected = false;

    if (!this.singleMode) {
      this.loadComponent({configObject: ConfigObject.mergeConfigs(configs)});
      if (!this.entityRef) {
        this.router.navigate([], {relativeTo: this.route})
          .catch(error => this.errorService.dispatch(error));
      }
    } else {
      this.destroyComponent();
    }
  }

  onSelectConfig(configObject: ConfigObject) {
    if (this.entityRef) {
      this.configObject.next(configObject);
    } else if (!configObject) {
      this.router.navigate([], {relativeTo: this.route})
        .catch(error => this.errorService.dispatch(error));

    } else {
      this.router.navigate([], {queryParams: {id: configObject.id}, relativeTo: this.route})
        .catch(error => this.errorService.dispatch(error));
    }
  }

  onSelectAll() {
    this.allSelected = true;
    this.loadComponent({configObject: new ConfigObject({kind: this.kind})});
  }

  onPage(pageEvent: PageEvent) {
    if (this.entityRef && (pageEvent.previousPageIndex === pageEvent.pageIndex)) {
      // this.reset();
    }
  }

  onCreateConfig(newConfigObject?: ConfigObject): void {
    this.reset();
    const configObject = newConfigObject || new ConfigObject({kind: this.kind});
    if (!this.entityRef) {
      this.router.navigate([], {relativeTo: this.route})
        .then(() => setTimeout(() => this.configObject.next(configObject)))
        .catch(error => this.errorService.dispatch(error));
    } else {
      configObject.seed.entityRef = this.entityRef;
      this.configObject.next(configObject);
    }
  }

  onSaveConfig(configObject: ConfigObject) {
    this.dataService.save(configObject).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newConfig => {
        this.configObject.next(newConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdateConfig(configObject: ConfigObject) {
    this.dataService.update(configObject).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newConfig => {
        this.configObject.next(newConfig);
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onDeleteConfig(configObject: ConfigObject) {
    this.dataService.delete(configObject)
      .pipe(
        catchError((error) => {
          if (error.message) {
            const errorString = error.message.split(':')[1];
            const deleteError = /(?=.*delete)(?=.*there are)/gm;
            if (deleteError.test(errorString)) {
              this.errorService.dispatch(new ReferrerError('Error deleting config ' + configObject.meta.name + ': ' + errorString));
            } else {
              this.errorService.dispatch(error);
            }
          } else {
            this.errorService.dispatch(error);
          }
          return EMPTY;
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.reset();
        if (!this.entityRef) {
          this.router.navigate([], {relativeTo: this.route})
            .catch(error => this.errorService.dispatch(error));
        }
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onDeleteSelectedConfigs(configObjects: ConfigObject[]) {
    const numOfConfigs = this.selectedConfigs.length;
    let numOfDeleted = this.selectedConfigs.length;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      numberOfConfigs: numOfConfigs.toString()
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          from(configObjects).pipe(
            mergeMap((configObject) => this.dataService.delete(configObject)),
            catchError((err) => {
              if (err.message) {
                const errorString = err.message.split(':')[1];
                const deleteError = /(?=.*delete)(?=.*there are)/gm;
                if (deleteError.test(errorString)) {
                  numOfDeleted--;
                }
              } else {
                this.errorService.dispatch(err);
              }
              return EMPTY;
            }),
            takeUntil(this.ngUnsubscribe),
          ).subscribe(() => {
              this.reset();
              if (!this.entityRef) {
                this.router.navigate([], {relativeTo: this.route})
                  .catch(error => this.errorService.dispatch(error));
              }
              this.snackBarService.openSnackBar(numOfConfigs + ' konfigurasjoner slettet');
            },
            (error) => console.error(error),
            () => {
              if (numOfConfigs !== numOfDeleted) {
                const notDeletedMsg = numOfConfigs - numOfDeleted + ' ble ikke slettet siden de brukes i andre konfigurasjoner ';
                const deletedMsg = numOfDeleted + '/' + numOfConfigs + ' konfigurasjoner  ble  slettet. ';
                this.errorService.dispatch(new ReferrerError(deletedMsg + notDeletedMsg));
              }
            });
        } else {
          this.snackBarService.openSnackBar('Sletter ikke konfigurasjonene');
        }
      });
  }

  onMove(configObject: ConfigObject) {
    this.dataService.move(configObject).pipe(
      switchMap(updated => {
        if (updated > 0) {
          return this.dataService.seedsOfEntity(configObject).pipe(
            switchMap(count => {
              if (count === 0) {
                const config = new ConfigObject({kind: Kind.CRAWLENTITY, id: configObject.seed.entityRef.id});
                return this.dataService.delete(config).pipe(
                  map(response => response.getDeleted()),
                  map((deleted) => deleted ? {updated, deleted: 1} : {updated, deleted: 0})
                );
              } else {
                return of({updated, deleted: 0});
              }
            }));
        } else {
          return of({updated, deleted: 0});
        }
      }),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(response => {
      this.dataService.reset();
      if (response.deleted) {
        this.snackBarService.openSnackBar('Seed flyttet, og den gamle entiteten er slettet', null, 5000);
      } else {
        this.snackBarService.openSnackBar('Seed flyttet');
      }
    });
  }

  /**
   * Load component creates a dynamic component and initializes
   *
   * @param instanceData
   */
  protected loadComponent(instanceData = {}) {
    this.destroyComponent();
    this.componentRef = this.createComponent(componentOfKind(this.kind));
    this.initComponent(this.componentRef.instance, instanceData);
  }

  /**
   * Create dynamic component
   *
   * @param component
   * @param viewContainerRef
   */
  protected createComponent(component: any, viewContainerRef: ViewContainerRef = this.viewContainerRef): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    viewContainerRef.clear();
    return viewContainerRef.createComponent(componentFactory);
  }

  /**
   * Initialize dynamic component
   *
   * @param instance
   * @param instanceData
   */
  private initComponent(instance, instanceData) {
    Object.assign(instance, instanceData, ...this.options, {allSelected: this.allSelected});

    instance.updateForm();

    instance.update.pipe(
      switchMap(({updateTemplate, pathList}) =>
        this.dataService.updateWithTemplate(
          updateTemplate, pathList, this.allSelected ? undefined : this.selectedConfigs.map(config => config.id))),
      takeUntil(this.ngUnsubscribe),
    ).subscribe(updatedConfigs => {
      this.reset();
      this.dataService.reset();
      if (!this.entityRef) {
        this.router.navigate([], {relativeTo: this.route})
          .catch(error => this.errorService.dispatch(error));
      }
      if (!this.allSelected) {
        this.snackBarService.openSnackBar(updatedConfigs + ' konfigurasjoner oppdatert');
      } else {
        this.snackBarService.openSnackBar(updatedConfigs + ' konfigurasjoner av typen ' + Kind[this.kind.valueOf()] + ' ble oppdatert');
      }
    });

    instance.delete.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.onDeleteSelectedConfigs(this.selectedConfigs));

  }

  /**
   * Destroy dynamic component
   */
  protected destroyComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  protected reset() {
    this.configObject.next(null);
    this.allSelected = false;
    this.selectedConfigs = [];
    if (this.list) {
      this.list.reset();
    }
    this.destroyComponent();
  }

  private onSaveMultipleSeeds({seeds = [], configObject = new ConfigObject()}) {
    const configObjects = seeds.map(
      seed => Object.assign({...configObject}, {
        meta: new Meta
        ({
          name: seed,
          description: configObject.meta.description,
          labelList: configObject.meta.labelList
        })
      }));

    from(configObjects).pipe(
      mergeMap(c => this.dataService.save(c)),
      takeUntil(this.ngUnsubscribe),
    ).subscribe(() => {
      this.reset();
      if (!this.entityRef) {
        this.router.navigate([], {relativeTo: this.route})
          .catch(error => this.errorService.dispatch(error));
      }

      this.snackBarService.openSnackBar(configObjects.length + ' seeds er lagret');
    });
  }
}




