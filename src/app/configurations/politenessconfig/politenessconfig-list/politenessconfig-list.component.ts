import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BaseListComponent} from '../../../commons/list/base-list/base-list.component';
import {ListDataSource} from '../../../commons/list/list-datasource';


@Component({
  selector: 'app-politenessconfig-list',
  templateUrl: './politenessconfig-list.component.html',
  styleUrls: [
    '../../../commons/list/base-list/base-list.component.css',
    './politenessconfig-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolitenessConfigListComponent extends BaseListComponent {
  constructor(public dataSource: ListDataSource,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(dataSource, changeDetectorRef);
    this.displayedColumns = ['name', 'description'];
  }
}

