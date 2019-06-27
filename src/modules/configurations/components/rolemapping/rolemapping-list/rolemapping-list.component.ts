import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseListComponent} from '../../../../commons/components';
import {Role} from '../../../../commons/models';

@Component({
  selector: 'app-rolemapping-list',
  templateUrl: './rolemapping-list.component.html',
  styleUrls: [
    '../../../../commons/components/base-list/base-list.scss',
    './rolemapping-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RoleMappingListComponent extends BaseListComponent {
  displayedColumns = ['select', 'email', 'group', 'role'];

  getRoles(roles: Role[]): string[] {
    return roles.map(role => Role[role]);
  }
}
