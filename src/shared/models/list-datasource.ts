import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';

import {ListItem} from '../../modules/commons/components/base-list/base-list';


export class ListDataSource<T extends ListItem> implements DataSource<T> {
  private readonly data: BehaviorSubject<T[]>;

  constructor() {
    this.data = new BehaviorSubject([]);
  }

  get length(): number {
    return this.data.value.length;
  }

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    return this.data;
  }

  disconnect(collectionViewer: CollectionViewer): void {
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
      this.data.next(this.data.value.concat(item));
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
