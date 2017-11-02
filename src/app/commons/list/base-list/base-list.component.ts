import {ChangeDetectorRef, EventEmitter, Output} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Item} from '../list-database';

export abstract class BaseListComponent {

  @Output()
  protected rowClick = new EventEmitter<Item | Item[]>();
  protected dataSource: DataSource<any>;
  protected multiSelect = false;
  protected selectedItems: Set<Item> = new Set();
  protected displayedColumns = ['id', 'name', 'description'];

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

  protected isSelected(item: Item) {
    return this.selectedItems.has(item);
  }

  protected trackById(index: number, item: Item) {
    return item.id;
  }
}
