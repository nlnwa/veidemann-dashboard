import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Role, RoleList} from '../../../commons/models/configs/rolemapping.model';


@Injectable()
export class RoleService {

  private readonly URL: string = `${environment.apiGateway}/control/activeroles`;

  private roles: Role[] = [];

  constructor(private http: HttpClient) {
  }

  async fetchRoles() {
    this.roles = await this.http.get<RoleList>(this.URL).toPromise()
      .then(res => res.role.map(role => Role[role]));
  }

  getRoles(): Role[] {
    return this.roles;
  }

  isAdmin(): boolean {
    return this.isRole(Role.ADMIN);
  }

  isCurator(): boolean {
    return this.isRole(Role.CURATOR);
  }

  isReadonly(): boolean {
    return this.isRole(Role.READONLY);
  }

  private isRole(role: Role) {
    return this.roles.includes(role);
  }
}
