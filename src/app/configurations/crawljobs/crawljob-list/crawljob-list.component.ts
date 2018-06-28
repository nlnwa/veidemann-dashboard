import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SelectionBaseListComponent} from '../../../commons/list/selection-base-list';
import {CrawlJob} from '../../../commons/models/config.model';


@Component({
  selector: 'app-crawljob-list',
  templateUrl: './crawljob-list.component.html',
  styleUrls: [
    '../../../commons/list/base-list/base-list.component.css',
    './crawljob-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CrawlJobListComponent extends SelectionBaseListComponent<CrawlJob> {
  displayedColumns = ['select', 'name', 'description', 'label'];

  constructor() {
    super();
  }
}
