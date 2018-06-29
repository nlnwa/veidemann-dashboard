import {ChangeDetectionStrategy, Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {combineLatest, from, Subject} from 'rxjs';
import {catchError, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {CrawlHostGroupConfig, IpRange, Label} from '../../commons/models/config.model';
import {CrawlHostGroupConfigService} from './crawlhostgroupconfig.service';
import {of} from 'rxjs/internal/observable/of';
import {DetailDirective} from '../shared/detail.directive';
import {CrawlHostGroupConfigDetailsComponent} from './crawlhostgroupconfig-details/crawlhostgroupconfig-details.component';
import {RoleService} from '../../auth';
import {FormBuilder} from '@angular/forms';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-crawlhostgroupconfig',
  template: `
    <app-search-config [term]="term"
                       (submit)="onSearch($event)"></app-search-config>
    <div fxLayout="column" fxLayoutGap="8px">
      <div>

        <app-toolbar>
          <span class="toolbar--title">Crawlhostgroup</span>
          <button mat-mini-fab (click)="onCreateCrawlHostGroupConfig()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-crawlhostgroupconfig-list
          (rowClick)="onSelectCrawlHostGroupConfig($event)"
          [data]="data$ | async"
          (selectedChange)="onSelectedChange($event)"
          (labelClicked)="onLabelClick($event)"
          (page)="onPage($event)"
        >
        </app-crawlhostgroupconfig-list>
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
  term = '';
  componentRef = null;

  crawlHostGroupConfig: CrawlHostGroupConfig;
  changes: Subject<void> = new Subject<void>();
  page: Subject<PageEvent> = new Subject<PageEvent>();
  data = new Subject<any>();
  data$ = this.data.asObservable();

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

  loadComponent(config: CrawlHostGroupConfig) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CrawlHostGroupConfigDetailsComponent);
    const viewContainerRef = this.detailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as CrawlHostGroupConfigDetailsComponent;
    instance.crawlHostGroupConfig = config;
    instance.data = false;
    instance.updateForm();
    instance.update.subscribe((crawlHostGroupConfig) => this.onSaveMultipleCrawlHostGroupConfigs(crawlHostGroupConfig));
    instance.delete.subscribe((configs) => this.onDeleteMultipleCrawlHostGroupConfigs(this.selectedConfigs));
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
    console.log('in pagecomp: ', labelQuery);
    // this.crawlHostGroupConfigService.search(labelQuery)
  }

  onCreateCrawlHostGroupConfig(): void {
    this.crawlHostGroupConfig = new CrawlHostGroupConfig();
  }

  onSelectCrawlHostGroupConfig(crawlHostGroupConfig: CrawlHostGroupConfig) {
    this.crawlHostGroupConfig = crawlHostGroupConfig;
  }


  onSelectedChange(configs: CrawlHostGroupConfig[]) {
    this.loadComponent(this.mergeCrawlHostGroupConfigs(configs));
    this.selectedConfigs = configs;
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

  onDeleteCrawlHostGroupConfig(crawlHostGroupConfig: CrawlHostGroupConfig) {
    this.crawlHostGroupConfigService.delete(crawlHostGroupConfig.id)
      .subscribe((response) => {
        this.crawlHostGroupConfig = null;
        this.changes.next();
        this.snackBarService.openSnackBar('Slettet');
      });
  }

  onDeleteMultipleCrawlHostGroupConfigs(configs: CrawlHostGroupConfig[]) {
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
            mergeMap((config) => this.crawlHostGroupConfigService.delete(config.id)),
            catchError((err) => {
              console.log(err);
              return of('true');
            }),
          ).subscribe((response) => {
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

  onSaveMultipleCrawlHostGroupConfigs(crawlHostGroupConfigUpdate: CrawlHostGroupConfig) {
    const numOfConfigs = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((crawlHostGroupConfig) => {
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
    ).subscribe((response) => {
      this.selectedConfigs = [];
      this.componentRef.destroy();
      this.crawlHostGroupConfig = null;
      this.changes.next();
      this.snackBarService.openSnackBar(numOfConfigs, ' konfigurasjoner er oppdatert');
    });
  }

  mergeCrawlHostGroupConfigs(configs: CrawlHostGroupConfig[]) {
    const config = new CrawlHostGroupConfig();
    config.id = '1234567';
    config.meta.name = 'Multi';

    const label = configs.reduce((acc: CrawlHostGroupConfig, curr: CrawlHostGroupConfig) => {
      config.meta.label = intersectLabel(acc.meta.label, curr.meta.label);
      config.ip_range = intersectIpRange(acc.ip_range, curr.ip_range);
      return config;
    });

    const ip_range = configs.reduce((acc: CrawlHostGroupConfig, curr: CrawlHostGroupConfig) => {
      config.ip_range = intersectIpRange(acc.ip_range, curr.ip_range);
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

function intersectIpRange(a: IpRange[], b: IpRange[]): IpRange[] {
  const setA = Array.from(new Set(a));
  const setB = Array.from(new Set(b));
  const intersection = new Set(setA.filter((x: IpRange) =>
    setB.find((range: IpRange) => x.ip_from === range.ip_from && x.ip_to === range.ip_to) === undefined
      ? false
      : true
  ));
  return Array.from(intersection) as IpRange[];
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

function updatedRange(iprange) {
  const result = iprange.reduce((unique, o) => {
    if (!unique.find(obj => obj.ip_from === o.ip_from && obj.ip_to === o.ip_to)) {
      unique.push(o);
    }
    return unique;
  }, []);
  return result;
}
