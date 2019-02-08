import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {SnackBarService} from '../commons/snack-bar/snack-bar.service';
import {BehaviorSubject, combineLatest, from, of, Subject} from 'rxjs';
import {catchError, map, mergeMap, startWith} from 'rxjs/operators';

import {ActivatedRoute, Router} from '@angular/router';
import {DetailDirective} from './shared/detail.directive';
import {RoleService} from '../auth';
import {FormBuilder, Validators} from '@angular/forms';
import {BackendService} from './shared/backend.service';
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
import {ScheduleDetailsComponent} from './schedule';
import {BrowserScriptDetailsComponent} from './browserscript';
import {PolitenessconfigDetailsComponent} from './politenessconfig';
import {CrawljobDetailsComponent} from './crawljobs';
import {CrawlConfigDetailsComponent} from './crawlconfig';
import {CrawlHostGroupConfigDetailsComponent} from './crawlhostgroupconfig';
import {RoleMappingDetailsComponent} from './rolemapping';
import {DeleteDialogComponent} from '../dialog/delete-dialog/delete-dialog.component';
import {BrowserConfigDetailsComponent} from './browserconfig';
import {FieldMask, ListRequest, UpdateRequest} from '../../api/';


@Component({
  templateUrl: './configurations.component.html',
  styleUrls: [],
})

export class ConfigurationsComponent implements OnInit {
  readonly Kind = Kind;
  selectedConfigs = [];

  componentRef = null;
  allSelected = false;

  kind: Kind;
  configObject: ConfigObject;

  changes: Subject<void> = new Subject<void>();
  page: Subject<PageEvent> = new Subject<PageEvent>();
  count = new BehaviorSubject<number>(0);
  count$ = this.count.asObservable();
  data = new Subject<ConfigObject[]>();
  data$ = this.data.asObservable();

  @ViewChild(DetailDirective) detailHost: DetailDirective;

  constructor(private configService: BackendService,
              private snackBarService: SnackBarService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private fb: FormBuilder,
              private roleService: RoleService,
              private dialog: MatDialog) {
  }

  get title(): string {
    switch (this.kind) {
      case Kind.UNDEFINED:
        break;
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
    }
    // TODO
    return 'not implemented';
  }

  get singleMode(): boolean {
    return this.selectedConfigs.length < 2;
  }

  ngOnInit() {
    this.kind = this.activatedRoute.snapshot.data.kind;

    const listRequest = new ListRequest();
    listRequest.setKind(this.kind.valueOf());

    this.configService.count(listRequest).subscribe(count => this.count.next(count));
    combineLatest(this.page, this.changes.pipe(startWith(null))).pipe(
      map(([pageEvent]) => {
        listRequest.setOffset(pageEvent.pageIndex * pageEvent.pageSize);
        listRequest.setPageSize(pageEvent.pageSize);
        return listRequest;
      }),
      mergeMap((request) => this.configService.list(request)),
      map(configObjects => configObjects.map(ConfigObject.fromProto))
    ).subscribe(
      (configObjects: ConfigObject[]) => this.data.next(configObjects),
      err => console.error(err),
      () => console.log('sub'));
    // const id = this.routeSnapshot.paramMap.get('id');
    // if (id != null) {
    //   this.browserConfigService.get(id)
    //     .subscribe(configObject => {
    //       this.configObject = configObject;
    //     });
    // }
  }

