import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {Database} from './list-database';

export class ListDataSource extends DataSource<any> {
  constructor(private database: Database) {
    super();
  }

  connect(): Observable<any[]> {
    return this.database.dataChange;
  }

  disconnect() {
    // no-op
  }
}
