import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PolitenessConfig} from '../../../commons/models/config.model';
import {SelectionBaseListComponent} from '../../../commons/list/selection-base-list';


@Component({
  selector: 'app-politenessconfig-list',
  templateUrl: './politenessconfig-list.component.html',
  styleUrls: [
    '../../../commons/list/base-list/base-list.component.css',
    './politenessconfig-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PolitenessConfigListComponent extends SelectionBaseListComponent<PolitenessConfig> {
  displayedColumns = ['select', 'name', 'description', 'label'];

  constructor() {
    super();
  }
}
