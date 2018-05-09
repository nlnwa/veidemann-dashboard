import {ChangeDetectorRef, EventEmitter, Output} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Item} from '../database';

export abstract class BaseListComponent {
  displayedColumns = ['id', 'name', 'description'];
  @Output()
  protected rowClick = new EventEmitter<Item | Item[]>();
  protected multiSelect = false;
  protected selectedItems: Set<Item> = new Set();

  constructor(public dataSource: DataSource<any>,
              protected changeDetectorRef: ChangeDetectorRef) {
  }

  onRowClick(item: Item) {
    if (this.multiSelect) {
      if (this.selectedItems.has(item)) {
        this.selectedItems.delete(item);
      } else {
        this.selectedItems.add(item);
      }
      this.rowClick.emit(Array.from(this.selectedItems));
    } else {
      this.selectedItems.clear();
      this.selectedItems.add(item);
      this.rowClick.emit(item);
    }
  }

  clearSelection(): void {
    this.selectedItems.clear();
    this.changeDetectorRef.detectChanges();
  }

  trackById(index: number, item: Item) {
    return item.id;
  }

  isSelected(item: Item) {
    return this.selectedItems.has(item);
  }
}
