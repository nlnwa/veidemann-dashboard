import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Role, RoleList} from '../commons/models/config.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RolesService {

  private readonly URL: string = `${environment.apiGateway}/roles`;

  constructor(private http: HttpClient) {
  }

  public getRoles(): Observable<Role[]> {
    return this.http.get<RoleList>(this.URL)
      .map(res => res.role.map(role => Role[role]));
  }

  public isAdmin(): Observable<boolean> {
    return this.getRoles().map(roles => {
      if (roles.includes(Role.ADMIN)) {
        return true
      } else {
        return false;
      }
    });
  }
}
