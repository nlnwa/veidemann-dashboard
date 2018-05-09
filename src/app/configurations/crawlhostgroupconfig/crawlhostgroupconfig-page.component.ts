import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ListDatabase, ListDataSource} from '../../commons/list/';
import {MatPaginator} from '@angular/material';
import {merge, Subject} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';


import {CrawlHostGroupConfigListComponent} from './crawlhostgroupconfig-list/crawlhostgroupconfig-list.component';
import {CrawlHostGroupConfig} from '../../commons/models/config.model';
import {CrawlHostGroupConfigService} from './crawlhostgroupconfig.service';

@Component({
  selector: 'app-crawlhostgroupconfig',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Crawlhostgroup</span>
          <button mat-mini-fab (click)="onCreateCrawlHostGroupConfig()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-crawlhostgroupconfig-list
          (rowClick)="onSelectCrawlHostGroupConfig($event)"></app-crawlhostgroupconfig-list>
        <mat-paginator [length]="pageLength"
                       [pageIndex]="pageIndex"
                       [pageSize]="pageSize"
                       [pageSizeOptions]="pageOptions">
        </mat-paginator>
      </div>
      <app-crawlhostgroupconfig-details [crawlHostGroupConfig]="crawlHostGroupConfig"
                                        *ngIf="crawlHostGroupConfig"
                                        (update)="onUpdateCrawlHostGroupConfig($event)"
                                        (save)="onSaveCrawlHostGroupConfig($event)"
                                        (delete)="onDeleteCrawlHostGroupConfig($event)">
      </app-crawlhostgroupconfig-details>
    </div>
  `,
  styleUrls: [],
  providers: [ListDataSource, ListDatabase],
})

export class CrawlHostGroupConfigPageComponent implements AfterViewInit {
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(CrawlHostGroupConfigListComponent) list: CrawlHostGroupConfigListComponent;

  crawlHostGroupConfig: CrawlHostGroupConfig;
  changes: Subject<void> = new Subject<void>();

  constructor(private crawlHostGroupConfigService: CrawlHostGroupConfigService,
              private snackBarService: SnackBarService,
              private database: ListDatabase) {

  }

  ngAfterViewInit() {
    merge(this.paginator.page, this.changes).pipe(
      startWith(null),
      switchMap(() => {
        return this.crawlHostGroupConfigService.search({
          page_size: this.paginator.pageSize,
          page: this.paginator.pageIndex
        });
      }),
      map((reply) => {
        this.pageLength = parseInt(reply.count, 10);
        this.pageSize = reply.page_size;
        this.pageIndex = reply.page;
        return reply.value;
      })
    )
      .subscribe((items) => {
        this.database.items = items;
      });
  }

  onCreateCrawlHostGroupConfig(): void {
    this.crawlHostGroupConfig = new CrawlHostGroupConfig();
  }

  onSelectCrawlHostGroupConfig(crawlHostGroupConfig: CrawlHostGroupConfig) {
    this.crawlHostGroupConfig = crawlHostGroupConfig;
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

}
