import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Database, Item} from './database';

@Injectable()
export class ListDatabase implements Database {
  dataChange = new BehaviorSubject<Item[]>([]);
  dataSet = new Set();

  get items(): Item[] {
    return this.dataChange.value;
  }

  set items(items: Item[]) {
    this.dataSet = new Set(items);
    this.dataChange.next(items);
  }

  clear(): void {
    this.dataSet.clear();
    this.items = [];
  }

  add(item: Item): void {
    if (this.dataSet.has(item.id)) {
      return;
    } else {
      const copy = this.items.slice();
      copy.push(item);
      this.items = copy;
    }
  }

  get(itemId): any {
    const index = this.items.findIndex((element) => element.id === itemId);
    return index > -1 ? this.items[index] : null;
  }

  update(item: Item) {
    if (!this.dataSet.has(item.id)) {
      return;
    }
    const index = this.findIndex(item);
    if (index > -1) {
      const copy = this.items;
      copy[index] = item;
      this.items = copy;
    }
  }

  remove(item: Item) {
    if (!this.dataSet.has(item.id)) {
      return;
    }
    const index = this.findIndex(item);
    if (index > -1) {
      const copy = this.items.slice();
      copy.splice(index, 1);
      this.items = copy;
    }
  }

  isEmpty() {
    return this.dataSet.size < 1;
  }

  protected findIndex(item: Item) {
    return this.items.findIndex((element) => element.id === item.id);
  }
}

