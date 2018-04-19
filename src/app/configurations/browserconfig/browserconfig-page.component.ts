import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ListDatabase, ListDataSource} from '../../commons/list/';
import {MatPaginator} from '@angular/material';
import {BrowserConfigListComponent} from './browserconfig-list/browserconfig-list.component';
import {BrowserConfig, BrowserScript} from '../../commons/models/config.model';
import {BrowserConfigService} from './browserconfig.service';
import {BrowserScriptService} from '../browserscript/browserscript.service';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Browserconfigs</span>
          <button mat-mini-fab (click)="onCreateBrowserConfig()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-browserconfig-list (rowClick)="onSelectBrowserConfig($event)"></app-browserconfig-list>
        <mat-paginator [length]="pageLength"
                       [pageIndex]="pageIndex"
                       [pageSize]="pageSize"
                       [pageSizeOptions]="pageOptions"></mat-paginator>
      </div>
      <app-browserconfig-details [browserConfig]="browserConfig"
                                 [browserScripts]="browserScripts"
                                 *ngIf="browserConfig && browserScripts"
                                 (update)="onUpdateBrowserConfig($event)"
                                 (save)="onSaveBrowserConfig($event)"
                                 (delete)="onDeleteBrowserConfig($event)"></app-browserconfig-details>
    </div>
  `,
  styleUrls: [],
  providers: [ListDataSource, ListDatabase],
})

export class BrowserConfigPageComponent implements OnInit, AfterViewInit {
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(BrowserConfigListComponent) list: BrowserConfigListComponent;

  browserConfig: BrowserConfig;
  browserScripts: BrowserScript[];
  changes: Subject<void> = new Subject<void>();

  constructor(private browserConfigService: BrowserConfigService,
              private browserScriptService: BrowserScriptService,
              private snackBarService: SnackBarService,
              private database: ListDatabase,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    // Load prerequisites for app-browserconfig-detail
    this.browserScriptService.list()
      .map(reply => reply.value)
      .subscribe(browserScripts => {
        this.browserScripts = browserScripts;
      });

  }

  ngAfterViewInit() {
    // When paginator has changes or on save/update/delete
    // we reload data for the list
    Observable.merge(this.paginator.page, this.changes)
      .startWith(null)
      .switchMap(() => {
        return this.browserConfigService.search({
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
      });
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.browserConfigService.get(id)
        .subscribe(browserConfig => {
          this.browserConfig = browserConfig
        });
    }
  }

  onCreateBrowserConfig(): void {
    this.browserConfig = new BrowserConfig();
  }

  onSelectBrowserConfig(browserConfig: BrowserConfig) {
    this.browserConfig = browserConfig;
  }

  onSaveBrowserConfig(browserConfig: BrowserConfig) {
    this.browserConfigService.create(browserConfig)
      .subscribe(newBrowserConfig => {
        this.browserConfig = newBrowserConfig;
        this.changes.next();
        this.snackBarService.openSnackBar('Lagret');
      });
    this.changes.next();
  };

  onUpdateBrowserConfig(browserConfig: BrowserConfig) {
    this.browserConfigService.update(browserConfig)
      .subscribe(updatedBrowserConfig => {
        this.browserConfig = updatedBrowserConfig;
        this.changes.next();
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onDeleteBrowserConfig(browserConfig: BrowserConfig) {
    this.browserConfigService.delete(browserConfig.id)
      .subscribe((response) => {
        this.browserConfig = null;
        this.changes.next();
        this.snackBarService.openSnackBar('Slettet');
      });
  }
}
