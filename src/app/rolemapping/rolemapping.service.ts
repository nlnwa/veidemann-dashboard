import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../commons/crud.service';
import {RoleMapping} from '../commons/models/config.model';

export class RoleMappingService extends CrudService<RoleMapping> {

  static readonly URL: string = `${environment.apiGateway}/rolemappings`;

  constructor(protected http: HttpClient) {
    super(http, RoleMappingService.URL);
  }

  getRoles(): Observable<string[]> {
    return Observable.of(['ANY_USER', 'ANY', 'ADMIN', 'CURATOR', 'READONLY']);
  }
}
