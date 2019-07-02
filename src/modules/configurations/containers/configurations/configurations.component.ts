import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import {Observable, Subject} from 'rxjs';
import {filter, map, switchMap, takeUntil} from 'rxjs/operators';

import {ErrorService, SnackBarService} from '../../../core';
import {DetailDirective} from '../../directives/detail.directive';
import {
  BrowserConfig,
  BrowserScript,
  Collection,
  ConfigObject,
  CrawlConfig,
  CrawlHostGroupConfig,
  CrawlJob,
  CrawlScheduleConfig,
  Kind,
  PolitenessConfig,
  RobotsPolicy,
  Role,
  RoleMapping,
  RotationPolicy,
  SubCollectionType
} from '../../../commons/models';
import {DeleteDialogComponent} from '../../components';
import {componentOfKind} from '../../func/kind';
import {BaseListComponent, ReferrerError} from '../../../commons';
import {Action} from '../../../commons/components/base-list/base-list';
import {ConfigurationsService} from '../../services/configurations.service';
import {DataService} from '../../services/data';

export interface ConfigOptions {
  rotationPolicies?: RotationPolicy[];
  subCollectionTypes?: SubCollectionType[];
  crawlConfigs?: ConfigObject[];
  crawlScheduleConfigs?: ConfigObject[];
  browserConfigs?: ConfigObject[];
  collections?: ConfigObject[];
  politenessConfigs?: ConfigObject[];
  browserScripts?: ConfigObject[];
  robotsPolicies?: RobotsPolicy[];
  crawlJobs?: ConfigObject[];
  roles?: Role[];
}

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfigurationsService, DataService]
})
export class ConfigurationsComponent implements OnInit, OnDestroy, OnChanges {
  readonly Kind = Kind;

  kind: Kind;

  protected configObject: Subject<ConfigObject> = new Subject();

  protected options: ConfigOptions = {};

  protected selectedConfigs: ConfigObject[] = [];

  protected isAllSelected = false;

  protected ngUnsubscribe = new Subject();

  protected componentRef: ComponentRef<any>;

  configObject$: Observable<ConfigObject>;

  @ViewChild(DetailDirective, {static: true}) detailHost: DetailDirective;

  @ViewChild('baseList', {static: false}) list: BaseListComponent;

  constructor(protected configurationsService: ConfigurationsService,
              protected snackBarService: SnackBarService,
              protected errorService: ErrorService,
              protected componentFactoryResolver: ComponentFactoryResolver,
              protected router: Router,
              protected titleService: Title,
              protected dialog: MatDialog,
              protected route: ActivatedRoute) {
    this.configObject$ = this.configObject.asObservable();
  }

  get loading$(): Observable<boolean> {
    return this.configurationsService.loading$;
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
    return !this.isAllSelected && this.selectedConfigs.length < 2;
  }

