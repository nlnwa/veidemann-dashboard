import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseListComponent} from '../../../commons/list';

@Component({
  selector: 'app-rolemapping-list',
  templateUrl: './rolemapping-list.component.html',
  styleUrls: [
    '../../../commons/list/selection-base-list/selection-base-list.css',
    './rolemapping-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RoleMappingListComponent extends BaseListComponent {


  @Input()
    set count (count: number) {
    this.pageLength = count;
  }

  displayedColumns = ['select', 'email', 'group', 'role'];
}

