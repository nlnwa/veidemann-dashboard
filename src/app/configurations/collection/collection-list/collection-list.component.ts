import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseListComponent} from '../../../commons/list';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: [
    '../../../commons/list/selection-base-list/selection-base-list.css',
    './collection-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CollectionListComponent extends BaseListComponent {
  displayedColumns = ['name', 'description'];
}

