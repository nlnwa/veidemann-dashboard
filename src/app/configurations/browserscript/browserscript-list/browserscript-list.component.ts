import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BaseListComponent} from '../../../commons/list/base-list/base-list.component';
import {ListDataSource} from 'app/commons/list';
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
// export class BrowserScriptListComponent extends BaseListComponent {
//   constructor(public dataSource: ListDataSource,
//               protected changeDetectorRef: ChangeDetectorRef) {
// this.displayedColumns = ['select', 'name', 'description', 'label'];
//     super(dataSource, changeDetectorRef);
export class BrowserScriptListComponent extends SelectionBaseListComponent<BrowserScript> {
  displayedColumns = ['select', 'name', 'description', 'label'];

  constructor() {
    super();
  }
}


