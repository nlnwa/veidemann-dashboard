import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewRef} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SnackBarService} from '../commons/snack-bar/snack-bar.service';
import {BehaviorSubject, EMPTY, from, Subject} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {DetailDirective} from './shared/detail.directive';
import {RoleService} from '../auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
} from '../commons/models';
import {
  VALID_CRON_DOM_PATTERN,
  VALID_CRON_DOW_PATTERN,
  VALID_CRON_HOUR_PATTERN,
  VALID_CRON_MINUTE_PATTERN,
  VALID_CRON_MONTH_PATTERN
} from '../commons/validator';
import {DeleteDialogComponent} from '../dialog/delete-dialog/delete-dialog.component';
import {ErrorService} from '../error';
import {ActivatedRoute} from '@angular/router';
import {componentOfKind} from '../commons/func/kind';
import {DataService} from './shared/data.service';
import {Title} from '@angular/platform-browser';
import {ReferrerError} from '../error/referrer-error';


@Component({
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataService]
})

export class ConfigurationsComponent implements OnInit {
  readonly Kind = Kind;
  selectedConfigs: ConfigObject[] = [];

  allSelected = false;

  kind: BehaviorSubject<Kind> = new BehaviorSubject(null);
  kind$ = this.kind.asObservable();

  configObject: Subject<ConfigObject> = new Subject<ConfigObject>();
  configObject$ = this.configObject.asObservable();

  title: BehaviorSubject<string> = new BehaviorSubject<string>('');
  title$ = this.title.asObservable();

  @ViewChild(DetailDirective) detailHost: DetailDirective;

  constructor(private dataService: DataService,
              private snackBarService: SnackBarService,
              private errorService: ErrorService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private roleService: RoleService,
              public titleService: Title,
              private dialog: MatDialog) {

  }

  get viewContainerRef(): ViewContainerRef {
    return this.detailHost.viewContainerRef;
  }

  get componentRef(): ViewRef {
    return this.detailHost.viewContainerRef.get(0);
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
    this.route.data.pipe(map(data => data.kind))
      .subscribe(kind => {
        this.destroyComponent();
        this.kind.next(kind);
        this.configObject.next(null);
        this.titleService.setTitle('Veidemann | ' + ConfigurationsComponent.getTitle(kind));
        this.title.next(ConfigurationsComponent.getTitle(kind));
        this.dataService.kind = kind;
        this.allSelected = false;
        this.selectedConfigs = [];
      });
  }

  onSelectAll() {
    this.allSelected = true;
    const configObject: ConfigObject = new ConfigObject({id: '1234567', kind: this.kind.value});
    configObject.meta = new Meta({name: 'update'});
    this.loadComponent({configObject});
  }

  onSelectedChange(configs: ConfigObject[]) {
    this.selectedConfigs = configs;
    this.allSelected = false;

    if (!this.singleMode) {
      const configObject = ConfigObject.mergeConfigs(configs);
      this.loadComponent({configObject});
    } else {
      this.destroyComponent();
    }
  }

  onCreateConfig(): void {
    this.configObject.next(new ConfigObject({kind: this.kind.value}));
  }

  onSelectConfig(configObject: ConfigObject) {
    this.configObject.next(configObject);
  }


