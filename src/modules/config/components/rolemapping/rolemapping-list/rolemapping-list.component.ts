import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ConfigObject, Role} from '../../../../../shared/models';
import {BaseListComponent} from '../../../../commons/components/base-list/base-list';


@Component({
  selector: 'app-rolemapping-list',
  templateUrl: './rolemapping-list.component.html',
  styleUrls: ['../../../../commons/components/base-list/base-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RoleMappingListComponent extends BaseListComponent<ConfigObject> {
  displayedColumns = ['select', 'email', 'group', 'role'];

  constructor() {
    super();
  }

  getRoles(roles: Role[]): string[] {
    return roles.map(role => Role[role]);
  }
}
