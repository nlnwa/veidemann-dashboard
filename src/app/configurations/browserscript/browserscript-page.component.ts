import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ListDatabase, ListDataSource} from '../../commons/list/';
import {MatPaginator} from '@angular/material';
import {BrowserScriptListComponent} from './browserscript-list/browserscript-list.component';
import {BrowserScript} from '../../commons/models/config.model';
import {BrowserScriptService} from './browserscript.service';
import {SnackBarService} from 'app/commons/snack-bar/snack-bar.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-search',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span class="toolbar--title">Browserscript</span>
          <button mat-mini-fab (click)="onCreateBrowserScript()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-browserscript-list (rowClick)="onSelectBrowserScript($event)"></app-browserscript-list>
        <mat-paginator [length]="pageLength"
                       [pageIndex]="pageIndex"
                       [pageSize]="pageSize"
                       [pageSizeOptions]="pageOptions">
        </mat-paginator>
      </div>
      <app-browserscript-details [browserScript]="browserScript"
                                 *ngIf="browserScript"
                                 (update)="onUpdateBrowserScript($event)"
                                 (save)="onSaveBrowserScript($event)"
                                 (delete)="onDeleteBrowserScript($event)">
      </app-browserscript-details>
    </div>
  `,
  styleUrls: [],
  providers: [ListDataSource, ListDatabase],
})

export class BrowserScriptPageComponent implements AfterViewInit {
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(BrowserScriptListComponent) list: BrowserScriptListComponent

  browserScript: BrowserScript;
  changes: Subject<void> = new Subject<void>();

  constructor(private browserScriptService: BrowserScriptService,
              private snackBarService: SnackBarService,
              private database: ListDatabase) {
  }

  ngAfterViewInit() {
    // When paginator has changes or on save/update/delete
    // we reload data for the list
    Observable.merge(this.paginator.page, this.changes)
      .startWith(null)
      .switchMap(() => {
        return this.browserScriptService.search({
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
  }

  onCreateBrowserScript(): void {
    this.browserScript = new BrowserScript();
  }

  onSelectBrowserScript(browserScript: BrowserScript) {
    this.browserScript = browserScript;
  }

  onSaveBrowserScript(browserScript: BrowserScript) {
    this.browserScriptService.create(browserScript)
      .subscribe(newBrowserScript => {
        this.browserScript = newBrowserScript;
        this.changes.next();
        this.snackBarService.openSnackBar('Lagret');
      });
  }

  onUpdateBrowserScript(browserScript: BrowserScript) {
    this.browserScriptService.update(browserScript)
      .subscribe(updatedBrowserScript => {
        this.browserScript = updatedBrowserScript;
        this.changes.next();
        this.snackBarService.openSnackBar('Oppdatert');
      });
  }

  onDeleteBrowserScript(browserScript: BrowserScript) {
    this.browserScriptService.delete(browserScript.id)
      .subscribe(response => {
        this.browserScript = response;
        this.changes.next();
        this.snackBarService.openSnackBar('Slettet');
      });
  }
}
