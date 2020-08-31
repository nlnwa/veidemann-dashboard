import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseListComponent} from '../../../commons/components/base-list/base-list';
import {PageLog} from '../../../../shared/models';

@Component({
  selector: 'app-pagelog-list',
  templateUrl: './page-log-list.component.html',
  styleUrls: ['../../../commons/components/base-list/base-list.scss', './page-log-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLogListComponent extends BaseListComponent<PageLog> {

  @Input()
  multiSelect = false;

  displayedColumns: string[] = ['uri', 'nrOfResources', 'nrOfOutlinks', 'extra', 'action'];

  constructor() {
    super();
  }
}
