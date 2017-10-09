import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ListDatabase, ListDataSource, ListItem} from '../commons/database.service';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.css'],
  providers: [ListDataSource, ListDatabase],
})
export class BaseListComponent {
  @Output()
  onRowClick = new EventEmitter<ListItem>();

  @Input()
  set items(items: ListItem[]) {
    this.dataSource.data = items;
  }

  selectedRowIndex = '';

  constructor(readonly dataSource: ListDataSource) {}

  trackById = (index: number, item: ListItem) => item.id;

  isEmpty = () => this.dataSource.isEmpty();

  addItem(item: ListItem) {
    this.dataSource.add(item);
  }

  reset() {
    this.selectedRowIndex = '';
    this.dataSource.reset();
  }

  handleRowClick(row: ListItem) {
    this.selectedRowIndex = row.id;
    this.onRowClick.emit(row);
  }
}
