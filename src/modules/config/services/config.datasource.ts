import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {ConfigObject} from '../../commons/models/config';
import {BehaviorSubject, Observable} from 'rxjs';


export class ConfigObjectDataSource implements DataSource<ConfigObject> {
  private readonly data: BehaviorSubject<ConfigObject[]>;

  constructor() {
    this.data = new BehaviorSubject([]);
  }

  connect(collectionViewer: CollectionViewer): Observable<ConfigObject[] | ReadonlyArray<ConfigObject>> {
    return this.data;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  /**
   * Add configObject to internal data store
   *
   * If configObject with same id already exists it gets replaced.
   */
  add(configObject: ConfigObject) {
    const found = this.data.value.find(c => c.id === configObject.id);
    if (found) {
      this.replace(configObject);
    } else {
      this.data.next(this.data.value.concat(configObject));
    }
  }

  /**
   * Replace a configObject in the internal store
   */
  replace(configObject: ConfigObject) {
    const index = this.data.value.findIndex(c => c.id === configObject.id);
    if (index !== -1) {
      this.data.value[index] = configObject;
      this.data.next(this.data.value);
    }
  }

  /**
   * Remove a configObject from the internal store
   */
  remove(configObject: ConfigObject) {
    const index = this.data.value.findIndex(c => c.id === configObject.id);
    if (index !== -1) {
      this.data.value.splice(index, 1);
      this.data.next(this.data.value);
    }
  }

  clear() {
    this.data.next([]);
  }
}
