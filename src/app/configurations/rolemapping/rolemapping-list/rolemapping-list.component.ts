import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SelectionBaseListComponent} from '../../../commons/list';
import {RoleMapping} from '../../../commons/models/config.model';


@Component({
  selector: 'app-rolemapping-list',
  templateUrl: './rolemapping-list.component.html',
  styleUrls: [
    '../../../commons/list/selection-base-list/selection-base-list.css',
    './rolemapping-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleMappingListComponent extends SelectionBaseListComponent<RoleMapping> {
  displayedColumns = ['select', 'email', 'group', 'role'];
}

