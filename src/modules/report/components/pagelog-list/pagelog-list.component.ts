import {Component, Input} from '@angular/core';
import {BaseListComponent} from '../../../commons/components/base-list/base-list';
import {PageLog} from '../../../../shared/models/report';

@Component({
  selector: 'app-pagelog-list',
  templateUrl: './pagelog-list.component.html',
  styleUrls: ['../../../commons/components/base-list/base-list.scss', './pagelog-list.component.css']
})
export class PageLogListComponent extends BaseListComponent<PageLog> {

  @Input()
  multiSelect = false;

  displayedColumns: string[] = ['uri', 'nrOfResources', 'nrOfOutlinks', 'extra', 'action'];
}
