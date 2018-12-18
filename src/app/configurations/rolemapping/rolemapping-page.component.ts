import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, PageEvent} from '@angular/material';
import {RoleMapping} from '../../commons/models/config.model';
import {combineLatest, from, of, Subject} from 'rxjs';
import {catchError, map, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {SnackBarService} from '../../commons/snack-bar/snack-bar.service';
import {RoleMappingService} from './rolemapping.service';
import {DetailDirective} from '../shared/detail.directive';
import {RoleMappingDetailsComponent} from './rolemapping-details/rolemapping-details.component';
import {FormBuilder} from '@angular/forms';
import {DeleteDialogComponent} from '../../dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-rolemapping',
  template: `
    <div fxLayout="column" fxLayoutGap="8px">
      <div>
        <app-toolbar>
          <span i18n="@@rolemappingListHeader" class="toolbar--title">Brukerhåndtering</span>
          <button mat-mini-fab (click)="onCreateRoleMapping()"
                  [disabled]="!singleMode ? true : false"
                  [matTooltip]="!singleMode ? 'Kan ikke opprette en ny bruker når flere er valgt.' : 'Legg til en ny bruker'">
            <mat-icon>add</mat-icon>
          </button>
        </app-toolbar>
        <app-rolemapping-list (rowClick)="onSelectRoleMapping($event)"
                              [data]="data$ | async"
                              (page)="onPage($event)"
                              (selectedChange)="onSelectedChange($event)"
                              (selectAll)="onSelectAll($event)"
                              (page)="onPage($event)">
        </app-rolemapping-list>
      </div>
      <app-rolemapping-details [roleMapping]="roleMapping"
                               [roles]="roles"
                               *ngIf="roleMapping && roles && singleMode"
                               (update)="onUpdateRoleMapping($event)"
                               (save)="onSaveRoleMapping($event)"
                               (delete)="onDeleteRoleMapping($event)">
      </app-rolemapping-details>
      <ng-template detail-host></ng-template>
    </div>
  `,
  styleUrls: [],
})
export class RoleMappingPageComponent implements OnInit {

  changes: Subject<void> = new Subject<void>();
  page: Subject<PageEvent> = new Subject<PageEvent>();

  roleMapping: RoleMapping;
  roles: string[];

  data = new Subject<any>();
  data$ = this.data.asObservable();
  selectedConfigs = [];
  componentRef = null;
  allSelected = false;

  @ViewChild(DetailDirective) detailHost: DetailDirective;

  constructor(private roleMappingService: RoleMappingService,
              private snackBarService: SnackBarService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private fb: FormBuilder,
              private dialog: MatDialog) {

  }

  ngOnInit() {
    this.roleMappingService.getRoles().pipe(map(reply => reply))
      .subscribe(roles => this.roles = roles);

    combineLatest(this.page, this.changes.pipe(startWith(null))).pipe(
      switchMap(([pageEvent]) => {
        return this.roleMappingService.search({
          page_size: pageEvent.pageSize,
          page: pageEvent.pageIndex
        });
      }),
    ).subscribe((reply) => {
      this.data.next({
        value: reply.value,
        pageLength: parseInt(reply.count, 10),
        pageSize: reply.page_size || 0,
        pageIndex: reply.page || 0
      });
    });
  }

  get singleMode(): boolean {
    return this.selectedConfigs.length < 2;
  }

  loadComponent(roleMapping: RoleMapping, roles: string[]) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(RoleMappingDetailsComponent);
    const viewContainerRef = this.detailHost.viewContainerRef;
    viewContainerRef.clear();
    this.componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = this.componentRef.instance as RoleMappingDetailsComponent;
    instance.roleMapping = roleMapping;
    instance.rolesList = roles;
    instance.form.get('email').clearValidators();
    instance.form.get('group').clearValidators();
    instance.form.get('role').clearValidators();
    instance.data = false;
    instance.updateForm();

    if (!this.allSelected) {
      instance.update.subscribe((roleMappings) => this.onUpdateMultipleRoleMappings(roleMappings));
      instance.delete.subscribe(() => this.onDeleteMultipleRoleMappings(this.selectedConfigs));
    }

