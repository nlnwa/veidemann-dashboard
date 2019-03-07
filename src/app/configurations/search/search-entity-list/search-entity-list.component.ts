import {ChangeDetectionStrategy, Component, Optional} from '@angular/core';
import {BaseListComponent} from '../../../commons/list';
import {isEntityName, isEntityLabel, isSeedName, isSeedLabel, SearchDataService} from '../../shared/search-data.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-entity-list.component.html',
  styleUrls: [
    '../../../commons/list/base-list/base-list.css',
    './search-entity-list.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchListComponent extends BaseListComponent {
  isEntityName = isEntityName;
  isEntityLabel = isEntityLabel;
  isSeedName = isSeedName;
  isSeedLabel = isSeedLabel;

  displayedColumns = ['select', 'name', 'description', 'entityName', 'entityLabel', 'seedName', 'seedLabel'];

  constructor(protected dataService: SearchDataService) {
    super(dataService);
  }
}
