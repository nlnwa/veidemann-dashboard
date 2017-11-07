import {Injectable} from '@angular/core';
import {Item, ListDatabase} from '../commons/list/list-database';

@Injectable()
export class SearchDatabase extends ListDatabase {

  set items(items: Item[]) {
    if (items.length > 0) {
      this.dataSet.clear();
      // items can contain two or more of the same item with different type
      const value = items.reduce((acc, curr) => {
        if (this.dataSet.has(curr.id)) {
          const index = acc.findIndex((item) => item.id === curr.id);
          /* tslint:disable:no-bitwise */
          acc[index].type |= (<any>curr).type;
        } else {
          this.dataSet.add(curr.id);
          acc.push(curr);
        }
        return acc;
      }, []);
      this.dataChange.next(value);
    } else {
      this.dataChange.next(items);
    }
  }

  add(item: Item): void {
    if (this.dataSet.has(item.id)) {
      this.update(item);
    } else {
      const copy = this.items.slice();
      copy.push(item);
      this.items = copy;
    }
  }

  update(item: Item): void {
    const index = this.findIndex(item);
    /* tslint:disable:no-bitwise */
    (<any>this.items[index]).type &= (<any>item).type;
    this.items = this.items.slice();
  }

}
