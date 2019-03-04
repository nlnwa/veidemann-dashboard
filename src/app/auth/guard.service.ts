import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {RoleService} from './role.service';
import {Observable, of} from 'rxjs';
import {Role} from '../commons/models/configs/rolemapping.model';
import {Kind} from '../commons/models';

@Injectable()
export class GuardService implements CanActivate {


  constructor(public roleService: RoleService) {
  }

  private static getRolesForPath(path: string): Role[] {
    switch(path) {
      case 'rolemapping':
        return [Role.ADMIN];
      case 'validator':
        return [Role.CURATOR, Role.ADMIN];
      case 'schedule':
      case 'collection':
      case 'crawlconfig':
      case 'crawl':
        return [Role.READONLY, Role.CURATOR, Role.ADMIN];
      default:
        return undefined;
    }
  }
/*
  private static getRolesForKind(kind: Kind) {
    switch (kind) {
      case Kind.COLLECTION:
      case Kind.CRAWLCONFIG:
      case Kind.CRAWLSCHEDULECONFIG:
      case Kind.CRAWLHOSTGROUPCONFIG:
      case Kind.BROWSERCONFIG:
      case Kind.BROWSERSCRIPT:
      case Kind.POLITENESSCONFIG:
      case Kind.CRAWLENTITY:
      case Kind.SEED:
        return [Role.READONLY, Role.CURATOR, Role.ADMIN];
      case Kind.CRAWLJOB:
        return [Role.CURATOR, Role.ADMIN];
      case Kind.ROLEMAPPING:
        return [Role.ADMIN];
      default:
      case Kind.UNDEFINED:
        return [Role.ANY];
    }
  }
*/
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const allowedRoles = this.getAllowedRoles(route);

    for (const role of this.roleService.getRoles()) {
      if (allowedRoles.includes(role)) {
        return of(true);
      }
    }
    return of(false);
  }

  private getAllowedRoles(route: ActivatedRouteSnapshot) {
    return route.url
        .map(segment => segment.path)
        .reduce((roles: Role[], path) => roles || GuardService.getRolesForPath(path), undefined)
      || [Role.ANY];
  }
}
