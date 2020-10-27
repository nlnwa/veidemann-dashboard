import {Injectable} from '@angular/core';
import {Metadata} from 'grpc-web';
import {OAuthService} from 'angular-oauth2-oidc';
import {Role} from '../../../../shared/models';
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

  getAbility(): any {
    return this.ability;
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
    //console.log('onLogin before abilities updated: ', this.ability);
    //this.updateAbility();
  }

  logout() {
    this.oauthService.logOut();
    this.roles = [Role.ANY];
    this.updateAbility();
  }

  updateAbility() {
    console.log('running updateAbility for Roles: ', this.roles);
    const {can, rules} = new AbilityBuilder<Ability>();

    const reports = ['JobExecution', 'CrawlExecution', 'CrawlLog', 'PageLog'];
    const operatorConfigs = ['Entity', 'Seed', 'Collection', 'CrawlJobs', 'Schedule', 'CrawlConfig',
      'CrawlHostGroup', 'BrowserConfig', 'BrowserScript', 'Politeness', 'LogLevel'];
    const curatorConfigs = ['Entity', 'Seed', 'Collection', 'CrawlJobs', 'CrawlConfig'];

    if (this.isAdmin()) {
      can('manage', 'all');
    }

    if (this.isOperator()) {
      can('manage', operatorConfigs);
      can('read', reports);
    }

    if (this.isCurator()) {
      can('manage', curatorConfigs);
      can('view', reports);
    }

    if (this.isAnyUser()) {
      can('view', ['Entity', 'Seed']);
    } else {
      can('view', 'Home');
    }
    this.ability.update(rules);
    console.log('ability after update:', this.ability);
  }
}
