import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BaseListComponent} from '../../../commons/list/base-list/base-list.component';
import {ListDataSource} from 'app/commons/list';

@Component({
  selector: 'app-browserscript-list',
  templateUrl: './browserscript-list.component.html',
  styleUrls: [
    '../../../commons/list/base-list/base-list.component.css',
    './browserscript-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowserScriptListComponent extends BaseListComponent {
  constructor(public dataSource: ListDataSource,
              protected changeDetectorRef: ChangeDetectorRef) {
    super(dataSource, changeDetectorRef);
    this.displayedColumns = ['name', 'description'];
  }
}

