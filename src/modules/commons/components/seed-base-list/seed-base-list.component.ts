import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Optional, ViewChild} from '@angular/core';
import {BaseListComponent} from '..';
import {DataService} from '../../../configurations/services/data';
import {MatSort} from '@angular/material';
import {ConfigObject} from '../../models';
import {_isNumberValue} from '@angular/cdk/coercion';

@Component({
  selector: 'app-seed-base-list',
  templateUrl: './seed-base-list.component.html',
  styleUrls: ['./seed-base-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedBaseListComponent extends BaseListComponent implements AfterViewInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(protected cdr: ChangeDetectorRef,
              @Optional() dataSource: DataService) {
    super(cdr, dataSource);
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.dataSource.filterPredicate = (data: ConfigObject, filter: string) => {
      // Transform the data into a lowercase string of all property values.
      const accumulator = (currentTerm, key) => currentTerm + data.meta[key];

      // filter on name
      const dataStr = ['name'].reduce(accumulator, '').toLowerCase();

      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();

      return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.dataSource.sortingDataAccessor = (data: ConfigObject, sortHeaderId: string): string | number => {
      const value: any = data.meta[sortHeaderId];
      return _isNumberValue(value) ? Number(value) : value;
    };

    this.dataSource.sort = this.sort;
  }

  onFilterData(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
