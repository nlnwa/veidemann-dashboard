import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {Role, RoleMapping} from '../../commons/models/config.model';
import {CrudService} from '../shared/crud.service';
import {environment} from '../../../environments/environment';


@Injectable()
export class RoleMappingService extends CrudService<RoleMapping> {

  protected readonly url: string = `${environment.apiGateway}/control/rolemappings`;

  constructor(protected http: HttpClient) {
    super(http);
  }

  getRoles(): Observable<string[]> {
    return of(Object.keys(Role));
  }

}
