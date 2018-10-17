import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {combineLatest, from, Subject} from 'rxjs';
import {catchError, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {BrowserConfig, CrawlHostGroupConfig, IpRange, Label} from '../../commons/models/config.model';
import {CrawlHostGroupConfigService} from './crawlhostgroupconfig.service';
import {of} from 'rxjs/internal/observable/of';
import {DetailDirective} from '../shared/detail.directive';
import {CrawlHostGroupConfigDetailsComponent} from './crawlhostgroupconfig-details/crawlhostgroupconfig-details.component';
import {RoleService} from '../../auth';
import {FormBuilder} from '@angular/forms';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';
import {getInitialLabels, updatedLabels, findLabel, intersectLabel} from '../../commons/group-update/labels/common-labels';

@Component({
  selector: 'app-crawlhostgroupconfig',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>

        <app-toolbar>
          <span class="toolbar--title">Crawlhostgroup</span>
          <button mat-mini-fab (click)="onCreateCrawlHostGroupConfig()"
                  [disabled]="!singleMode ? true : false"
                  [matTooltip]="!singleMode ? 'Kan ikke opprette en ny konfigurasjon når flere er valgt.':'Legg til en ny konfigurasjon.'">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-selection-base-list
          (rowClick)="onSelectCrawlHostGroupConfig($event)"
          [data]="data$ | async"
          (selectedChange)="onSelectedChange($event)"
          (selectAll)="onSelectAll($event)"
          (page)="onPage($event)">
        </app-selection-base-list>
      </div>
      <app-crawlhostgroupconfig-details *ngIf="crawlHostGroupConfig && singleMode"
                                        [crawlHostGroupConfig]="crawlHostGroupConfig"
                                        (update)="onUpdateCrawlHostGroupConfig($event)"
                                        (save)="onSaveCrawlHostGroupConfig($event)"
                                        (delete)="onDeleteCrawlHostGroupConfig($event)">
      </app-crawlhostgroupconfig-details>
      <ng-template detail-host></ng-template>
    </div>
  `,
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CrawlHostGroupConfigPageComponent implements OnInit {
  selectedConfigs = [];
  componentRef = null;

  crawlHostGroupConfig: CrawlHostGroupConfig;
  changes: Subject<void> = new Subject<void>();
  page: Subject<PageEvent> = new Subject<PageEvent>();
  data = new Subject<any>();
  data$ = this.data.asObservable();
  allSelected = false;

  @ViewChild(DetailDirective) detailHost: DetailDirective;

  constructor(private crawlHostGroupConfigService: CrawlHostGroupConfigService,
              private snackBarService: SnackBarService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private fb: FormBuilder,
              private roleService: RoleService,
              private dialog: MatDialog) {
  }

  get singleMode(): boolean {
    return this.selectedConfigs.length < 2;
  }

  ngOnInit() {

    combineLatest(this.page, this.changes.pipe(startWith(null))).pipe(
      switchMap(([pageEvent]) => {
        return this.crawlHostGroupConfigService.search({
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
  }

  loadComponent(config: CrawlHostGroupConfig, labels: Label[], ipRanges: IpRange[]) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CrawlHostGroupConfigDetailsComponent);
    const viewContainerRef = this.detailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as CrawlHostGroupConfigDetailsComponent;
    instance.crawlHostGroupConfig = config;
    instance.data = false;
    instance.updateForm();

    if (!this.allSelected) {
      instance.update.subscribe(
        (crawlHostGroupConfig) => this.onUpdateMultipleCrawlHostGroupConfigs(crawlHostGroupConfig, labels, ipRanges));
      instance.delete.subscribe(
        () => this.onDeleteMultipleCrawlHostGroupConfigs(this.selectedConfigs));
    }

    if (this.allSelected) {
      instance.update.subscribe(
        (crawlHostGroupConfigUpdate) => this.onUpdateAllCrawlHostGroupConfigs(crawlHostGroupConfigUpdate));
      instance.delete.subscribe(() => this.onDeleteAllCrawlHostGroupConfigs());
    }
  }

  onPage(page: PageEvent) {
    this.page.next(page);
  }

  onCreateCrawlHostGroupConfig(): void {
    this.crawlHostGroupConfig = new CrawlHostGroupConfig();
  }

  onSelectCrawlHostGroupConfig(crawlHostGroupConfig: CrawlHostGroupConfig) {
    this.crawlHostGroupConfig = crawlHostGroupConfig;
  }

  onSelectAll(allSelected: boolean) {
    this.allSelected = allSelected;
    if (allSelected) {
      this.onSelectedChange([new CrawlHostGroupConfig(), new CrawlHostGroupConfig()]);
    } else {
      this.onSelectedChange([]);
      this.componentRef.destroy();
    }
  }

  onSelectedChange(crawlHostGroupConfigs: CrawlHostGroupConfig[]) {
    this.selectedConfigs = crawlHostGroupConfigs;
    if (!this.singleMode) {
      if (!this.allSelected) {
        this.loadComponent(this.mergeCrawlHostGroupConfigs(crawlHostGroupConfigs),
          getInitialLabels(crawlHostGroupConfigs, CrawlHostGroupConfig), getInitialIpRanges(crawlHostGroupConfigs));
      } else {
        const crawlHostGroupConfig = new CrawlHostGroupConfig();
        crawlHostGroupConfig.id = '1234567';
        crawlHostGroupConfig.meta.name = 'update';
        this.loadComponent(crawlHostGroupConfig, [], []);
      }

    } else {
      this.crawlHostGroupConfig = crawlHostGroupConfigs[0];
      if (this.componentRef !== null) {
        this.componentRef.destroy();
      }
      if (this.crawlHostGroupConfig === undefined) {
        this.crawlHostGroupConfig = null;
      }
    }
  }

  onSaveCrawlHostGroupConfig(crawlHostGroupConfig: CrawlHostGroupConfig) {
    this.crawlHostGroupConfigService.create(crawlHostGroupConfig)
      .subscribe(newCrawlHostGroupConfig => {
        this.crawlHostGroupConfig = newCrawlHostGroupConfig;
        this.changes.next();
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdateCrawlHostGroupConfig(crawlHostGroupConfig: CrawlHostGroupConfig) {
    this.crawlHostGroupConfigService.update(crawlHostGroupConfig)
      .subscribe(updatedCrawlHostGroupConfig => {
        this.crawlHostGroupConfig = updatedCrawlHostGroupConfig;
        this.changes.next();
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onUpdateMultipleCrawlHostGroupConfigs(crawlHostGroupConfigUpdate: CrawlHostGroupConfig,
                                        initialLabels: Label[],
                                        initialIpRanges: IpRange[]) {
    const numOfConfigs = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((crawlHostGroupConfig) => {
        if (crawlHostGroupConfig.meta.label === undefined || null) {
          crawlHostGroupConfig.meta.label = [];
        }
        crawlHostGroupConfig.meta.label = updatedLabels(crawlHostGroupConfigUpdate.meta.label
          .concat(crawlHostGroupConfig.meta.label));
        for (const label of initialLabels) {
          if (!findLabel(crawlHostGroupConfigUpdate.meta.label, label.key, label.value)) {
            crawlHostGroupConfig.meta.label.splice(
              crawlHostGroupConfig.meta.label.findIndex(
                removedLabel => removedLabel.key === label.key && removedLabel.value === label.value),
              1);
          }
        }
        if (crawlHostGroupConfig.ip_range === undefined || null) {
          crawlHostGroupConfig.ip_range = [];
        }
        crawlHostGroupConfig.ip_range = updatedRange(
          crawlHostGroupConfigUpdate.ip_range.concat(crawlHostGroupConfig.ip_range));
        for (const range of initialIpRanges) {
          if (!findIpRange(crawlHostGroupConfigUpdate.ip_range, range.ip_from, range.ip_to)) {
            crawlHostGroupConfig.ip_range.splice(
              crawlHostGroupConfig.ip_range.findIndex(
                removedIpRange => removedIpRange.ip_from === range.ip_from && removedIpRange.ip_to === range.ip_to), 1);
          }
        }
        crawlHostGroupConfig.meta.label = updatedLabels(
          crawlHostGroupConfigUpdate.meta.label.concat(crawlHostGroupConfig.meta.label));
        crawlHostGroupConfig.ip_range = updatedRange(
          crawlHostGroupConfigUpdate.ip_range.concat(crawlHostGroupConfig.ip_range));


        return this.crawlHostGroupConfigService.update(crawlHostGroupConfig);
      }),
      catchError((err) => {
        console.log(err);
        return of('true');
      }),
    ).subscribe(() => {
      this.selectedConfigs = [];
      this.componentRef.destroy();
      this.crawlHostGroupConfig = null;
      this.changes.next();
      this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner er oppdatert');
    });
  }

  onUpdateAllCrawlHostGroupConfigs(crawlHostGroupConfigUpdate: CrawlHostGroupConfig) {
    console.log('skal oppdatere alle crawlhostgroupconfigs i databasen med: ', crawlHostGroupConfigUpdate);
  }

  onDeleteCrawlHostGroupConfig(crawlHostGroupConfig: CrawlHostGroupConfig) {
    this.crawlHostGroupConfigService.delete(crawlHostGroupConfig.id)
      .subscribe(() => {
        this.crawlHostGroupConfig = null;
        this.changes.next();
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onDeleteMultipleCrawlHostGroupConfigs(crawlHostGroupConfigs: CrawlHostGroupConfig[]) {
    const numOfConfigs = crawlHostGroupConfigs.length.toString();
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
          from(crawlHostGroupConfigs).pipe(
            mergeMap((config) => this.crawlHostGroupConfigService.delete(config.id)),
            catchError((err) => {
              console.log(err);
              return of('true');
            }),
          ).subscribe(() => {
            this.selectedConfigs = [];
            this.componentRef.destroy();
            this.crawlHostGroupConfig = null;
            this.changes.next();
            this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner slettet');
          });
        } else {
          this.snackBarService.openSnackBar('Sletter ikke konfigurasjonene');
        }
      });
  }

  onDeleteAllCrawlHostGroupConfigs() {
    console.log('skal slette alle crawlhostgroupconfigs fra databasen ');
  }

  mergeCrawlHostGroupConfigs(crawlHostGroupConfigs: CrawlHostGroupConfig[]) {
    const config = new CrawlHostGroupConfig();
    config.id = '1234567';
    config.meta.name = 'Multi';

    const label = crawlHostGroupConfigs.reduce((acc: CrawlHostGroupConfig, curr: CrawlHostGroupConfig) => {
      config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
      config.ip_range = intersectIpRange(acc.ip_range, curr.ip_range);
      return config;
    });
    return config;
  }
}

function getInitialIpRanges(configs: CrawlHostGroupConfig[]) {
  const config = new CrawlHostGroupConfig();
  const ipRange = configs.reduce((acc: CrawlHostGroupConfig, curr: CrawlHostGroupConfig) => {
    config.ip_range = intersectIpRange(acc.ip_range, curr.ip_range);
    return config;
  });
  return config.ip_range;
}

function findIpRange(array: IpRange[], ip_from, ip_to) {
  const ipRangeExist = array.find((function (iprange) {
    return iprange.ip_from === ip_from && iprange.ip_to === ip_to;
  }));
  return ipRangeExist;
}

function intersectIpRange(a: IpRange[], b: IpRange[]): IpRange[] {
  const setA = Array.from(new Set(a));
  const setB = Array.from(new Set(b));
  const intersection = new Set(setA.filter((x: IpRange) =>
    setB.find((range: IpRange) => x.ip_from === range.ip_from && x.ip_to === range.ip_to) !== undefined
  ));
  return Array.from(intersection) as IpRange[];
}

function updatedRange(iprange) {
  const result = iprange.reduce((unique, o) => {
    if (!unique.find(obj => obj.ip_from === o.ip_from && obj.ip_to === o.ip_to)) {
      unique.push(o);
    }
    return unique;
  }, []);
  return result;
}
