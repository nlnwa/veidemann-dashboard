import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {Label, PolitenessConfig} from '../../commons/models/config.model';
import {combineLatest, from, Subject} from 'rxjs';
import {catchError, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {ListDatabase, ListDataSource} from '../../commons/list/';
import {PolitenessConfigService} from './politenessconfig.service';
import {ActivatedRoute} from '@angular/router';
import {DetailDirective} from '../shared/detail.directive';
import {FormBuilder} from '@angular/forms';
import {PolitenessconfigDetailsComponent} from './politenessconfig-details/politenessconfig-details.component';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-politenessconfig',
  template: `
    <app-search-config [term]="term"
                       (submit)="onSearch($event)"></app-search-config>
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span i18n="@@politenessconfigListHeader" class="toolbar--title">Politeness</span>
          <button mat-mini-fab (click)="onCreatePolitenessConfig()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-politenessconfig-list (rowClick)="onSelectPolitenessConfig($event)"
                                   [data]="data$ | async"
                                   (selectedChange)="onSelectedChange($event)"
                                   (labelClicked)="onLabelClick($event)"
                                   (page)="onPage($event)">
        </app-politenessconfig-list>
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
  providers: [ListDataSource, ListDatabase],
})
export class PolitenessConfigPageComponent implements OnInit {

  selectedConfigs = [];
  term = '';
  componentRef = null;

  politenessConfig: PolitenessConfig;
  robotsPolicies = [];
  changes: Subject<void> = new Subject<void>();
  page: Subject<PageEvent> = new Subject<PageEvent>();
  data = new Subject<any>();
  data$ = this.data.asObservable();

  @ViewChild(DetailDirective) detailHost: DetailDirective;

  constructor(private politenessConfigService: PolitenessConfigService,
              private snackBarService: SnackBarService,
              private database: ListDatabase,
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
        pageLenght: parseInt(reply.count, 10),
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

  loadComponent(politenessConfig: PolitenessConfig, robotsPolicies: any[]) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PolitenessconfigDetailsComponent);
    const viewContainerRef = this.detailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as PolitenessconfigDetailsComponent;
    instance.robotsPolicyList = robotsPolicies;
    instance.politenessConfig = politenessConfig;
    instance.data = false;
    instance.updateForm();
    instance.update.subscribe((politenessConfigs) => this.onUpdateMultiplePolitenessConfigs(politenessConfigs));
    instance.delete.subscribe((politenessConfigs) => this.onDeleteMultiplePolitenessConfigs(this.selectedConfigs));
  }

  onPage(page: PageEvent) {
    this.page.next(page);
  }

  onLabelClick(label) {
    if (this.term.length > 0) {
      this.term = ',' + label;
    } else {
      this.term = label;
    }
  }

  onSearch(labelQuery: string[]) {
    console.log('in pagecomp ', labelQuery);
  }

  onSelectedChange(configs: PolitenessConfig[]) {
    this.loadComponent(this.mergePolitenessConfigs(configs), this.robotsPolicies);
    this.selectedConfigs = configs;
  }

  onCreatePolitenessConfig(): void {
    this.politenessConfig = new PolitenessConfig();
  }

  onSelectPolitenessConfig(politenessConfig: PolitenessConfig) {
    this.politenessConfig = politenessConfig;
  }

  onSavePolitenessConfig(politenessConfig: PolitenessConfig) {
    this.politenessConfigService.create(politenessConfig)
      .subscribe(newPolitenessConfig => {
        this.politenessConfig = newPolitenessConfig;
        this.snackBarService.openSnackBar('Lagret');
      });
    this.changes.next();
  }

  onUpdatePolitenessConfig(politenessConfig: PolitenessConfig) {
    this.politenessConfigService.update(politenessConfig)
      .subscribe(updatedPolitenessConfig => {
        this.politenessConfig = updatedPolitenessConfig;
        this.snackBarService.openSnackBar('Oppdatert');
      });
    this.changes.next();
  }

  onUpdateMultiplePolitenessConfigs(politenessConfigUpdate: PolitenessConfig) {
    const numOfConfigs = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((politenessConfig: PolitenessConfig) => {
        politenessConfig.meta.label = updatedLabels(politenessConfigUpdate.meta.label
          .concat(politenessConfig.meta.label));
        politenessConfig.robots_policy = politenessConfigUpdate.robots_policy;
        politenessConfig.minimum_robots_validity_duration_s = politenessConfigUpdate.minimum_robots_validity_duration_s;
        politenessConfig.min_time_between_page_load_ms = politenessConfigUpdate.min_time_between_page_load_ms;
        politenessConfig.max_time_between_page_load_ms = politenessConfigUpdate.max_time_between_page_load_ms;
        politenessConfig.delay_factor = politenessConfigUpdate.delay_factor;
        politenessConfig.max_retries = politenessConfigUpdate.max_retries;
        politenessConfig.retry_delay_seconds = politenessConfigUpdate.retry_delay_seconds;
        return this.politenessConfigService.update(politenessConfig);
      }),
      catchError((err) => {
        console.log(err);
        return of('true');
      }),
    ).subscribe((response) => {
      this.selectedConfigs = [];
      this.componentRef.destroy();
      this.politenessConfig = null;
      this.changes.next();
      this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner er oppdatert');
    });
  }

  onDeletePolitenessConfig(politenessConfig: PolitenessConfig) {
    this.politenessConfigService.delete(politenessConfig.id)
      .subscribe((response) => {
        this.politenessConfig = null;
        this.snackBarService.openSnackBar('Slettet');
      });
    this.changes.next();
  }

  onDeleteMultiplePolitenessConfigs(configs: PolitenessConfig[]) {
    const numOfConfigs = configs.length.toString();
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
          from(configs).pipe(
            mergeMap((config) => this.politenessConfigService.delete(config.id)),
            catchError((err) => {
              console.log(err);
              return of('true');
            }),
          ).subscribe((response) => {
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

  mergePolitenessConfigs(configs: PolitenessConfig[]) {
    const config = new PolitenessConfig();
    const compareObj = configs[0];
    config.id = '1234567';
    config.meta.name = 'Multi';

    const equalRobotPolicy = configs.every(function (cfg: PolitenessConfig) {
      return cfg.robots_policy === compareObj.robots_policy;
    });

    const equalMinRobotsValidity = configs.every(function (cfg: PolitenessConfig) {
      return cfg.minimum_robots_validity_duration_s === compareObj.minimum_robots_validity_duration_s;
    });

    const equalMinTimeBetweenPageload = configs.every(function (cfg: PolitenessConfig) {
      return cfg.min_time_between_page_load_ms === compareObj.min_time_between_page_load_ms;
    });

    const equalMaxTimeBetweenPageload = configs.every(function (cfg: PolitenessConfig) {
      return cfg.max_time_between_page_load_ms === compareObj.max_time_between_page_load_ms;
    });

    const equalDelayFactor = configs.every(function (cfg: PolitenessConfig) {
      return cfg.delay_factor === compareObj.delay_factor;
    });

    const equalMaxRetries = configs.every(function (cfg: PolitenessConfig) {
      return cfg.max_retries === compareObj.max_retries;
    });

    const equalRetryDelay = configs.every(function (cfg: PolitenessConfig) {
      return cfg.retry_delay_seconds === compareObj.retry_delay_seconds;
    });

    if (equalRobotPolicy) {
      config.robots_policy = compareObj.robots_policy;
    }

    if (equalMinRobotsValidity) {
      config.minimum_robots_validity_duration_s = compareObj.minimum_robots_validity_duration_s;
    }

    if (equalMinTimeBetweenPageload) {
      config.min_time_between_page_load_ms = compareObj.min_time_between_page_load_ms;
    }

    if (equalMaxTimeBetweenPageload) {
      config.max_time_between_page_load_ms = compareObj.max_time_between_page_load_ms;
    }
    if (equalDelayFactor) {
      config.delay_factor = compareObj.delay_factor;
    }
    if (equalMaxRetries) {
      config.max_retries = compareObj.max_retries;
    }
    if (equalRetryDelay) {
      config.retry_delay_seconds = compareObj.retry_delay_seconds;
    }

    const label = configs.reduce((acc: PolitenessConfig, curr: PolitenessConfig) => {
      config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
      return config;
    });
    return config;
  }
}

function intersectLabel(a, b) {
  const setA = Array.from(new Set(a));
  const setB = Array.from(new Set(b));
  const intersection = new Set(setA.filter((x: Label) =>
    setB.find((label: Label) => x.key === label.key && x.value === label.value) === undefined
      ? false
      : true
  ));
  return Array.from(intersection);
}

function updatedLabels(labels) {
  const result = labels.reduce((unique, o) => {
    if (!unique.find(obj => obj.key === o.key && obj.value === o.value)) {
      unique.push(o);
    }
    return unique;
  }, []);
  return result;
}
