import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewRef
} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

import {EMPTY, from, of, Subject} from 'rxjs';

import {ErrorService, SnackBarService} from '../../../core';
import {catchError, filter, map, mergeMap, switchMap, takeUntil} from 'rxjs/operators';
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
  PolitenessConfig,
  RoleMapping
} from '../../../commons/models';
import {DeleteDialogComponent} from '../../components/delete-dialog/delete-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';
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
  embedded = false;

  configObject: Subject<ConfigObject> = new Subject();
  configObject$ = this.configObject.asObservable();
  options: any = {};

  selectedConfigs: ConfigObject[] = [];
  allSelected = false;

  protected ngOnUnsubscribe = new Subject<void>();

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

  get showActionButton(): boolean {
    return !this.embedded && !(!this.embedded && this.kind === Kind.SEED);
  }

  get componentRef(): ViewRef {
    return this.detailHost.viewContainerRef.get(0);
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
    this.route.data
      .pipe(takeUntil(this.ngOnUnsubscribe))
      .subscribe(data => {
        this.options = data.options;
      });

    if (this.embedded) {
      this.dataService.kind = this.kind;
      return;
    }

    this.route.paramMap.pipe(
      map(params => params.get('kind')),
      map(kind => pathToKind(kind)),
      filter(kind => kind !== Kind.UNDEFINED),
      takeUntil(this.ngOnUnsubscribe)
    ).subscribe((kind: Kind) => {
      this.reset();
      this.dataService.kind = kind;
      this.kind = kind;
      this.titleService.setTitle('Veidemann | ' + ConfigurationsComponent.getTitle(kind));
    });

    this.route.queryParamMap.pipe(
      switchMap(queryParamMap =>
        queryParamMap.has('id')
          ? this.dataService.get({id: queryParamMap.get('id'), kind: this.kind})
          : of(null)),
      takeUntil(this.ngOnUnsubscribe)
    ).subscribe(configObject => this.configObject.next(configObject));
  }

  ngOnDestroy(): void {
    this.destroyComponent();
    this.ngOnUnsubscribe.next();
    this.ngOnUnsubscribe.complete();
  }

  onSelectedChange(configs: ConfigObject[]) {
    this.selectedConfigs = configs;
    this.allSelected = false;

    if (!this.singleMode) {
      this.loadComponent({configObject: ConfigObject.mergeConfigs(configs)});
      if (!this.embedded) {
        this.router.navigate([], {relativeTo: this.route});
      }
    } else {
      this.destroyComponent();
    }
  }

  onSelectConfig(configObject: ConfigObject) {
    if (this.embedded) {
      this.configObject.next(configObject);
    } else if (!configObject) {
      this.configObject.next(null);
      this.router.navigate([], {relativeTo: this.route});
    } else {
      this.router.navigate([], {queryParams: {id: configObject.id}, relativeTo: this.route});
    }
  }

  onSelectAll() {
    this.allSelected = true;
    this.loadComponent({configObject: new ConfigObject({kind: this.kind})});
  }

  onCreateConfig(): void {
    this.reset();
    const configObject = new ConfigObject({kind: this.kind});

    if (!this.embedded) {
      this.router.navigate([], {relativeTo: this.route})
        .then(() => this.configObject.next(configObject));
    } else {
      this.configObject.next(configObject);
    }
  }


  onSaveConfig(configObject: ConfigObject) {
    this.dataService.save(configObject).pipe(takeUntil(this.ngOnUnsubscribe))
      .subscribe(newConfig => {
        this.configObject.next(newConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdateConfig(configObject: ConfigObject) {
    this.dataService.update(configObject).pipe(takeUntil(this.ngOnUnsubscribe))
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
        takeUntil(this.ngOnUnsubscribe)
      )
      .subscribe(() => {
        this.reset();
        if (!this.embedded) {
          this.router.navigate([], {relativeTo: this.route});
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
            takeUntil(this.ngOnUnsubscribe),
          ).subscribe(() => {
              this.reset();
              if (!this.embedded) {
                this.router.navigate([], {relativeTo: this.route});
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

  /**
   * Load component creates a dynamic component and initializes
   *
   * @param instanceData
   */
  protected loadComponent(instanceData = {}) {
    this.destroyComponent();
    const componentRef = this.createComponent(componentOfKind(this.kind));
    this.initComponent(componentRef.instance, instanceData);
  }

  /**
   * Create dynamic component
   *
   * @param component
   * @param viewContainerRef
   */
  protected createComponent(component: any, viewContainerRef: ViewContainerRef = this.viewContainerRef): any {
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
      takeUntil(this.ngOnUnsubscribe),
    ).subscribe(updatedConfigs => {
      this.reset();
      if (!this.embedded) {
        this.router.navigate([], {relativeTo: this.route});
      }
      if (!this.allSelected) {
        this.snackBarService.openSnackBar(updatedConfigs + ' konfigurasjoner oppdatert');
      } else {
        this.snackBarService.openSnackBar(updatedConfigs + ' konfigurasjoner av typen ' + Kind[this.kind.valueOf()] + ' ble oppdatert');
      }
    });

    instance.delete.pipe(takeUntil(this.ngOnUnsubscribe))
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
}




