import {ChangeDetectionStrategy, Component, forwardRef, Input} from '@angular/core';
import {BaseListComponent} from '../../../commons/components/base-list/base-list';
import {CrawlLog} from '../../../../shared/models/report';
import {ListDataSource} from '../../../../shared/models';
import {BASE_LIST} from '../../../../shared/directives';

@Component({
  selector: 'app-crawl-log-list',
  templateUrl: './crawl-log-list.component.html',
  styleUrls: ['./crawl-log-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ListDataSource,
    {
      provide: BASE_LIST,
      useExisting: forwardRef(() => CrawlLogListComponent)
    }
  ]
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
