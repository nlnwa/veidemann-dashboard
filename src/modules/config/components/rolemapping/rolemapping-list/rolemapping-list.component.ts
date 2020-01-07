import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ConfigObject, Role} from '../../../../commons/models';
import {BaseListComponent} from '../../base-list/base-list';


@Component({
  selector: 'app-rolemapping-list',
  templateUrl: './rolemapping-list.component.html',
  styleUrls: ['../../base-list/base-list.scss',],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RoleMappingListComponent extends BaseListComponent<ConfigObject> {
  displayedColumns = ['select', 'email', 'group', 'role'];

  getRoles(roles: Role[]): string[] {
    return roles.map(role => Role[role]);
  }
}
