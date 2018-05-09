import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ListDatabase} from './list-database';

@Injectable()
export class ListDataSource extends DataSource<any> {
  constructor(protected database: ListDatabase) {
    super();
  }

  connect(): Observable<any[]> {
    return this.database.dataChange.asObservable();
  }

  disconnect() {
    // no-op
  }
}
