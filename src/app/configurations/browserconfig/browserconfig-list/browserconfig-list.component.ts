import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SelectionBaseListComponent} from '../../../commons/list/selection-base-list';
import {BrowserConfig} from '../../../commons/models/config.model';

@Component({
  selector: 'app-browserconfig-list',
  templateUrl: './browserconfig-list.component.html',
  styleUrls: [
    '../../../commons/list/base-list/base-list.component.css',
    './browserconfig-list.component.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BrowserConfigListComponent extends SelectionBaseListComponent<BrowserConfig> {
  displayedColumns = ['select', 'name', 'description', 'label'];

  constructor() {
    super();
  }
}
