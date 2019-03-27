import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseListComponent} from '../../../../commons/components';
import {Role} from '../../../../commons/models/configs/rolemapping.model';

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

  getRoles(_roles: Role[]): string[] {
    return _roles.map(role => Role[role]);
  }
}
