import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Role, RoleList} from '../commons/models/config.model';

@Injectable()
export class RoleService {

  private readonly URL: string = `${environment.apiGateway}/roles`;

  private roles: Role[] = [Role.ANY];

  constructor(private http: HttpClient) {
  }

  public resetRoles() {
    this.roles = [Role.ANY]
  }

  public fetchRoles() {
    this.http.get<RoleList>(this.URL)
      .map(res => res.role.map(role => Role[role]))
      .subscribe(roles => {
        this.roles = roles;
      });
  }

  public getRoles(): Role[] {
    return this.roles;
  }

  public isAdmin(): boolean {
    return this.isRole(Role.ADMIN)
  }

  public isCurator(): boolean {
    return this.isRole(Role.CURATOR)
  }

  public isReadonly(): boolean {
    return this.isRole(Role.READONLY)
  }

  private isRole(role: Role) {
    if (this.roles.includes(role)) {
      return true
    } else {
      return false;
    }
  }
}
