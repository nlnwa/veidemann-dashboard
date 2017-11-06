import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';

export interface Item {
  id: string;
}

export interface Database {
  dataChange: BehaviorSubject<Item[]>;
  items: Item[];
  clear(): void;
  isEmpty(): boolean;
  add(item: Item): void;
  remove(item: Item): void;
  update(item: Item): void;
}

@Injectable()
export class ListDatabase implements Database {
  dataChange = new BehaviorSubject<Item[]>([]);
  dataSet = new Set();

  get items(): Item[] {
    return this.dataChange.value;
  }

  set items(items: Item[]) {
    this.dataSet = new Set(items.map((item) => item.id));
    this.dataChange.next(items);
  }

  clear(): void {
    this.dataSet.clear();
    this.items = [];
  }

  add(item: Item): void {
    if (this.dataSet.has(item.id)) {
      return;
    }
    const copy = this.items.slice();
    copy.push(item);
    this.items = copy;
  }

  update(item: Item) {
    if (!this.dataSet.has(item.id)) {
      return;
    }
    const index = this.items.findIndex((element) => element.id === item.id);
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
    const index = this.items.findIndex((element) => element.id === item.id);
    if (index > -1) {
      const copy = this.items.slice();
      copy.splice(index, 1);
      this.items = copy;
    }
  }

  isEmpty() {
    return this.dataSet.size < 1;
  }
}

