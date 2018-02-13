import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Role, RoleMapping} from '../../commons/models/config.model';
import {CrudService} from '../shared/crud.service';
import {environment} from '../../../environments/environment';


@Injectable()
export class RoleMappingService extends CrudService<RoleMapping> {

  static readonly URL: string = `${environment.apiGateway}/rolemappings`;

  constructor(protected http: HttpClient) {
    super(http, RoleMappingService.URL);
  }

  getRoles(): Observable<string[]> {
    return Observable.of(Object.keys(Role));
  }

}
