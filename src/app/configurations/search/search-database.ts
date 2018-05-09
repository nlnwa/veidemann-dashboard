import {Injectable} from '@angular/core';
import {Item, ListDatabase} from '../../commons/list';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject, combineLatest, merge, of, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class SearchDatabase extends ListDatabase {
  private pager: MatPaginator;
  private changeSubscription: Subscription;
  private _data: BehaviorSubject<Item[]>;

  constructor() {
    super();
    this._data = new BehaviorSubject<Item[]>([]);
    this.updateChangeSubscription();
  }

  get paginator(): MatPaginator {
    return this.pager;
  }

  set paginator(paginator: MatPaginator) {
    this.pager = paginator;
    this.updateChangeSubscription();
  }

  get data(): Item[] {
    return this._data.value;
  }

  set data(items: Item[]) {
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
      this._data.next(value);
    } else {
      this._data.next(items);
    }
  }

  private updateChangeSubscription() {
    const pageChange = this.pager ? merge(this.pager.page, this.pager.initialized) : of(null);

    if (this.changeSubscription) {
      console.log('unsubscribe');
      this.changeSubscription.unsubscribe();
    }

    // this.changeSubscription =
    combineLatest(this._data, pageChange)
      .pipe(map(([data]) => this.pageData(data)))
      .subscribe((data) => this.dataChange.next(data));
  }

  private pageData(data: Item[]): Item[] {
    if (!this.pager) {
      return data;
    }
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.slice().splice(startIndex, this.paginator.pageSize);
  }

}
