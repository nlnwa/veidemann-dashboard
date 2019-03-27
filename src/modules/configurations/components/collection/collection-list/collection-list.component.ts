import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseListComponent} from '../../../../commons/components';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: [
    '../../../../commons/components/base-list/base-list.scss',
    './collection-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CollectionListComponent extends BaseListComponent {
  displayedColumns = ['name', 'description'];
}

