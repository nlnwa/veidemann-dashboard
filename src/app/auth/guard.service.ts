import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {RoleService} from '../roles/roles.service';
import {Observable} from 'rxjs/Observable';
import {Role} from '../commons/models/config.model';

@Injectable()
export class GuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router, public roleService: RoleService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const allowedRoles = route.data.roles as Role[];

    return this.roleService.getRoles()
      .map(roles => {
        for (const role of roles) {
          if (allowedRoles.includes(role)) {
            return true
          }
        }
        this.authService.login();
        return false;
      });
  }

}
