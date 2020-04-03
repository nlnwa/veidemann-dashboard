import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BaseListComponent} from '../../../commons/components/base-list/base-list';
import {CrawlLog} from '../../../../shared/models/report';

@Component({
  selector: 'app-crawl-log-list',
  templateUrl: './crawl-log-list.component.html',
  styleUrls: ['../../../commons/components/base-list/base-list.scss','./crawl-log-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrawlLogListComponent extends BaseListComponent<CrawlLog> {

  @Input()
  multiSelect = false;

  @Input()
  sortActive = 'timestamp';

  displayedColumns: string[] = ['requestedUri', 'timestamp', 'statusCode',  'discoveryPath', 'contentType', 'extra', 'action'];

  constructor() {
    super();
  }

}