  onSaveConfig(configObject: ConfigObject) {
    this.dataService.save(configObject)
      .subscribe(newConfig => {
        this.configObject.next(newConfig);
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdateConfig(configObject: ConfigObject) {
    this.dataService.update(configObject).subscribe(newConfig => {
      this.configObject.next(newConfig);
      this.snackBarService.openSnackBar('Oppdatert');
    });
  }

  onDeleteConfig(configObject: ConfigObject) {
    this.dataService.delete(configObject)
      .pipe(
        catchError((err) => {
          const errorString = err.message.split(':')[1];
          const deleteError = /(?=.*delete)(?=.*there are)/gm;
          if (deleteError.test(errorString)) {
            this.errorService.dispatch(new ReferrerError('Error deleting config ' + configObject.meta.name + ': ' + errorString));
          } else {
            this.errorService.dispatch(err);
          }
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.configObject.next(null);
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
              const errorString = err.message.split(':')[1];
              const deleteError = /(?=.*delete)(?=.*there are)/gm;
              if (deleteError.test(errorString)) {
                numOfDeleted--;
              } else {
                this.errorService.dispatch(err);
              }
              return EMPTY;
            })
          ).subscribe(() => {
              this.selectedConfigs = [];
              this.destroyComponent();
              this.configObject.next(null);
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

  onUpdateSelectedConfigs(mergedConfig: ConfigObject, configUpdate: ConfigObject, formControl: any, options: any) {
    const {updateTemplate, pathList} = ConfigObject.createUpdateRequest(configUpdate, mergedConfig, formControl, options);

    this.dataService.updateWithTemplate(updateTemplate, pathList, this.selectedConfigs.map(config => config.id))
      .subscribe(updatedConfigs => {
        this.selectedConfigs = [];
        this.destroyComponent();
        this.configObject.next(null);
        this.snackBarService.openSnackBar(updatedConfigs + ' konfigurasjoner oppdatert');
      });
  }

  onUpdateAllConfigsOfKind(configUpdate: ConfigObject, formControl: any, options) {
    const {pathList, updateTemplate} = ConfigObject.createUpdateRequest(configUpdate, null, formControl, options);

    this.dataService.updateWithTemplate(updateTemplate, pathList)
      .subscribe(updatedConfigs => {
        this.selectedConfigs = [];
        this.allSelected = false;
        this.destroyComponent();
        this.configObject.next(null);
        this.snackBarService.openSnackBar('Alle ' + updatedConfigs + ' konfigurasjoner av typen ' +
          Kind[this.kind.value.valueOf()] + ' er oppdatert');
      });
  }

  /**
   * Load component creates a dynamic component and initializes
   *
   * @param instanceData
   */
  private loadComponent(instanceData = {}) {
    this.destroyComponent();
    const componentRef = this.createComponent(componentOfKind(this.kind.value));
    this.initComponent(componentRef.instance, instanceData);
  }

  /**
   * Create dynamic component
   *
   * @param component
   * @param viewContainerRef
   */
  private createComponent(component: any, viewContainerRef: ViewContainerRef = this.viewContainerRef): any {
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
    Object.keys(instanceData).forEach(key => {
      instance[key] = instanceData[key];
    });

    const form: FormGroup = instance.form;

    switch (this.kind.value) {
      case Kind.CRAWLSCHEDULECONFIG:
        form.get('cronExpression').clearValidators();
        form.get('cronExpression.minute').setValidators(Validators.pattern(new RegExp(VALID_CRON_MINUTE_PATTERN)));
        form.get('cronExpression.hour').setValidators(Validators.pattern(new RegExp(VALID_CRON_HOUR_PATTERN)));
        form.get('cronExpression.dom').setValidators(Validators.pattern(new RegExp(VALID_CRON_DOM_PATTERN)));
        form.get('cronExpression.month').setValidators(Validators.pattern(new RegExp(VALID_CRON_MONTH_PATTERN)));
        form.get('cronExpression.dow').setValidators(Validators.pattern(new RegExp(VALID_CRON_DOW_PATTERN)));
        break;
      case Kind.CRAWLJOB:
        form.get('crawlConfigRef').clearValidators();
        break;
      case Kind.POLITENESSCONFIG:
        if (instanceData.configObject.politenessConfig.robotsPolicy === undefined) {
          instance.shouldDisablePolicy = true;
        }
        break;
      case Kind.CRAWLCONFIG:
        if (instanceData.configObject.crawlConfig.extra.extractText === null) {
          instance.disableExtractText = true;
        }
        if (instanceData.configObject.crawlConfig.extra.createScreenshot === null) {
          instance.disableCreateScreenshot = true;
        }
    }

    instance.data = false;
    instance.allSelected = this.allSelected;
    instance.updateForm();


    if (!this.allSelected) {
      instance.update.subscribe(
        (configUpdate) => {
          const addLabel = instance.shouldAddLabel;
          const addBrowserScript = instance.shouldAddBrowserscript;
          const addSelector = instance.shouldAddSelector;
          const addIpRange = instance.shouldAddIpRange;

          this.onUpdateSelectedConfigs(
            instance.configObject, configUpdate, form.controls,
            {addLabel, addBrowserScript, addSelector, addIpRange});
        });
      instance.delete.subscribe(
        () => this.onDeleteSelectedConfigs(this.selectedConfigs));
    } else {
      instance.update.subscribe(
        (configUpdate) => {
          const addLabel = instance.shouldAddLabel;
          const addBrowserScript = instance.shouldAddBrowserscript;
          const addSelector = instance.shouldAddSelector;
          const addIpRange = instance.shouldAddIpRange;

          this.onUpdateAllConfigsOfKind(configUpdate, form.controls,
            {addLabel, addBrowserScript, addSelector, addIpRange});
        });
    }
  }

  /**
   * Destroy dynamic component
   */
  private destroyComponent() {
    if (this.detailHost && this.componentRef) {
      this.componentRef.destroy();
    }
  }

}




