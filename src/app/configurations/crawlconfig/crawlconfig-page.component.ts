import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {BrowserConfig, CrawlConfig, Label, PolitenessConfig} from '../../commons/models/config.model';
import {combineLatest, from, Subject} from 'rxjs';
import {catchError, map, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {CrawlConfigService} from './crawlconfig.service';
import {BrowserConfigService} from '../browserconfig/browserconfig.service';
import {PolitenessConfigService} from '../politenessconfig/politenessconfig.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleService} from '../../auth';
import {FormBuilder} from '@angular/forms';
import {DetailDirective} from '../shared/detail.directive';
import {CrawlConfigDetailsComponent} from './crawlconfig-details/crawlconfig-details.component';
import {of} from 'rxjs/internal/observable/of';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {findLabel, getInitialLabels, intersectLabel, updatedLabels} from '../../commons/group-update/labels/common-labels';

@Component({
  selector: 'app-crawlconfig',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Crawlconfigs</span>
          <button mat-mini-fab (click)="onCreateCrawlConfig()"
                  [disabled]="!singleMode ? true : false"
                  [matTooltip]="!singleMode ? 'Kan ikke opprette en ny konfigurasjon når flere er valgt.':'Legg til en ny konfigurasjon.'">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-selection-base-list (rowClick)="onSelectCrawlConfig($event)"
                                 [data]="data$ | async"
                                 (selectedChange)="onSelectedChange($event)"
                                 (selectAll)="onSelectAll($event)"
                                 (page)="onPage($event)">
        </app-selection-base-list>
      </div>
      <app-crawlconfig-details [crawlConfig]="crawlConfig"
                               [browserConfigs]="browserConfigs"
                               [politenessConfigs]="politenessConfigs"
                               *ngIf="crawlConfig && singleMode"
                               (update)="onUpdateCrawlConfig($event)"
                               (save)="onSaveCrawlConfig($event)"
                               (delete)="onDeleteCrawlConfig($event)">
      </app-crawlconfig-details>
      <ng-template detail-host></ng-template>
    </div>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrawlConfigPageComponent implements OnInit {

  selectedConfigs = [];
  componentRef = null;

  crawlConfig: CrawlConfig;
  browserConfigs: BrowserConfig[];
  politenessConfigs: PolitenessConfig[];
  changes: Subject<void> = new Subject<void>();
  page: Subject<PageEvent> = new Subject<PageEvent>();
  data = new Subject<any>();
  data$ = this.data.asObservable();
  allSelected = false;

  @ViewChild(DetailDirective) detailHost: DetailDirective;

  constructor(private crawlConfigService: CrawlConfigService,
              private politenessConfigService: PolitenessConfigService,
              private browserConfigService: BrowserConfigService,
              private snackBarService: SnackBarService,
              private route: ActivatedRoute,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private fb: FormBuilder,
              private roleService: RoleService,
              private dialog: MatDialog) {
  }

  get singleMode(): boolean {
    return this.selectedConfigs.length < 2;
  }

  ngOnInit() {
    this.browserConfigService.list().pipe(map(reply => reply.value))
      .subscribe((browserConfigs) => this.browserConfigs = browserConfigs);

    this.politenessConfigService.list().pipe(map(reply => reply.value))
      .subscribe((politenessConfigs) => this.politenessConfigs = politenessConfigs);

    combineLatest(this.page, this.changes.pipe(startWith(null))).pipe(
      switchMap(([pageEvent]) => {
        return this.crawlConfigService.search({
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
      this.crawlConfigService.get(id)
        .subscribe(crawlConfig => {
          this.crawlConfig = crawlConfig;
        });
    }
  }

  loadComponent(crawlConfig: CrawlConfig,
                browserConfigs: BrowserConfig[],
                politenessConfigs: PolitenessConfig[],
                labels: Label[],
                equalExtractText: boolean,
                equalCreateSnapshot: boolean,
                equalDepthFirst: boolean) {

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CrawlConfigDetailsComponent);
    const viewContainerRef = this.detailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as CrawlConfigDetailsComponent;
    instance.crawlConfig = crawlConfig;
    instance.equalExtractText = equalExtractText;
    instance.equalCreateSnapshot = equalCreateSnapshot;
    instance.equalDepthFirst = equalDepthFirst;
    instance.browserConfigList = browserConfigs.map((browserConfig) => ({
      id: browserConfig.id,
      itemName: browserConfig.meta.name,
    }));
    instance.politenessConfigList = politenessConfigs.map((politenessConfig) => ({
      id: politenessConfig.id,
      itemName: politenessConfig.meta.name
    }));
    instance.data = false;
    instance.updateForm();

    if (!this.allSelected) {
      instance.update.subscribe(
        (crawlConfigs) => this.onUpdateMultipleCrawlConfigs(crawlConfigs, labels));
      instance.delete.subscribe(() => this.onDeleteMultipleCrawlConfigs(this.selectedConfigs));
    }

    if (this.allSelected) {
      instance.update.subscribe((crawlConfigUpdate) => this.onUpdateAllCrawlConfigs(crawlConfigUpdate));
      instance.delete.subscribe(() => this.onDeleteAllCrawlConfigs());
    }
  }

  onPage(page: PageEvent) {
    this.page.next(page);
  }

  onSelectedChange(crawlConfigs: CrawlConfig[]) {
    this.selectedConfigs = crawlConfigs;
    if (!this.singleMode) {
      if (!this.allSelected) {
        this.loadComponent(
          this.mergeCrawlConfigs(crawlConfigs),
          this.browserConfigs, this.politenessConfigs, getInitialLabels(crawlConfigs, CrawlConfig),
          isExtractTextEqual(crawlConfigs), isCreateSnapshotEqual(crawlConfigs), isDepthFirstEqual(crawlConfigs));
      } else {
        const crawlConfig = new CrawlConfig();
        crawlConfig.id = '1234567';
        crawlConfig.meta.name = 'update';
        this.loadComponent(crawlConfig, this.browserConfigs, this.politenessConfigs,
          [], true, true, true);
      }
    } else {
      this.crawlConfig = crawlConfigs[0] || null;
      if (this.componentRef !== null) {
        this.componentRef.destroy();
      }
    }
  }

  onCreateCrawlConfig(): void {
    this.crawlConfig = new CrawlConfig();
  }

  onSelectCrawlConfig(crawlConfig: CrawlConfig) {
    this.router.navigate(['crawlconfig', crawlConfig.id]);
    this.crawlConfig = crawlConfig;
  }

  onSelectAll(allSelected: boolean) {
    this.allSelected = allSelected;
    if (allSelected) {
      this.onSelectedChange([new CrawlConfig(), new CrawlConfig()]);
    } else {
      this.onSelectedChange([]);
    }
  }

  onSaveCrawlConfig(crawlConfig: CrawlConfig) {
    this.crawlConfigService.create(crawlConfig)
      .subscribe(newCrawlConfig => {
        this.crawlConfig = newCrawlConfig;
        this.changes.next();
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdateCrawlConfig(crawlConfig: CrawlConfig) {
    this.crawlConfigService.update(crawlConfig)
      .subscribe(updatedCrawlConfig => {
        this.crawlConfig = updatedCrawlConfig;
        this.changes.next();
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onUpdateMultipleCrawlConfigs(crawlConfigUpdate: CrawlConfig, initialLabels: Label[]) {

    const numOfConfigs = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((crawlConfig) => {
        if (crawlConfig.meta.label === undefined) {
          crawlConfig.meta.label = [];
        }
        crawlConfig.meta.label = updatedLabels(crawlConfigUpdate.meta.label.concat(crawlConfig.meta.label));
        for (const label of initialLabels) {
          if (!findLabel(crawlConfigUpdate.meta.label, label.key, label.value)) {
            crawlConfig.meta.label.splice(
              crawlConfig.meta.label.findIndex(
                removedLabel => removedLabel.key === label.key && removedLabel.value === label.value),
              1);
          }
        }

        if (crawlConfigUpdate.extra.extract_text !== undefined) {
          crawlConfig.extra.extract_text = crawlConfigUpdate.extra.extract_text;
        }

        if (crawlConfigUpdate.extra.create_snapshot !== undefined) {
          crawlConfig.extra.create_snapshot = crawlConfigUpdate.extra.create_snapshot;
        }

        if (crawlConfigUpdate.depth_first !== undefined) {
          crawlConfig.depth_first = crawlConfigUpdate.depth_first;
        }

        if (!isNaN(crawlConfigUpdate.minimum_dns_ttl_s)) {
          crawlConfig.minimum_dns_ttl_s = crawlConfigUpdate.minimum_dns_ttl_s;
        }

        if (!isNaN(crawlConfigUpdate.priority_weight)) {
          crawlConfig.priority_weight = crawlConfigUpdate.priority_weight;
        }
        if (crawlConfigUpdate.politeness_id !== '') {
          crawlConfig.politeness_id = crawlConfigUpdate.politeness_id;
        }
        if (crawlConfigUpdate.browser_config_id !== '') {
          crawlConfig.browser_config_id = crawlConfigUpdate.browser_config_id;
        }
        return this.crawlConfigService.update(crawlConfig);
      }),
      catchError((err) => {
        console.log(err);
        return of('true');
      }),
    ).subscribe(() => {
      this.selectedConfigs = [];
      this.componentRef.destroy();
      this.crawlConfig = null;
      this.changes.next();
      this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner er oppdatert');
    });
  }

  onUpdateAllCrawlConfigs(crawlConfigUpdate: CrawlConfig) {
    console.log('skall oppdatere alle crawlconfigs i databasen med config: ', crawlConfigUpdate);
  }

  onDeleteCrawlConfig(crawlConfig: CrawlConfig) {
    this.crawlConfigService.delete(crawlConfig.id)
      .subscribe(() => {
        this.crawlConfig = null;
        this.changes.next();
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onDeleteMultipleCrawlConfigs(configs: CrawlConfig[]) {
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
            mergeMap((config) => this.crawlConfigService.delete(config.id)),
            catchError((err) => {
              console.log(err);
              return of('true');
            }),
          ).subscribe(() => {
            this.selectedConfigs = [];
            this.componentRef.destroy();
            this.crawlConfig = null;
            this.changes.next();
            this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner slettet');
          });
        } else {
          this.snackBarService.openSnackBar('Sletter ikke konfigurasjonene');
        }
      });
  }

  onDeleteAllCrawlConfigs() {
    console.log('Skal slette alle crawlconfigs i databasen');
  }

  mergeCrawlConfigs(configs: CrawlConfig[]) {
    const config = new CrawlConfig();
    const compareObj = configs[0];
    config.id = '1234567';
    config.meta.name = 'Multi';

    const equalBrowserConfig = configs.every(function (cfg) {
      return cfg.browser_config_id === compareObj.browser_config_id;
    });

    const equalPolitenessConfig = configs.every(function (cfg) {
      return cfg.politeness_id === compareObj.politeness_id;
    });

    const equalDnsTtl = configs.every(function (cfg) {
      return cfg.minimum_dns_ttl_s === compareObj.minimum_dns_ttl_s;
    });

    const equalPriorityWeight = configs.every(function (cfg) {
      return cfg.priority_weight === compareObj.priority_weight;
    });

    const equalExtractText = isExtractTextEqual(configs);

    const equalCreateSnapshot = isCreateSnapshotEqual(configs);

    const equalDepthFirst = isDepthFirstEqual(configs);

    if (equalBrowserConfig) {
      config.browser_config_id = compareObj.browser_config_id;
    } else {
      config.browser_config_id = '';
    }

    if (equalPolitenessConfig) {
      config.politeness_id = compareObj.politeness_id;
    } else {
      config.politeness_id = '';
    }

    if (equalDnsTtl) {
      config.minimum_dns_ttl_s = compareObj.minimum_dns_ttl_s;
    } else {
      config.minimum_dns_ttl_s = null;
    }

    if (equalPriorityWeight) {
      config.priority_weight = compareObj.priority_weight;
    } else {
      config.priority_weight = null;
    }

    if (equalExtractText) {
      config.extra.extract_text = compareObj.extra.extract_text;
    }

    if (equalCreateSnapshot) {
      config.extra.create_snapshot = compareObj.extra.create_snapshot;
    }
    if (equalDepthFirst) {
      config.depth_first = compareObj.depth_first;
    }

    const label = configs.reduce((acc: CrawlConfig, curr: CrawlConfig) => {
      config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
      return config;
    });
    return config;
  }
}


// Helper functions to check if a setting is the same for multiple crawlconfigs

function isExtractTextEqual(configs: CrawlConfig[]) {
  const compareObj = configs[0];
  const equalExtractText = configs.every(function (cfg) {
    return cfg.extra.extract_text === compareObj.extra.extract_text;
  });
  return equalExtractText;
}

function isCreateSnapshotEqual(configs: CrawlConfig[]) {
  const compareObj = configs[0];
  const equalCreateSnapshot = configs.every(function (cfg) {
    return cfg.extra.create_snapshot === compareObj.extra.create_snapshot;
  });
  return equalCreateSnapshot;
}

function isDepthFirstEqual(configs: CrawlConfig[]) {
  const compareObj = configs[0];
  const equalDepthFirst = configs.every(function (cfg) {
    return cfg.depth_first === compareObj.depth_first;
  });
  return equalDepthFirst;
}

