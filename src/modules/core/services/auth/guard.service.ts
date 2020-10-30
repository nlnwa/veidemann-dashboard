import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';

import {AuthService} from './auth.service';
import {Kind} from '../../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(public authService: AuthService) {
  }

  // private getRolesByPath(path: string): Role[] {
  //   const ability = this.authService.getAbility();
  //   switch (path) {
  //     case 'rolemapping':
  //       return ability.can('read', Kind.ROLEMAPPING)
  //     case 'validator':
  //     case 'report':
  //       return [Role.CURATOR, Role.ADMIN, Role.OPERATOR];
  //     case 'config':
  //        return [Role.READONLY, Role.CURATOR, Role.ADMIN, Role.OPERATOR, Role.CONSULTANT];
  //     case 'schedule':
  //     case 'collection':
  //     case 'crawlconfig':
  //     case 'crawljobs':
  //     case 'search':
  //     case 'activity':
  //     case 'status':
  //       return [Role.READONLY, Role.CURATOR, Role.ADMIN, Role.OPERATOR];
  //     case 'entity':
  //       return [Role.READONLY, Role.CURATOR, Role.ADMIN, Role.OPERATOR, Role.CONSULTANT];
  //     case 'seed':
  //       return [Role.READONLY, Role.CURATOR, Role.ADMIN, Role.OPERATOR, Role.CONSULTANT];
  //     case 'logconfig':
  //       return [Role.ADMIN, Role.OPERATOR];
  //     default:
  //       return [Role.ANY];
  //   }
  // }

  // private static getAllowedRolesWhenLoading(route: Route): Role[] {
  //   return this.getRolesByPath(route.path) || [Role.ANY];
  // }
  //
  // private static getAllowedRolesWhenActivating(route: ActivatedRouteSnapshot): Role[] {
  //   return route.url
  //       .map(segment => segment.path)
  //       .reduce((roles: Role[], path) => roles || GuardService.getRolesByPath(path), undefined)
  //     || [Role.ANY];
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //   const allowedRoles = GuardService.getAllowedRolesWhenActivating(route);
    //
    //   if (!this.authService.isLoggedIn) {
    //     this.authService.login(state.url);
    //   }
    //
    //   return this.authService.isAuthorized(allowedRoles)
    //     ? of(true)
    //     : of(false);
    // }
    //
    // canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    //   const allowedRoles = GuardService.getAllowedRolesWhenLoading(route);
    //
    //   return this.authService.isAuthorized(allowedRoles)
    //     ? of(true)
    //     : of(false);
    // }


    const ability = this.authService.getAbility();
    const path = route.url.map(segment => segment.path);
    console.log('canActivate path: ', path[0]);
    switch (path[0]) {
      case 'rolemapping':
        return of(ability.can('read', Kind.ROLEMAPPING.toString()));
      case 'report':
        return of(ability.can('read', 'report'));
      case 'config':
        return of(ability.can('read', 'configs'));
      case 'schedule':
        return of(ability.can('read', Kind.CRAWLSCHEDULECONFIG.toString()));
      case 'collection':
        return of(ability.can('read', Kind.COLLECTION.toString()));
      case 'crawlconfig':
        return of(ability.can('read', Kind.CRAWLCONFIG.toString()));
      case 'crawljobs':
        return of(ability.can('read', Kind.CRAWLJOB.toString()));
      // case 'search':
      // case 'activity':
      case 'status':
        return of(ability.can('read', 'status'));
      case 'entity':
        return of(ability.can('read', Kind.CRAWLENTITY.toString()));
      case 'seed':
        return of(ability.can('read', Kind.SEED.toString()));
      case 'logconfig':
        return of(ability.can('read', 'logconfig'));
    }
  }
}
