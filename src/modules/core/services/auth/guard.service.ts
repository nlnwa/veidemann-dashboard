import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';
import {Role} from '../../../commons/models/configs/rolemapping.model';

@Injectable()
export class GuardService implements CanActivate, CanLoad {

  // stores requested path to be able to redirect after login
  requestedPath: string;

  constructor(public authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const allowedRoles = this.getAllowedRolesWhenActivating(route);

    for (const role of this.authService.roles) {
      if (allowedRoles.includes(role)) {
        return of(true);
      }
    }
    return of(false);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = this.getAllowedRolesWhenLoading(route);

    for (const role of this.authService.roles) {
      if (allowedRoles.includes(role)) {
        return of(true);
      }
    }
    // store requested path
    this.requestedPath = segments.join('/');

    return of(false);
  }

  private getAllowedRolesWhenLoading(route: Route): Role[] {
    return this.getRolesByPath(route.path) || [Role.ANY];
  }

  private getAllowedRolesWhenActivating(route: ActivatedRouteSnapshot): Role[] {
    return route.url
        .map(segment => segment.path)
        .reduce((roles: Role[], path) => roles || this.getRolesByPath(path), undefined)
      || [Role.ANY];
  }

  private getRolesByPath(path: string): Role[] {
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
        return [Role.READONLY, Role.CURATOR, Role.ADMIN];
      default:
        return [Role.ANY];
    }
  }
}
