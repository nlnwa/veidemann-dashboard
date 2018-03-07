import {Injectable} from '@angular/core';
import {Item, ListDatabase} from '../../commons/list';
import {MatPaginator} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {empty} from 'rxjs/observable/empty';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/startWith';
import {Subscription} from 'rxjs/Subscription';

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

  get data(): Item[] { return this._data.value; }

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
    const pageChange = this.pager ? this.pager.page : empty();

    if (this.changeSubscription) {
      this.changeSubscription.unsubscribe();
    }

    this.changeSubscription = this._data
      .combineLatest(pageChange.startWith(null), (data, page) => data)
      .map((data) => this.pageData(data))
      .subscribe((data) => this.dataChange.next(data));
  }

  private pageData(data: Item[]): Item[] {
    if (!this.pager) { return data; }
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.slice().splice(startIndex, this.paginator.pageSize);
  }

}
