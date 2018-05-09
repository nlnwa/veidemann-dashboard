import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {RoleService} from './role.service';
import {Observable, of} from 'rxjs';
import {Role} from '../commons/models/config.model';
import {environment} from '../../environments/environment';

@Injectable()
export class GuardService implements CanActivate {

  constructor(public router: Router, public roleService: RoleService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const allowedRoles = route.data.roles as Role[];

    if (!environment.production) {
      return of(true);
    }

    for (const role of this.roleService.getRoles()) {
      if (allowedRoles.includes(role)) {
        return of(true);
      }
    }
    return of(false);
  }
}
