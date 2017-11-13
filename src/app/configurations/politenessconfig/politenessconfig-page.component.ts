import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {PolitenessConfig} from '../../commons/models/config.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import {Subject} from 'rxjs/Subject';
import {SnackBarService} from '../../snack-bar-service/snack-bar.service';
import {ListDatabase, ListDataSource} from '../../commons/list/';
import {PolitenessConfigListComponent} from './politenessconfig-list/politenessconfig-list.component';
import {PolitenessConfigService} from './politenessconfig.service';

@Component({
  selector: 'app-search',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span i18n="@@politenessconfigListHeader" class="toolbar--title">Politeness</span>
          <button mat-mini-fab (click)="onCreatePolitenessConfig()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-politenessconfig-list (rowClick)="onSelectPolitenessConfig($event)"></app-politenessconfig-list>
        <mat-paginator [length]="pageLength"
                       [pageIndex]="pageIndex"
                       [pageSize]="pageSize"
                       [pageSizeOptions]="pageOptions"></mat-paginator>
      </div>
      <app-politenessconfig-details [politenessConfig]="politenessConfig"
                                    [robotsPolicies]="robotsPolicies"
                                    *ngIf="politenessConfig && robotsPolicies"
                                    (update)="onUpdatePolitenessConfig($event)"
                                    (save)="onSavePolitenessConfig($event)"
                                    (delete)="onDeletePolitenessConfig($event)"></app-politenessconfig-details>
    </div>
  `,
  styleUrls: [],
  providers: [ListDataSource, ListDatabase],
})
export class PolitenessConfigPageComponent implements OnInit, AfterViewInit {
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(PolitenessConfigListComponent) list: PolitenessConfigListComponent;

  politenessConfig: PolitenessConfig;
  robotsPolicies = [];
  changes: Subject<void> = new Subject<void>();

  constructor(private politenessConfigService: PolitenessConfigService,
              private snackBarService: SnackBarService,
              private database: ListDatabase) {

  }

  ngOnInit() {
    this.politenessConfigService.getRobotsConfig()
      .subscribe(robotsPolicies => this.robotsPolicies = robotsPolicies);
  }

  ngAfterViewInit() {
    // When paginator has changes or on save/update/delete
    // we reload data for the list
    Observable.merge(this.paginator.page, this.changes)
      .startWith(null)
      .switchMap(() => {
        return this.politenessConfigService.search({
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

  onCreatePolitenessConfig(): void {
    this.politenessConfig = new PolitenessConfig('OBEY_ROBOTS');
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

  onDeletePolitenessConfig(politenessConfig: PolitenessConfig) {
    this.politenessConfigService.delete(politenessConfig.id)
      .subscribe((response) => {
        this.politenessConfig = response;
        this.snackBarService.openSnackBar('Slettet');
      });
    this.changes.next();
  }
}

