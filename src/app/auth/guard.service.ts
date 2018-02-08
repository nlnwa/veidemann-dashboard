import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {RoleService} from '../roles/roles.service';
import {Observable} from 'rxjs/Observable';
import {Role} from '../commons/models/config.model';

@Injectable()
export class GuardService implements CanActivate {

  constructor(public router: Router, public roleService: RoleService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const allowedRoles = route.data.roles as Role[];

    for (const role of this.roleService.getRoles()) {
      if (allowedRoles.includes(role)) {
        return Observable.of(true);
      }
    }
    return Observable.of(false);
  }

}
