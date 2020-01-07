import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {Observable, of} from 'rxjs';

import {AuthService} from './auth.service';
import {Role} from '../../../commons/models';

@Injectable()
export class GuardService implements CanActivate, CanLoad {

  // stores requested path to be able to redirect after login
  requestedPath: string;

  constructor(public authService: AuthService) {
  }

  private static getRolesByPath(path: string): Role[] {
    switch (path) {
      case 'rolemapping':
        return [Role.ADMIN];
      case 'validator':
        return [Role.CURATOR, Role.ADMIN];
      case 'schedule':
      case 'collection':
      case 'crawlconfig':
      case 'crawljobs':
      case 'search':
      case 'config':
      case 'activity':
      case 'status':
        return [Role.READONLY, Role.CURATOR, Role.ADMIN, Role.OPERATOR];
      case 'logconfig':
        return [Role.READONLY, Role.CURATOR, Role.ADMIN];
      default:
        return [Role.ANY];
    }
  }

  private static getAllowedRolesWhenLoading(route: Route): Role[] {
    return GuardService.getRolesByPath(route.path) || [Role.ANY];
  }

  private static getAllowedRolesWhenActivating(route: ActivatedRouteSnapshot): Role[] {
    return route.url
        .map(segment => segment.path)
        .reduce((roles: Role[], path) => roles || GuardService.getRolesByPath(path), undefined)
      || [Role.ANY];
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const allowedRoles = GuardService.getAllowedRolesWhenActivating(route);

    return this.authService.isAuthorized(allowedRoles) ? of(true) : of(false);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = GuardService.getAllowedRolesWhenLoading(route);

    if (this.authService.isAuthorized(allowedRoles)) {
      return of(true);
    }
    // store requested path
    this.requestedPath = segments.join('/');

    return of(false);
  }
}
