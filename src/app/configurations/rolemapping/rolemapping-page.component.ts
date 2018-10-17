import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {RoleMapping} from '../../commons/models/config.model';
import {merge, Subject} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {ListDatabase, ListDataSource} from '../../commons/list';
import {RoleMappingListComponent} from './rolemapping-list/rolemapping-list.component';
import {RoleMappingService} from './rolemapping.service';

@Component({
  selector: 'app-rolemapping',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span i18n="@@rolemappingListHeader" class="toolbar--title">Brukerhåndtering</span>
          <button mat-mini-fab (click)="onCreateRoleMapping()">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-rolemapping-list (rowClick)="onSelectRoleMapping($event)"></app-rolemapping-list>
        <mat-paginator [length]="pageLength"
                       [pageIndex]="pageIndex"
                       [pageSize]="pageSize"
                       [pageSizeOptions]="pageOptions"></mat-paginator>
      </div>
      <app-rolemapping-details [roleMapping]="roleMapping"
                               [roles]="roles"
                               *ngIf="(roleMapping && roles)"
                               (update)="onUpdateRoleMapping($event)"
                               (save)="onSaveRoleMapping($event)"
                               (delete)="onDeleteRoleMapping($event)"></app-rolemapping-details>
    </div>
  `,
  styleUrls: [],
  providers: [ListDataSource, ListDatabase],
})
export class RoleMappingPageComponent implements OnInit, AfterViewInit {
  pageLength = 0;
  pageSize = 5;
  pageIndex = 0;
  pageOptions = [5, 10];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(RoleMappingListComponent) list: RoleMappingListComponent;

  roleMapping: RoleMapping;
  roles: string[] = [];
  changes: Subject<void> = new Subject<void>();

  constructor(private roleMappingService: RoleMappingService,
              private snackBarService: SnackBarService,
              private database: ListDatabase) {

  }

  ngOnInit() {
    this.roleMappingService.getRoles()
      .subscribe(roles => this.roles = roles);
  }

  ngAfterViewInit() {
    // When paginator has changes or on save/update/delete
    // we reload data for the list
    merge(this.paginator.page, this.changes).pipe(
      startWith(null),
      switchMap(() => {
        return this.roleMappingService.search({
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

  onCreateRoleMapping(): void {
    this.roleMapping = new RoleMapping();
  }

  onSelectRoleMapping(roleMapping: RoleMapping) {
    this.roleMapping = roleMapping;
  }

  onSaveRoleMapping(roleMapping: RoleMapping) {
    this.roleMappingService.create(roleMapping)
      .subscribe(newRoleMapping => {
        this.roleMapping = newRoleMapping;
        this.snackBarService.openSnackBar('Lagret');
        this.changes.next();
      });
  }

  onUpdateRoleMapping(roleMapping: RoleMapping) {
    this.roleMappingService.update(roleMapping)
      .subscribe(updatedRoleMapping => {
        this.roleMapping = updatedRoleMapping;
        this.snackBarService.openSnackBar('Oppdatert');
      });
    this.changes.next();
  }

  onDeleteRoleMapping(roleMapping: RoleMapping) {
    this.roleMappingService.delete(roleMapping.id)
      .subscribe((response) => {
        this.roleMapping = null;
        this.snackBarService.openSnackBar('Slettet');
      });
    this.changes.next();
  }
}

