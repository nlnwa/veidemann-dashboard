import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SelectionBaseListComponent} from '../../../commons/list/selection-base-list';
import {BrowserScript} from '../../../commons/models/config.model';

@Component({
  selector: 'app-browserscript-list',
  templateUrl: './browserscript-list.component.html',
  styleUrls: [
    '../../../commons/list/base-list/base-list.component.css',
    './browserscript-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BrowserScriptListComponent extends SelectionBaseListComponent<BrowserScript> {
  displayedColumns = ['select', 'name', 'description', 'label'];

  constructor() {
    super();
  }
}


