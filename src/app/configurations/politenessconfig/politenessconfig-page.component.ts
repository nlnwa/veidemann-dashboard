import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {BrowserConfig, Label, PolitenessConfig} from '../../commons/models/config.model';
import {combineLatest, from, Subject} from 'rxjs';
import {catchError, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {PolitenessConfigService} from './politenessconfig.service';
import {ActivatedRoute} from '@angular/router';
import {DetailDirective} from '../shared/detail.directive';
import {FormBuilder} from '@angular/forms';
import {PolitenessconfigDetailsComponent} from './politenessconfig-details/politenessconfig-details.component';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {getInitialLabels, updatedLabels, findLabel, intersectLabel} from '../../commons/group-update/labels/common-labels';
import {findSelector, getInitialSelectors, intersectSelector, updatedSelectors} from '../../commons/group-update/labels/common-selector';

@Component({
  selector: 'app-politenessconfig',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span i18n="@@politenessconfigListHeader" class="toolbar--title">Politeness</span>
          <button mat-mini-fab (click)="onCreatePolitenessConfig()"
                  [disabled]="!singleMode ? true : false"
                  [matTooltip]="!singleMode ? 'Kan ikke opprette en ny konfigurasjon når flere er valgt.':'Legg til en ny konfigurasjon.'">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-selection-base-list (rowClick)="onSelectPolitenessConfig($event)"
                                 [data]="data$ | async"
                                 (selectedChange)="onSelectedChange($event)"
                                 (selectAll)="onSelectAll($event)"
                                 (page)="onPage($event)">
        </app-selection-base-list>
      </div>
      <app-politenessconfig-details [politenessConfig]="politenessConfig"
                                    [robotsPolicies]="robotsPolicies"
                                    *ngIf="politenessConfig && robotsPolicies && singleMode"
                                    (update)="onUpdatePolitenessConfig($event)"
                                    (save)="onSavePolitenessConfig($event)"
                                    (delete)="onDeletePolitenessConfig($event)">
      </app-politenessconfig-details>
      <ng-template detail-host></ng-template>
    </div>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolitenessConfigPageComponent implements OnInit {

  selectedConfigs = [];
  componentRef = null;

  politenessConfig: PolitenessConfig;
  robotsPolicies = [];
  changes: Subject<void> = new Subject<void>();
  page: Subject<PageEvent> = new Subject<PageEvent>();
  data = new Subject<any>();
  data$ = this.data.asObservable();
  allSelected = false;

  @ViewChild(DetailDirective) detailHost: DetailDirective;

  constructor(private politenessConfigService: PolitenessConfigService,
              private snackBarService: SnackBarService,
              private route: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver,
              private fb: FormBuilder,
              private dialog: MatDialog) {
  }

  get singleMode(): boolean {
    return this.selectedConfigs.length < 2;
  }

  ngOnInit() {
    this.politenessConfigService.getRobotsConfig()
      .subscribe(robotsPolicies => this.robotsPolicies = robotsPolicies);

    combineLatest(this.page, this.changes.pipe(startWith(null))).pipe(
      switchMap(([pageEvent]) => {
        return this.politenessConfigService.search({
          page_size: pageEvent.pageSize,
          page: pageEvent.pageIndex
        });
      }),
    ).subscribe((reply) => {
      this.data.next({
        value: reply.value,
        pageLength: parseInt(reply.count, 10),
        pageSize: reply.page_size || 0,
        pageIndex: reply.page || 0,
      });
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.politenessConfigService.get(id)
        .subscribe(politenessConfig => {
          this.politenessConfig = politenessConfig;
        });
    }
  }

  loadComponent(politenessConfig: PolitenessConfig,
                robotsPolicies: any[],
                labels: Label[],
                selectors: string[],
                equalRobotsPolicies: boolean) {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PolitenessconfigDetailsComponent);
    const viewContainerRef = this.detailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as PolitenessconfigDetailsComponent;
    instance.politenessConfig = politenessConfig;
    instance.robotsPolicies = robotsPolicies;
    instance.robotsPolicyList = robotsPolicies;
    instance.equalRobotPolicy = equalRobotsPolicies;
    // instance.robotsPolicyList.push(' ');
    instance.data = false;
    instance.updateForm();

    if (!this.allSelected) {
      instance.update.subscribe(
        (politenessConfigs) => this.onUpdateMultiplePolitenessConfigs(politenessConfigs, labels, selectors));
      instance.delete.subscribe(
        () => this.onDeleteMultiplePolitenessConfigs(this.selectedConfigs));
    }

    if (this.allSelected) {
      instance.update.subscribe((politenessConfigUpdate) => this.onUpdateAllPolitenessConfigs(politenessConfigUpdate));
      instance.delete.subscribe(() => this.onDeleteAllPolitenessConfigs());
    }
  }

  onPage(page: PageEvent) {
    this.page.next(page);
  }

  onSelectedChange(politenessConfigs: PolitenessConfig[]) {
    this.selectedConfigs = politenessConfigs;
    if (!this.singleMode) {
      if (!this.allSelected) {
        this.loadComponent(this.mergePolitenessConfigs(politenessConfigs),
          this.robotsPolicies, getInitialLabels(politenessConfigs, PolitenessConfig),
          getInitialSelectors(politenessConfigs, PolitenessConfig), isRobotPoliciesEqual(politenessConfigs));
      } else {
        const politenessConfig = new PolitenessConfig();
        politenessConfig.id = '1234567';
        politenessConfig.meta.name = 'update';
        this.loadComponent(politenessConfig, this.robotsPolicies, [], [], true);
      }
    } else {
      this.politenessConfig = politenessConfigs[0];
      if (this.componentRef !== null) {
        this.componentRef.destroy();
      }
      if (this.politenessConfig === undefined) {
        this.politenessConfig = null;
      }
    }
  }

  onCreatePolitenessConfig(): void {
    this.politenessConfig = new PolitenessConfig();
  }

  onSelectPolitenessConfig(politenessConfig: PolitenessConfig) {
    this.politenessConfig = politenessConfig;
  }

  onSelectAll(allSelected: boolean) {
    this.allSelected = allSelected;
    if (allSelected) {
      this.onSelectedChange([new PolitenessConfig(), new PolitenessConfig()]);
    } else {
      this.onSelectedChange([]);
      this.componentRef.destroy();
    }
  }

  onSavePolitenessConfig(politenessConfig: PolitenessConfig) {
    this.politenessConfigService.create(politenessConfig)
      .subscribe(newPolitenessConfig => {
        this.politenessConfig = newPolitenessConfig;
        this.changes.next();
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdatePolitenessConfig(politenessConfig: PolitenessConfig) {
    this.politenessConfigService.update(politenessConfig)
      .subscribe(updatedPolitenessConfig => {
        this.politenessConfig = updatedPolitenessConfig;
        this.changes.next();
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onUpdateMultiplePolitenessConfigs(politenessConfigUpdate: PolitenessConfig, initialLabels: Label[], initialSelectors: any[]) {
    const numOfConfigs = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((politenessConfig: PolitenessConfig) => {
        if (politenessConfig.meta.label === undefined) {
          politenessConfig.meta.label = [];
        }
        politenessConfig.meta.label = updatedLabels(politenessConfigUpdate.meta.label
          .concat(politenessConfig.meta.label));
        for (const label of initialLabels) {
          if (!findLabel(politenessConfigUpdate.meta.label, label.key, label.value)) {
            politenessConfig.meta.label.splice(
              politenessConfig.meta.label.findIndex(
                removedLabel => removedLabel.key === label.key && removedLabel.value === label.value),
              1);
          }
        }

        if (politenessConfig.crawl_host_group_selector === undefined) {
          politenessConfig.crawl_host_group_selector = [];
        }
        politenessConfig.crawl_host_group_selector = updatedSelectors(politenessConfigUpdate.crawl_host_group_selector
          .concat(politenessConfig.crawl_host_group_selector));

        for (const selector of initialSelectors) {
          if (!findSelector(politenessConfigUpdate.crawl_host_group_selector, selector)) {
            politenessConfig.crawl_host_group_selector.splice(
              politenessConfig.crawl_host_group_selector.findIndex(
                removedSelector => removedSelector === selector), 1);
          }
        }

        if (politenessConfigUpdate.robots_policy !== undefined) {
          politenessConfig.robots_policy = politenessConfigUpdate.robots_policy;
        }
        if (politenessConfigUpdate.robots_policy === 'CUSTOM_ROBOTS') {
          if (politenessConfigUpdate.custom_robots !== null) {
            politenessConfig.custom_robots = politenessConfigUpdate.custom_robots;
          }
        }

        if (!isNaN(politenessConfigUpdate.minimum_robots_validity_duration_s)) {
          politenessConfig.minimum_robots_validity_duration_s = politenessConfigUpdate.minimum_robots_validity_duration_s;
        }
        if (!isNaN(politenessConfigUpdate.min_time_between_page_load_ms)) {
          politenessConfig.min_time_between_page_load_ms = politenessConfigUpdate.min_time_between_page_load_ms;
        }
        if (!isNaN(politenessConfigUpdate.max_time_between_page_load_ms)) {
          politenessConfig.max_time_between_page_load_ms = politenessConfigUpdate.max_time_between_page_load_ms;
        }
        if (!isNaN(politenessConfigUpdate.delay_factor)) {
          politenessConfig.delay_factor = politenessConfigUpdate.delay_factor;
        }
        if (!isNaN(politenessConfigUpdate.max_retries)) {
          politenessConfig.max_retries = politenessConfigUpdate.max_retries;
        }
        if (!isNaN(politenessConfigUpdate.retry_delay_seconds)) {
          politenessConfig.retry_delay_seconds = politenessConfigUpdate.retry_delay_seconds;
        }
        return this.politenessConfigService.update(politenessConfig);
      }),
      catchError((err) => {
        console.log(err);
        return of('true');
      }),
    ).subscribe(() => {
      this.selectedConfigs = [];
      this.componentRef.destroy();
      this.politenessConfig = null;
      this.changes.next();
      this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner er oppdatert');
    });
  }

  onUpdateAllPolitenessConfigs(politenessConfigUpdate: PolitenessConfig) {
    console.log('Skal oppdatere alle politenessConfig i databasen med configen: ', politenessConfigUpdate);
  }

  onDeletePolitenessConfig(politenessConfig: PolitenessConfig) {
    this.politenessConfigService.delete(politenessConfig.id)
      .subscribe(() => {
        this.politenessConfig = null;
        this.snackBarService.openSnackBar('Slettet');
      });
    this.changes.next();
  }

  onDeleteMultiplePolitenessConfigs(politenessConfigs: PolitenessConfig[]) {
    const numOfConfigs = politenessConfigs.length.toString();
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
          from(politenessConfigs).pipe(
            mergeMap((config) => this.politenessConfigService.delete(config.id)),
            catchError((err) => {
              console.log(err);
              return of('true');
            }),
          ).subscribe(() => {
            this.selectedConfigs = [];
            this.componentRef.destroy();
            this.politenessConfig = null;
            this.changes.next();
            this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner slettet');
          });
        } else {
          this.snackBarService.openSnackBar('Sletter ikke konfigurasjonene');
        }
      });
  }

  onDeleteAllPolitenessConfigs() {
    console.log('skal slette alle politenessconfigs i databasen');
  }

  mergePolitenessConfigs(politenessConfigs: PolitenessConfig[]) {
    const config = new PolitenessConfig();
    const compareObj = politenessConfigs[0];
    config.id = '1234567';
    config.meta.name = 'Multi';

    const equalRobotPolicy = isRobotPoliciesEqual(politenessConfigs);

    const equalMinRobotsValidity = politenessConfigs.every(function (cfg: PolitenessConfig) {
      return cfg.minimum_robots_validity_duration_s === compareObj.minimum_robots_validity_duration_s;
    });

    const equalMinTimeBetweenPageload = politenessConfigs.every(function (cfg: PolitenessConfig) {
      return cfg.min_time_between_page_load_ms === compareObj.min_time_between_page_load_ms;
    });

    const equalMaxTimeBetweenPageload = politenessConfigs.every(function (cfg: PolitenessConfig) {
      return cfg.max_time_between_page_load_ms === compareObj.max_time_between_page_load_ms;
    });

    const equalDelayFactor = politenessConfigs.every(function (cfg: PolitenessConfig) {
      return cfg.delay_factor === compareObj.delay_factor;
    });

    const equalMaxRetries = politenessConfigs.every(function (cfg: PolitenessConfig) {
      return cfg.max_retries === compareObj.max_retries;
    });

    const equalRetryDelay = politenessConfigs.every(function (cfg: PolitenessConfig) {
      return cfg.retry_delay_seconds === compareObj.retry_delay_seconds;
    });

    const equalCustomRobot = politenessConfigs.every(function (cfg: PolitenessConfig) {
      return cfg.custom_robots === compareObj.custom_robots;
    });

    if (equalRobotPolicy) {
      config.robots_policy = compareObj.robots_policy;
    }

    if (equalCustomRobot) {
      config.custom_robots = compareObj.custom_robots;
    } else {
      config.custom_robots = null;
    }

    if (equalMinRobotsValidity) {
      config.minimum_robots_validity_duration_s = compareObj.minimum_robots_validity_duration_s;
    } else {
      config.minimum_robots_validity_duration_s = null;
    }

    if (equalMinTimeBetweenPageload) {
      config.min_time_between_page_load_ms = compareObj.min_time_between_page_load_ms;
    } else {
      config.min_time_between_page_load_ms = null;
    }

    if (equalMaxTimeBetweenPageload) {
      config.max_time_between_page_load_ms = compareObj.max_time_between_page_load_ms;
    } else {
      config.max_time_between_page_load_ms = null;
    }
    if (equalDelayFactor) {
      config.delay_factor = compareObj.delay_factor;
    } else {
      config.delay_factor = null;
    }
    if (equalMaxRetries) {
      config.max_retries = compareObj.max_retries;
    } else {
      config.max_retries = null;
    }
    if (equalRetryDelay) {
      config.retry_delay_seconds = compareObj.retry_delay_seconds;
    } else {
      config.retry_delay_seconds = null;
    }

    const label = politenessConfigs.reduce((acc: PolitenessConfig, curr: PolitenessConfig) => {
      config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
      return config;
    });

    const selector = politenessConfigs.reduce((acc: PolitenessConfig, curr: PolitenessConfig) => {
      if (acc.crawl_host_group_selector === undefined || curr.crawl_host_group_selector === undefined) {
        acc.crawl_host_group_selector = [];
        curr.crawl_host_group_selector = [];
      }
      config.crawl_host_group_selector = intersectSelector(acc.crawl_host_group_selector, curr.crawl_host_group_selector);
      return config;
    });
    return config;
  }
}

function isRobotPoliciesEqual(configs: PolitenessConfig[]): boolean {
  const compareObj = configs[0];
  const equalRobotsPolicies = configs.every(function (cfg) {
    return cfg.robots_policy === compareObj.robots_policy;
  });
  return equalRobotsPolicies;
}