  ngOnInit() {
    this.route.data.subscribe(data => this.options = data.options);

    this.configurationsService.configObject$.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(configObject => this.configObject.next(configObject));

    this.configurationsService.kind$.subscribe(kind => {
      this.kind = kind;
      this.reset();
      this.titleService.setTitle('Veidemann | ' + ConfigurationsComponent.getTitle(kind));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.entityRef) {
      this.reset();
    }
  }

  ngOnDestroy(): void {
    this.destroyComponent();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onSelectedChange(configs: ConfigObject[]) {
    this.selectedConfigs = configs;
    this.isAllSelected = false;

    if (!this.singleMode) {
      this.loadComponent({configObject: ConfigObject.mergeConfigs(configs)});
      this.router.navigate([], {relativeTo: this.route})
        .catch(error => this.errorService.dispatch(error));
    } else {
      this.destroyComponent();
    }
  }

  onSelectConfig(configObject: ConfigObject) {
    if (!configObject) {
      // navigate to self without any query parameters
      this.router.navigate([], {relativeTo: this.route})
        .catch(error => this.errorService.dispatch(error));
    } else {
      // navigate to self with id query parameter
      this.router.navigate([], {queryParams: {id: configObject.id}, relativeTo: this.route})
        .catch(error => this.errorService.dispatch(error));
    }
  }

  // called when user selects every object of current kind
  onSelectAll() {
    this.isAllSelected = true;
    // load multi view for selection
    this.loadComponent({configObject: new ConfigObject({kind: this.kind})});
  }

  onCreateConfig(newConfigObject?: ConfigObject): void {
    this.reset();
    const configObject = newConfigObject || new ConfigObject({kind: this.kind});
    this.router.navigate([], {relativeTo: this.route})
      .then(() => setTimeout(() => this.configObject.next(configObject)))
      .catch(error => this.errorService.dispatch(error));
  }

  onAction(event): void {
    if (event.action === Action.Clone) {
      this.onCreateConfig(event.item.constructor.clone(event.item));
    }
  }

  onSaveConfig(configObject: ConfigObject) {
    this.configurationsService.save(configObject)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newConfig => {
        this.configObject.next(newConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdateConfig(configObject: ConfigObject) {
    this.configurationsService.update(configObject)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(newConfig => {
        this.configObject.next(newConfig);
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onDeleteConfig(configObject: ConfigObject) {
    this.configurationsService.delete(configObject)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.reset();
        this.router.navigate([], {relativeTo: this.route})
          .catch(error => this.errorService.dispatch(error));
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onDeleteSelectedConfigs(configObjects: ConfigObject[]) {
    const numConfigs = this.selectedConfigs.length;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      numberOfConfigs: numConfigs.toString()
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

    const result$ = dialogRef.afterClosed().pipe(map(result => !!result));
    const positive$ = result$.pipe(filter(_ => _));
    const negative$ = result$.pipe(filter(_ => !_));

    negative$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe();

    positive$
      .pipe(
        switchMap(() => this.configurationsService.deleteMultiple(configObjects)),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(numDeleted => this.onDeletedSelectedConfigs(numConfigs, numDeleted));
  }

  protected onDeletedSelectedConfigs(numConfigs: number, numDeleted: number) {
    if (numConfigs !== numDeleted) {
      this.errorService.dispatch(new ReferrerError({numConfigs, numDeleted}));
    } else {
      this.snackBarService.openSnackBar(numConfigs + ' konfigurasjoner slettet');
    }
    this.reset();
    this.router.navigate([], {relativeTo: this.route})
      .catch(error => this.errorService.dispatch(error));
  }

  protected reset() {
    this.configObject.next(null);
    this.isAllSelected = false;
    this.selectedConfigs = [];
    if (this.list) {
      this.list.reset();
    }
    this.destroyComponent();
  }

  /**
   * Load component creates a dynamic component and initializes it
   */
  protected loadComponent(instanceData = {}) {
    this.destroyComponent();
    this.componentRef = this.createComponent(componentOfKind(this.kind));
    this.initComponent(this.componentRef.instance, instanceData);
  }

  /**
   * Create dynamic component
   */
  protected createComponent(component: any, viewContainerRef: ViewContainerRef = this.viewContainerRef): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    viewContainerRef.clear();
    return viewContainerRef.createComponent(componentFactory);
  }

  /**
   * Destroy dynamic component
   */
  protected destroyComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  /**
   * Initialize dynamic component:
   * - set data
   * - update form
   * - subscribe to update and delete actions
   *
   * @param component Component to initialize
   * @param instanceData Data to initialize component with
   */
  protected initComponent(component, instanceData) {
    Object.assign(component, instanceData, this.options, {allSelected: this.isAllSelected});

    // must run updateForm because ngOnChanges in not fired automatically in a dynamic component
    component.updateForm();

    component.update.pipe(
      switchMap(({updateTemplate, pathList}) =>
        this.configurationsService.updateWithTemplate(
          updateTemplate, pathList, this.isAllSelected ? undefined : this.selectedConfigs.map(config => config.id))),
      takeUntil(this.ngUnsubscribe),
    ).subscribe(updatedConfigs => this.onUpdatedConfigs(updatedConfigs));

    component.delete.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => this.onDeleteSelectedConfigs(this.selectedConfigs));
  }

  protected onUpdatedConfigs(updatedConfigs: ConfigObject[]) {
    this.reset();
    this.router.navigate([], {relativeTo: this.route})
      .catch(error => this.errorService.dispatch(error));
    if (!this.isAllSelected) {
      this.snackBarService.openSnackBar(updatedConfigs + ' konfigurasjoner oppdatert');
    } else {
      this.snackBarService.openSnackBar(updatedConfigs + ' konfigurasjoner av typen ' + Kind[this.kind.valueOf()] + ' ble oppdatert');
    }
  }
}




