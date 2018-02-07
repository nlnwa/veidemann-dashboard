import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {RolesService} from '../roles/roles.service';
import {Observable} from 'rxjs/Observable';
import {Role} from '../commons/models/config.model';

@Injectable()
export class GuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router, public rolesService: RolesService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const allowedRoles = route.data.roles as Role[];

    return this.rolesService.getRoles()
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

  canActivateChild(): Observable<boolean> {
    console.log('CHILD AUTH');
    return Observable.of(true);
  }

}
