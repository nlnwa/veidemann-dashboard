import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';

export interface BaseList<T> {
  dataSource: DataSource<T>;
  length: number;

  reset(): void;
}

export interface ListItem {
  id: string;
}

@Injectable()
export class ListDataSource<T extends ListItem> implements DataSource<T> {
  private readonly data: BehaviorSubject<T[]>;

  constructor() {
    this.data = new BehaviorSubject([]);
  }

  private _capacity;

  get capacity(): number {
    return this._capacity;
  }

  set capacity(length: number) {
    this._capacity = length;
  }

  get length(): number {
    return this.data.value.length;
  }

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    return this.data;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.clear();
  }

  /**
   * Add item to internal data store
   *
   * If item with same id already exists it gets replaced.
   */
  add(item: T) {
    if (!item) {
      return;
    }
    const found = this.data.value.find(c => c.id === item.id);
    if (found) {
      this.replace(item);
    } else {
      if (this.capacity && this.data.value.length === this.capacity) {
        this.data.next([item, ...this.data.value.slice(0, -1)]);
      } else {
        this.data.next(this.data.value.concat(item));
      }
    }
  }

  /**
   * Replace an item in the internal store
   */
  private replace(item: T) {
    const index = this.data.value.findIndex(c => c.id === item.id);
    if (index !== -1) {
      this.data.value[index] = item;
      this.data.next(this.data.value);
    }
  }

  /**
   * Remove an item from the internal store
   */
  remove(item: T) {
    const index = this.data.value.findIndex(c => c.id === item.id);
    if (index !== -1) {
      this.data.value.splice(index, 1);
      this.data.next(this.data.value);
    }
  }

  clear() {
    this.data.next([]);
  }
}
