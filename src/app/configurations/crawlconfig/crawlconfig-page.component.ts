import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {BrowserConfig, CrawlConfig, PolitenessConfig} from '../../commons/models/config.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import {Subject} from 'rxjs/Subject';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {CrawlConfigService} from './crawlconfig.service';
import {ListDatabase, ListDataSource} from '../../commons/list/';
import {BrowserConfigService} from '../browserconfig/browserconfig.service';
import {PolitenessConfigService} from '../politenessconfig/politenessconfig.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CrawlConfigListComponent} from './crawlconfig-list/crawlconfig-list.component';

@Component({
  selector: 'app-crawlconfig',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Crawlconfigs</span>
          <button mat-mini-fab (click)="onCreateCrawlConfig()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-crawlconfig-list (rowClick)="onSelectCrawlConfig($event)"></app-crawlconfig-list>
        <mat-paginator [length]="pageLength"
                       [pageIndex]="pageIndex"
                       [pageSize]="pageSize"
                       [pageSizeOptions]="pageOptions"></mat-paginator>
      </div>
      <app-crawlconfig-details [crawlConfig]="crawlConfig"
                               [browserConfigs]="browserConfigs"
                               [politenessConfigs]="politenessConfigs"
                               *ngIf="crawlConfig"
                               (update)="onUpdateCrawlConfig($event)"
                               (save)="onSaveCrawlConfig($event)"
                               (delete)="onDeleteCrawlConfig($event)"></app-crawlconfig-details>
    </div>
  `,
  styleUrls: [],
  providers: [ListDataSource, ListDatabase],
})
export class CrawlConfigPageComponent implements OnInit, AfterViewInit {
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(CrawlConfigListComponent) list: CrawlConfigListComponent;

  crawlConfig: CrawlConfig;
  browserConfigs: BrowserConfig[];
  politenessConfigs: PolitenessConfig[];
  changes: Subject<void> = new Subject<void>();

  constructor(private crawlConfigService: CrawlConfigService,
              private politenessConfigService: PolitenessConfigService,
              private browserConfigService: BrowserConfigService,
              private snackBarService: SnackBarService,
              private database: ListDatabase,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.browserConfigService.list()
      .map(reply => reply.value)
      .subscribe((browserConfigs) => this.browserConfigs = browserConfigs);

    this.politenessConfigService.list()
      .map(reply => reply.value)
      .subscribe((politenessConfigs) => {
        this.politenessConfigs = politenessConfigs;
      });
  }

  ngAfterViewInit() {
    // When paginator has changes or on save/update/delete
    // we reload data for the list
    Observable.merge(this.paginator.page, this.changes)
      .startWith(null)
      .switchMap(() => {
        return this.crawlConfigService.search({
          page_size: this.paginator.pageSize,
          page: this.paginator.pageIndex
        });
      })
      .map((reply) => {
        this.pageLength = parseInt(reply.count, 10);
        this.pageSize = reply.page_size;
        this.pageIndex = reply.page;
        return reply.value;
      })
      .subscribe((items) => {
        this.database.items = items;

        const id = this.route.snapshot.paramMap.get('id');
        if (!id && items.length > 0) {
          this.list.onRowClick(items[0]);
        } else if (id) {
          this.crawlConfig = this.database.get(id);
        }
      });
  }

  onCreateCrawlConfig(): void {
    this.crawlConfig = new CrawlConfig();
  }

  onSelectCrawlConfig(crawlConfig: CrawlConfig) {
    this.router.navigate(['crawlconfig', crawlConfig.id]);
    this.crawlConfig = crawlConfig;
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

  onDeleteCrawlConfig(crawlConfig: CrawlConfig) {
    this.crawlConfigService.delete(crawlConfig.id)
      .subscribe((response) => {
        this.crawlConfig = null;
        this.changes.next();
        this.snackBarService.openSnackBar('Slettet');
      });
  }
}