  loadComponent(mergedConfig: ConfigObject) {
    let component;
    const instanceData: any = {};
    switch (this.kind) {
      case Kind.UNDEFINED:
        break;
      case Kind.CRAWLENTITY:
        break;
      case Kind.SEED:
        break;
      case Kind.CRAWLJOB:
        component = CrawljobDetailsComponent;
        break;
      case Kind.CRAWLCONFIG:
        component = CrawlConfigDetailsComponent;
        break;
      case Kind.CRAWLSCHEDULECONFIG:
        component = ScheduleDetailsComponent;
        break;
      case Kind.BROWSERCONFIG:
        component = BrowserConfigDetailsComponent;
        break;
      case Kind.POLITENESSCONFIG:
        component = PolitenessconfigDetailsComponent;
        break;
      case Kind.BROWSERSCRIPT:
        component = BrowserScriptDetailsComponent;
        break;
      case Kind.CRAWLHOSTGROUPCONFIG:
        component = CrawlHostGroupConfigDetailsComponent;
        break;
      case Kind.ROLEMAPPING:
        component = RoleMappingDetailsComponent;
        break;

    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.detailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = Object.assign(this.componentRef.instance, instanceData);
    const formControl = instance.form.controls;

    instance.configObject = mergedConfig;

    // adding validator for forms
    if (this.kind === Kind.CRAWLSCHEDULECONFIG) {
      instance.form.get('cronExpression').clearValidators();
      instance.form.get('cronExpression.minute').setValidators(Validators.pattern(new RegExp(VALID_CRON_MINUTE_PATTERN)));
      instance.form.get('cronExpression.hour').setValidators(Validators.pattern(new RegExp(VALID_CRON_HOUR_PATTERN)));
      instance.form.get('cronExpression.dom').setValidators(Validators.pattern(new RegExp(VALID_CRON_DOM_PATTERN)));
      instance.form.get('cronExpression.month').setValidators(Validators.pattern(new RegExp(VALID_CRON_MONTH_PATTERN)));
      instance.form.get('cronExpression.dow').setValidators(Validators.pattern(new RegExp(VALID_CRON_DOW_PATTERN)));
    }
    if (this.kind === Kind.CRAWLJOB) {
      instance.form.get('crawlConfigRef').clearValidators();
    }

    instance.data = false;
    instance.updateAll = this.allSelected;
    instance.updateForm();

    if (!this.allSelected) {
      instance.update.subscribe(
        (configUpdate) => {
          const addLabel = instance.shouldAddLabel;
          const addBrowserscript = instance.shouldAddBrowserscript;
          const addRoles = instance.shouldAddRoles;
          const addSelector = instance.shouldAddScriptSelector;
          const addIpRange = instance.shouldAddIpRange;
          this.onUpdateSelectedConfigs(mergedConfig, configUpdate, formControl,
            addLabel, addBrowserscript, addRoles, addSelector, addIpRange);
        });
      instance.delete.subscribe(
        () => this.onDeleteSelectedConfigs(this.selectedConfigs));
    }

    if (this.allSelected) {
      instance.update.subscribe(
        (configUpdate) => {
          const addLabel = instance.shouldAddLabel;
          const addBrowserscript = instance.shouldAddBrowserscript;
          const addScriptSelector = instance.shouldAddScriptSelector;
          const addRoles = instance.shouldAddRoles;
          const addIpRange = instance.shouldAddIpRange;
          this.onUpdateAllConfigsOfKind(configUpdate, formControl, addLabel, addBrowserscript, addRoles, addScriptSelector, addIpRange);
        });
      //  instance.delete.subscribe(() => this.onDeleteAllBrowserConfigs());
    }
  }

  onPage(page: PageEvent) {
    this.page.next(page);
  }

  onSelectedChange(configs: ConfigObject[]) {
    this.selectedConfigs = configs;
    if (!this.singleMode) {
      if (!this.allSelected) {
        this.loadComponent(ConfigObject.mergeConfigs(configs));
      } else {
        const config = configs[0];
        config.meta.name = 'update';
        config.id = '1234567';
        this.loadComponent(config);
      }
    } else {
      this.configObject = configs[0] || null;
      if (this.componentRef !== null) {
        this.componentRef.destroy();
      }
    }
  }

  onCreateConfig(): void {
    this.configObject = new ConfigObject({kind: this.kind});
  }

  onSelectConfig(config: ConfigObject) {
    switch (this.kind) {
      case Kind.UNDEFINED:
        break;
      case Kind.CRAWLENTITY:
        this.router.navigate(['entity', config.id]);
        break;
      case Kind.SEED:
        this.router.navigate(['seed', config.id]);
        break;
      case Kind.CRAWLJOB:
        this.router.navigate(['crawljobs', config.id]);
        break;
      case Kind.CRAWLCONFIG:
        this.router.navigate(['crawlconfig', config.id]);
        break;
      case Kind.CRAWLSCHEDULECONFIG:
        this.router.navigate(['schedule', config.id]);
        break;
      case Kind.BROWSERCONFIG:
        this.router.navigate(['browserconfig', config.id]);
        break;
      case Kind.POLITENESSCONFIG:
        this.router.navigate(['politenessconfig', config.id]);
        break;
      case Kind.BROWSERSCRIPT:
        this.router.navigate(['browserscript', config.id]);
        break;
      case Kind.CRAWLHOSTGROUPCONFIG:
        this.router.navigate(['crawlhostgroupconfig', config.id]);
        break;
      case Kind.ROLEMAPPING:
        this.router.navigate(['rolemapping', config.id]);
        break;
    }
    this.configObject = config;
  }

  onSelectAll(allSelected: boolean) {
    this.allSelected = allSelected;
    if (allSelected) {
      this.onSelectedChange([new ConfigObject({kind: this.kind}), new ConfigObject({kind: this.kind})]);
    } else {
      this.onSelectedChange([]);
    }
  }

  onSaveConfig(configObject: ConfigObject) {
    this.configService.save(configObject.toProto())
      .subscribe(newConfig => {
        this.count.next(this.count.value + 1);
        this.configObject = ConfigObject.fromProto(newConfig);
        this.changes.next();
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdateConfig(configObject: ConfigObject) {
    this.configService.save(configObject.toProto())
      .subscribe(newConfig => {
        this.configObject = ConfigObject.fromProto(newConfig);
        this.changes.next();
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onDeleteConfig(configObject: ConfigObject) {
    this.configService.delete(configObject.toProto())
      .subscribe(() => {
        this.count.next(this.count.value - 1);
        this.configObject = null;
        this.changes.next();
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onUpdateSelectedConfigs(mergedConfig: ConfigObject, configUpdate: ConfigObject, formControl: any,
                          addLabel: boolean, addBrowserscript: boolean, addRoles: boolean, addSelector: boolean, addIpRange: boolean) {

    const kind = configUpdate.kind;
    const numOfConfigs = this.selectedConfigs.length.toString(10);

    const updateRequest = new UpdateRequest();
    const updateMask = new FieldMask();
    const listRequest = new ListRequest();
    const updateTemplate = new ConfigObject();
    updateTemplate.meta = new Meta();

    const ids = [];
    for (const config of this.selectedConfigs) {
      ids.push(config.id);
    }
    listRequest.setIdList(ids);

    const pathList = [];


    switch (kind) {
      case Kind.UNDEFINED:
        break;
      case Kind.CRAWLENTITY:
        break;
      case Kind.SEED:
        break;
      case Kind.CRAWLJOB:
        const crawlJob = new CrawlJob().createUpdateRequest(configUpdate, formControl, mergedConfig);
        updateTemplate.crawlJob = crawlJob.updateTemplate;
        listRequest.setKind(Kind.CRAWLJOB.valueOf());
        if (crawlJob.pathList.length !== 0) {
          pathList.push(...crawlJob.pathList);
        }
        break;
      case Kind.CRAWLCONFIG:
        const crawlConfig = new CrawlConfig().createUpdateRequest(configUpdate, formControl, mergedConfig);
        updateTemplate.crawlConfig = crawlConfig.updateTemplate;
        listRequest.setKind(Kind.CRAWLCONFIG.valueOf());
        if (crawlConfig.pathList.length !== 0) {
          pathList.push(...crawlConfig.pathList);
        }
        break;
      case Kind.CRAWLSCHEDULECONFIG:
        const crawlScheduleConfig = new CrawlScheduleConfig().createUpdateRequest(configUpdate, formControl, mergedConfig);
        updateTemplate.crawlScheduleConfig = crawlScheduleConfig.updateTemplate;
        listRequest.setKind(Kind.CRAWLSCHEDULECONFIG.valueOf());
        if (crawlScheduleConfig.pathList.length !== 0) {
          pathList.push(...crawlScheduleConfig.pathList);
        }
        break;
      case Kind.BROWSERCONFIG:
        const browserConfig = new BrowserConfig()
          .createUpdateRequest(configUpdate, formControl, mergedConfig, addBrowserscript, addSelector);
        updateTemplate.browserConfig = browserConfig.updateTemplate;
        listRequest.setKind(Kind.BROWSERCONFIG.valueOf());
        if (browserConfig.pathList.length !== 0) {
          pathList.push(...browserConfig.pathList);
        }
        break;
      case Kind.POLITENESSCONFIG:
        const politenessConfig = new PolitenessConfig().createUpdateRequest(configUpdate, formControl, mergedConfig, addSelector);
        updateTemplate.politenessConfig = politenessConfig.updateTemplate;
        listRequest.setKind(Kind.POLITENESSCONFIG.valueOf());
        if (politenessConfig.pathList.length !== 0) {
          pathList.push(...politenessConfig.pathList);
        }
        break;
      case Kind.BROWSERSCRIPT:
        const browserScript = new BrowserScript().createUpdateRequest(configUpdate, formControl, mergedConfig);
        updateTemplate.browserScript = browserScript.updateTemplate;
        listRequest.setKind(Kind.BROWSERSCRIPT.valueOf());
        if (browserScript.pathList.length !== 0) {
          pathList.push(...browserScript.pathList);
        }
        break;
      case Kind.CRAWLHOSTGROUPCONFIG:
        const crawlHostGroupConfig = new CrawlHostGroupConfig().createUpdateRequest(configUpdate, formControl, addIpRange, mergedConfig);
        updateTemplate.crawlHostGroupConfig = crawlHostGroupConfig.updateTemplate;
        listRequest.setKind(Kind.CRAWLHOSTGROUPCONFIG.valueOf());
        if (crawlHostGroupConfig.pathList.length !== 0) {
          pathList.push(...crawlHostGroupConfig.pathList);
        }
        break;
      case Kind.ROLEMAPPING:
        const roleMapping = new RoleMapping().createUpdateRequest(configUpdate, formControl, addRoles, mergedConfig);
        updateTemplate.roleMapping = roleMapping.updateTemplate;
        listRequest.setKind(Kind.ROLEMAPPING.valueOf());
        if (roleMapping.pathList.length !== 0) {
          pathList.push(...roleMapping.pathList);
        }
        break;

    }

    const meta = new Meta().createUpdateRequest(configUpdate, formControl, mergedConfig, addLabel);
    updateTemplate.meta = meta.updateTemplate;
    if (meta.pathList.length !== 0) {
      pathList.push(...meta.pathList);
    }

    updateMask.setPathsList(pathList);

    updateRequest.setListRequest(listRequest);
    updateRequest.setUpdateTemplate(updateTemplate.toProto());
    updateRequest.setUpdateMask(updateMask);

    console.log('configUpdateRequest multiple: ', updateRequest.toObject());

    this.configService.update(updateRequest)
      .subscribe(updatedConfigs => {
        this.selectedConfigs = [];
        this.componentRef.destroy();
        this.configObject = null;
        this.changes.next();
        this.snackBarService.openSnackBar(numOfConfigs + ' konfigurasjoner oppdatert');
      });
  }

  onDeleteSelectedConfigs(configObjects: ConfigObject[]) {
    const numOfConfigs = this.selectedConfigs.length.toString();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      numberOfConfigs: numOfConfigs
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          from(configObjects).pipe(
            mergeMap((configObject) => this.configService.delete(configObject.toProto())),
            catchError((err) => {
              console.log(err);
              return of('true');
            }),
          ).subscribe(() => {
            this.selectedConfigs = [];
            this.componentRef.destroy();
            this.configObject = null;
            this.changes.next();
            this.snackBarService.openSnackBar(numOfConfigs + ' konfigurasjoner slettet');
          });
        } else {
          this.snackBarService.openSnackBar('Sletter ikke konfigurasjonene');
        }
      });
  }

  onUpdateAllConfigsOfKind(configUpdate: ConfigObject, formControl: any, addLabels: boolean,
                           addBrowserscript: boolean, addRoles: boolean, addSelector: boolean, addIpRange: boolean) {
    const kind = configUpdate.kind;
    const updateRequest = new UpdateRequest();
    const updateMask = new FieldMask();
    const listRequest = new ListRequest();
    const updateTemplate = new ConfigObject();
    updateTemplate.meta = new Meta();

    const pathList = [];

    switch (kind) {
      case Kind.UNDEFINED:
        break;
      case Kind.CRAWLENTITY:
        break;
      case Kind.SEED:
        break;
      case Kind.CRAWLJOB:
        const crawlJob = new CrawlJob().createUpdateRequest(configUpdate, formControl);
        updateTemplate.crawlJob = crawlJob.updateTemplate;
        listRequest.setKind(Kind.CRAWLJOB.valueOf());
        if (crawlJob.pathList.length !== 0) {
          pathList.push(...crawlJob.pathList);
        }
        break;
      case Kind.CRAWLCONFIG:
        const crawlConfig = new CrawlConfig().createUpdateRequest(configUpdate, formControl);
        updateTemplate.crawlConfig = crawlConfig.updateTemplate;
        listRequest.setKind(Kind.CRAWLCONFIG.valueOf());
        if (crawlConfig.pathList.length !== 0) {
          pathList.push(...crawlConfig.pathList);
        }
        break;
      case Kind.CRAWLSCHEDULECONFIG:
        const crawlScheduleConfig = new CrawlScheduleConfig().createUpdateRequest(configUpdate, formControl);
        updateTemplate.crawlScheduleConfig = crawlScheduleConfig.updateTemplate;
        listRequest.setKind(Kind.CRAWLSCHEDULECONFIG.valueOf());
        if (crawlScheduleConfig.pathList.length !== 0) {
          pathList.push(...crawlScheduleConfig.pathList);
        }
        break;
      case Kind.BROWSERCONFIG:
        const browserConfig = new BrowserConfig().createUpdateRequest(configUpdate, formControl, null,
          addBrowserscript, addSelector);
        updateTemplate.browserConfig = browserConfig.updateTemplate;
        listRequest.setKind(Kind.BROWSERCONFIG.valueOf());
        if (browserConfig.pathList.length !== 0) {
          pathList.push(...browserConfig.pathList);
        }
        break;
      case Kind.POLITENESSCONFIG:
        const politenessConfig = new PolitenessConfig().createUpdateRequest(configUpdate, formControl, null, addSelector);
        updateTemplate.politenessConfig = politenessConfig.updateTemplate;
        listRequest.setKind(Kind.POLITENESSCONFIG.valueOf());
        if (politenessConfig.pathList.length !== 0) {
          pathList.push(...politenessConfig.pathList);
        }
        break;
      case Kind.BROWSERSCRIPT:
        const browserScript = new BrowserScript().createUpdateRequest(configUpdate, formControl);
        updateTemplate.browserScript = browserScript.updateTemplate;
        listRequest.setKind(Kind.BROWSERSCRIPT.valueOf());
        if (browserScript.pathList.length !== 0) {
          pathList.push(...browserScript.pathList);
        }
        break;
      case Kind.CRAWLHOSTGROUPCONFIG:
        const crawlHostGroupConfig = new CrawlHostGroupConfig().createUpdateRequest(configUpdate, formControl, addIpRange);
        updateTemplate.crawlHostGroupConfig = crawlHostGroupConfig.updateTemplate;
        listRequest.setKind(Kind.CRAWLHOSTGROUPCONFIG.valueOf());
        if (crawlHostGroupConfig.pathList.length !== 0) {
          pathList.push(...crawlHostGroupConfig.pathList);
        }
        break;
      case Kind.ROLEMAPPING:
        const roleMapping = new RoleMapping().createUpdateRequest(configUpdate, formControl, addRoles);
        updateTemplate.roleMapping = roleMapping.updateTemplate;
        listRequest.setKind(Kind.ROLEMAPPING.valueOf());
        if (roleMapping.pathList.length !== 0) {
          pathList.push(...roleMapping.pathList);
        }
        break;

    }

    const meta = new Meta().createUpdateRequest(configUpdate, formControl, null, addLabels);
    updateTemplate.meta = meta.updateTemplate;
    if (meta.pathList.length !== 0) {
      pathList.push(...meta.pathList);
    }

    listRequest.setIdList([]);
    updateMask.setPathsList(pathList);


    updateRequest.setListRequest(listRequest);
    updateRequest.setUpdateTemplate(updateTemplate.toProto());
    updateRequest.setUpdateMask(updateMask);

    this.configService.update(updateRequest)
      .subscribe(updatedConfigs => {
        this.selectedConfigs = [];
        this.componentRef.destroy();
        this.configObject = null;
        this.changes.next();
        this.snackBarService.openSnackBar('Alle konfigurasjoner av typen ' + this.kind + ' er oppdatert');
      });
  }
}