    if (this.allSelected) {
      instance.update.subscribe((roleMappingUpdate) => this.onUpdateAllRoleMappings(roleMappingUpdate));
      instance.delete.subscribe(() => this.onDeleteAllRoleMappings());
    }
  }


  onPage(page: PageEvent) {
    this.page.next(page);
  }

  onCreateRoleMapping(): void {
    this.roleMapping = new RoleMapping();
  }

  onSelectRoleMapping(roleMapping: RoleMapping) {
    this.roleMapping = roleMapping;
  }

  onSelectedChange(roleMappings: RoleMapping[]) {
    this.selectedConfigs = roleMappings;
    if (!this.singleMode) {
      if (!this.allSelected) {
        this.loadComponent(this.mergeRoleMappings(roleMappings), this.roles);
      } else {
        const roleMapping = new RoleMapping();
        roleMapping.id = '1234567';
        this.loadComponent(roleMapping, this.roles);
      }
    } else {
      this.roleMapping = roleMappings[0] || null;
      if (this.componentRef !== null) {
        this.componentRef.destroy();
      }
    }
  }

  onSelectAll(allSelected: boolean) {
    this.allSelected = allSelected;
    if (allSelected) {
      this.onSelectedChange([new RoleMapping(), new RoleMapping()]);
    } else {
      this.onSelectedChange([]);
    }
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

  onUpdateMultipleRoleMappings(roleMappingUpdate: RoleMapping) {
    const numberOfUsers = this.selectedConfigs.length.toString();
    from(this.selectedConfigs).pipe(
      mergeMap((roleMapping: RoleMapping) => {
        if (roleMappingUpdate.group !== '') {
          roleMapping.group = roleMappingUpdate.group;
        }
        if (roleMappingUpdate.email !== '') {
          roleMapping.email = roleMappingUpdate.email;
        }
        if (roleMappingUpdate.role.length !== 0) {
          roleMapping.role = roleMappingUpdate.role;
        }
        return this.roleMappingService.update(roleMapping);
      }),
      catchError((err) => {
        console.log(err);
        return of('true');
      }),
    ).subscribe(() => {
      this.selectedConfigs = [];
      this.componentRef.destroy();
      this.roleMapping = null;
      this.changes.next();
      this.snackBarService.openSnackBar(numberOfUsers, ' brukere er blitt oppdatert');
    });
  }

  onDeleteMultipleRoleMappings(roleMappings: RoleMapping[]) {
    const numberOfUsers = this.selectedConfigs.length.toString();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      numberOfConfigs: numberOfUsers
    };
    const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
          from(roleMappings).pipe(
            mergeMap((user) => this.roleMappingService.delete(user.id)),
            catchError((err) => {
              return of('true');
            }),
          ).subscribe(() => {
            this.selectedConfigs = [];
            this.componentRef.destroy();
            this.roleMapping = null;
            this.changes.next();
            this.snackBarService.openSnackBar(numberOfUsers, ' brukere slettet');
          });
        } else {
          this.snackBarService.openSnackBar('Sletter ikke brukerene');
        }
      });
  }

  onUpdateAllRoleMappings(roleMappingUpdate: RoleMapping) {
    console.log('Skal oppdatere alle tilgjengelige rolemappings');
  }

  onDeleteAllRoleMappings() {
    console.log('Skal slette alle tilgjengelige rolemappings');
  }


  mergeRoleMappings(roleMappings: RoleMapping[]): RoleMapping {
    const mapping = new RoleMapping();
    const compareObj = roleMappings[0];
    const commonRoles = commonRole(roleMappings);
    const equalTypes = equalType(roleMappings);

    // Please validators
    mapping.id = '1234567';

    const equalEmail = roleMappings.every(function (user) {
      return user.email === compareObj.email;
    });

    const equalGroup = roleMappings.every(function (user) {
      return user.group === compareObj.group;
    });

    const rolesToRemove = [];
    for (const commonrole of commonRoles) {
      for (const roleMapping of roleMappings) {
        if (!roleMapping.role.includes(commonrole)) {
          rolesToRemove.push(commonrole);
        }
      }
    }
    for (const remove of rolesToRemove) {
      commonRoles.splice(commonRoles.indexOf(remove), 1);
    }
    mapping.role = commonRoles;

    if (equalTypes.eqType) {
      if (equalTypes.type === 1) { // All selected users is of type 'email'
        mapping.group = undefined;
        if (equalEmail) {
          mapping.email = compareObj.email;
        } else {
          mapping.email = '';
        }
      }

      if (equalTypes.type === 2) { // All selected users is of type 'group'
        mapping.email = undefined;
        if (equalGroup) {
          mapping.group = compareObj.group;
        } else {
          mapping.group = '';
        }
      }
    } else { // Selected users is not of the same type
      mapping.email = undefined;
      mapping.group = undefined;
    }
    return mapping;
  }
}

function commonRole(roleMappings: RoleMapping[]) {
  const allRoles = [];
  for (const roleMapping of roleMappings) {
    if (roleMapping.role !== undefined) {
      for (const role of roleMapping.role) {
        allRoles.push(role);
      }
    }
    const unique = (roles) => roles.filter((v, i) => allRoles.indexOf(v) === i);
    return unique(allRoles);
  }
}

function equalType(roleMappings: RoleMapping[]) {
  const compareObj = roleMappings[0];

  if (compareObj.hasOwnProperty('email')) {
    const allTypeEmail = roleMappings.every(function (user) {
      return user.email != null;
    });
    return {eqType: allTypeEmail, type: 1};
  } else {
    const allTypeGroup = roleMappings.every(function (user) {
      return user.group != null;
    });
    return {eqType: allTypeGroup, type: 2};
  }
}

