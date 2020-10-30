import {Injectable} from '@angular/core';
import {Metadata} from 'grpc-web';
import {OAuthService} from 'angular-oauth2-oidc';
import {Kind, Role} from '../../../../shared/models';
import {Ability, AbilityBuilder} from '@casl/ability';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  roles: Role[];

  constructor(private oauthService: OAuthService, private ability: Ability) {
    this.roles = [Role.ANY];
  }

  get groups(): string {
    const claims = this.oauthService.getIdentityClaims();
    // @ts-ignore
    return claims ? claims.groups : '';
  }

  get name(): string {
    const claims = this.oauthService.getIdentityClaims();
    // @ts-ignore
    return claims ? claims.name : '';
  }

  get email(): string {
    const claims = this.oauthService.getIdentityClaims();
    // @ts-ignore
    return claims ? claims.email : '';
  }

  get isLoggedIn(): boolean {
    return this.roles.some(role => role !== Role.ANY);
  }

  get requestedUri(): string {
    return decodeURIComponent(this.oauthService.state);
  }

  getAbility(): Ability {
    return this.ability;
  }

  canCreate(subject): boolean {
    return this.ability.can('create', subject.toString());
  }

  canUpdate(subject): boolean {
    return this.ability.can('update', subject.toString());
  }

  canDelete(subject): boolean {
    return this.ability.can('delete', subject.toString());
  }

  canRead(subject): boolean {
    return this.ability.can('read', subject.toString());
  }

  canRunCrawl(subject): boolean {
    return this.ability.can('runCrawl', subject.toString());
  }

  /**
   * @returns authorization header for API calls
   */
  get metadata(): Metadata {
    const idToken = this.oauthService.getIdToken();
    if (idToken) {
      return {authorization: 'Bearer ' + idToken};
    } else {
      return null;
    }
  }

  isAuthorized(roles: Role[]): boolean {
    for (const role of this.roles) {
      if (roles.includes(role)) {
        return true;
      }
    }
    return false;
  }

   isAdmin(): boolean {
    return this.roles.includes(Role.ADMIN);
  }

   isCurator(): boolean {
    return this.roles.includes(Role.CURATOR);
  }

   isReadonly(): boolean {
    return this.roles.includes(Role.READONLY);
  }

   isConsultant(): boolean {
    return this.roles.includes(Role.CONSULTANT);
  }

   isOperator(): boolean {
    return this.roles.includes(Role.OPERATOR);
  }

   isAnyUser(): boolean {
    return this.roles.includes(Role.ANY_USER);
  }

  login(redirectUrl?: string) {
    this.oauthService.initLoginFlow(redirectUrl);
    // console.log('onLogin before abilities updated: ', this.ability);
    // this.updateAbility();
  }

  logout() {
    this.oauthService.logOut();
    this.roles = [Role.ANY];
    this.updateAbility();
  }

  updateAbility() {
    const {can, cannot, rules} = new AbilityBuilder<Ability>();

    const operatorConfigs = [Kind.CRAWLENTITY, Kind.SEED, Kind.CRAWLJOB, Kind.CRAWLCONFIG, Kind.CRAWLSCHEDULECONFIG,
      Kind.BROWSERCONFIG, Kind.POLITENESSCONFIG, Kind.BROWSERSCRIPT, Kind.CRAWLHOSTGROUPCONFIG, Kind.COLLECTION];
    const curatorConfigs = [Kind.CRAWLENTITY, Kind.SEED, Kind.COLLECTION, Kind.CRAWLJOB, Kind.CRAWLCONFIG];

    if (this.isAdmin()) {
      can('manage', 'all');
    }

    if (this.isOperator()) {
      can(['create', 'read', 'delete', 'update', 'updateAll'], operatorConfigs.map(String));
      can('read', 'configs');
      can('read', 'reports');
      can('read', 'logconfig');
      can('runCrawl', [Kind.SEED, Kind.CRAWLJOB].map(String));
    }

    if (this.isCurator()) {
      can('manage', curatorConfigs.map(String));
      can('read', 'reports');
    }

    if (this.isConsultant()) {
      can('manage', ['Entity', 'Seed']);
      can('read', 'reports');
    }

    if (this.isAnyUser()) {
      can('read', ['Entity', 'Seed']);
    } else {
      can('read', 'Home');
    }
    this.ability.update(rules);
    console.log('ability after update:', this.ability);
  }
}
