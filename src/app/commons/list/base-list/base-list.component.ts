import {ChangeDetectorRef, EventEmitter, Output} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Item} from '../list-database';

export abstract class BaseListComponent {

  public dataSource: DataSource<any>;
  public displayedColumns = ['id', 'name', 'description'];
  @Output()
  protected rowClick = new EventEmitter<Item | Item[]>();
  protected multiSelect = false;
  protected selectedItems: Set<Item> = new Set();

  constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  public onRowClick(item: Item) {
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

  public clearSelection(): void {
    this.selectedItems.clear();
    this.changeDetectorRef.detectChanges()
  }

  public trackById(index: number, item: Item) {
    return item.id;
  }

  public isSelected(item: Item) {
    return this.selectedItems.has(item);
  }
}
