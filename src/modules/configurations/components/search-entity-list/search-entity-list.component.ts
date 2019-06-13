import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {BaseListComponent} from '../../../commons/components';
import {isEntityLabel, isEntityName, isSeedLabel, isSeedName, SearchDataService} from '../../services/data/search-data.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-entity-list.component.html',
  styleUrls: [
    '../../../commons/components/base-list/base-list.scss',
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

  constructor(protected cdr: ChangeDetectorRef,
              private searchDataService: SearchDataService) {
    super(cdr, searchDataService);
  }
}
