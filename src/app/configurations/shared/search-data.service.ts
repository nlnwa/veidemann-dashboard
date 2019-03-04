import {Injectable} from '@angular/core';
import {ConfigObject} from '../../commons/models';
import {DataService} from './data.service';
import {BackendService} from './backend.service';

@Injectable()
export class SearchDataService extends DataService {

  constructor(protected backendService: BackendService) {
    super(backendService);
  }

  add(configObject: ConfigObject) {
    if (this.data.some(c => c.id === configObject.id)) {
      const found = this.data.find(c => c.id === configObject.id);
      // tslint:disable:no-bitwise
      (<any>found).type |= (<any>configObject).type;
      super.update(found);
    } else {
      // TODO
      // super.add(configObject);
    }
  }
}
