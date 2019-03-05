import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseListComponent} from '../../../commons/list';

@Component({
  selector: 'app-rolemapping-list',
  templateUrl: './rolemapping-list.component.html',
  styleUrls: [
    '../../../commons/list/base-list/base-list.css',
    './rolemapping-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RoleMappingListComponent extends BaseListComponent {
  displayedColumns = ['select', 'email', 'group', 'role'];
}
