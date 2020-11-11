import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import {ConfigObject, Role} from '../../../../../shared/models';
import {BaseListComponent} from '../../../../commons/components/base-list/base-list';
import {BASE_LIST} from '../../../../../shared/directives';


@Component({
  selector: 'app-rolemapping-list',
  templateUrl: './rolemapping-list.component.html',
  styleUrls: ['../../../../commons/components/base-list/base-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: BASE_LIST,
      useExisting: forwardRef(() => RoleMappingListComponent)
    }
  ]
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
