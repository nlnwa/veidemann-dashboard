import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';

export interface ListMeta {
  name: string;
  description: string;
}

export interface ListItem {
  id: string;
  meta: ListMeta;
}

export interface Database {
  dataChange: BehaviorSubject<ListItem[]>;
  data: ListItem[];

  reset();

  add(item: ListItem);
}

@Injectable()
export class ListDatabase implements Database {
  dataChange: BehaviorSubject<ListItem[]> = new BehaviorSubject<ListItem[]>([]);

  constructor() {
  }

  get data(): ListItem[] {
    return this.dataChange.value;
  }

  set data(items) {
    this.dataChange.next(items);
  }

  reset() {
    this.data = [];
  }

  add(item: ListItem) {
    const copy = this.data.slice();
    copy.push(item);
    this.data = copy;
  }
}

@Injectable()
export class ListDataSource extends DataSource<ListItem> {
  dataSet = new Set();

  constructor(private database: ListDatabase) {
    super();
  }

  set data(items) {
    this.database.data = items;
  }

  add(item: ListItem) {
    if (this.dataSet.has(item.id)) {
      return;
    }
    this.dataSet.add(item.id);
    this.database.add(item);
  }

  reset() {
    this.dataSet.clear();
    this.database.reset();
  }

  isEmpty() {
    return this.dataSet.size < 1;
  }

  connect(): Observable<ListItem[]> {
    return this.database.dataChange;
  }

  disconnect() {
    // no-op
  }
}
