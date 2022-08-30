import {Injectable} from '@angular/core';
import {Metadata} from 'grpc-web';
import {OAuthService} from 'angular-oauth2-oidc';
import {Kind, Role} from '../../../../shared/models';
import {Ability, AbilityBuilder, MongoQuery} from '@casl/ability';
import {Claims} from '../../models';

const enum Action {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  UPDATE_ALL = 'updateAll',
  RUN_CRAWL = 'runCrawl',
  MANAGE = 'manage',
  ABORT = 'abort'
}

const enum Subject {
  ALL = 'all',
  HOME = 'home',
  REPORT = 'report',
  JOB_EXECUTION = 'jobexecution',
  CRAWL_EXECUTION = 'crawlexecution',
  PAGE_LOG = 'pagelog',
  CRAWL_LOG = 'crawllog',
  CONFIGS = 'configs',
  SCHEDULE_OVERVIEW = 'scheduleOverview',
  CRAWLER_STATUS = 'crawlerStatus',
  ANNOTATION = 'annotation',
  LOGCONFIG = 'logconfig',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly Kind = Kind;

  private _roles: Role[];

  constructor(private oauthService: OAuthService, private ability: Ability) {
    this._roles = [Role.ANY];
  }

  get groups(): string {
    const claims = this.oauthService.getIdentityClaims() as Claims;
    return claims?.groups || '';
  }

  get name(): string {
    const claims = this.oauthService.getIdentityClaims() as Claims;
    return claims?.name || '';
  }

  get email(): string {
    const claims = this.oauthService.getIdentityClaims() as Claims;
    return claims?.email || '';
  }

  get isLoggedIn(): boolean {
    return this._roles.some(role => role !== Role.ANY);
  }

  get requestedUri(): string {
    return decodeURIComponent(this.oauthService.state);
  }

  set roles(roles: Role[]) {
    this._roles = roles;
    this.updateAbility();
  }

  getAbility(): Ability {
    return this.ability;
  }

  canCreate(subject: Kind | string): boolean {
    if (typeof subject === 'string') {
      return this.ability.can(Action.CREATE, subject);
    } else {
      return this.ability.can(Action.CREATE, Kind[subject]);
    }
  }

  canUpdate(subject: Kind | string): boolean {
    if (typeof subject === 'string') {
      return this.ability.can(Action.UPDATE, subject);
    } else {
      return this.ability.can(Action.UPDATE, Kind[subject]);
    }
  }

  canDelete(subject: Kind | string): boolean {
    if (typeof subject === 'string') {
      return this.ability.can(Action.DELETE, subject);
    } else {
      return this.ability.can(Action.DELETE, Kind[subject]);
    }
  }

  canRead(subject: Kind | string): boolean {
    if (typeof subject === 'string') {
      return this.ability.can(Action.READ, subject);
    } else {
      return this.ability.can(Action.READ, Kind[subject]);
    }
  }

  canRunCrawl(kind: Kind): boolean {
    return this.ability.can('runCrawl', Kind[kind]);
  }

  canAbortCrawl(subject: string) {
    return this.ability.can('abort', subject);
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
    for (const role of this._roles) {
      if (roles.includes(role)) {
        return true;
      }
    }
    return false;
  }

  isAdmin(): boolean {
    return this._roles.includes(Role.ADMIN);
  }

  isCurator(): boolean {
    return this._roles.includes(Role.CURATOR);
  }

  isReadonly(): boolean {
    return this._roles.includes(Role.READONLY);
  }

  isConsultant(): boolean {
    return this._roles.includes(Role.CONSULTANT);
  }

  isOperator(): boolean {
    return this._roles.includes(Role.OPERATOR);
  }

  isAnyUser(): boolean {
    return this._roles.includes(Role.ANY_USER);
  }

  login(redirectUrl?: string) {
    this.oauthService.initLoginFlow(redirectUrl);
  }

  logout() {
    this.oauthService.logOut();
    this._roles = [Role.ANY];
    this.updateAbility();
  }

  updateAbility() {
    const {can, rules} = new AbilityBuilder(Ability);

    const operatorConfigs = [Kind[Kind.CRAWLENTITY], Kind[Kind.SEED], Kind[Kind.CRAWLJOB], Kind[Kind.CRAWLCONFIG],
      Kind[Kind.CRAWLSCHEDULECONFIG], Kind[Kind.BROWSERCONFIG], Kind[Kind.POLITENESSCONFIG], Kind[Kind.BROWSERSCRIPT],
      Kind[Kind.CRAWLHOSTGROUPCONFIG], Kind[Kind.COLLECTION]];

    const curatorConfigs = [Kind[Kind.CRAWLENTITY], Kind[Kind.SEED], Kind[Kind.COLLECTION], Kind[Kind.CRAWLJOB],
      Kind[Kind.CRAWLCONFIG], Kind[Kind.CRAWLSCHEDULECONFIG]];

    const reports = [Subject.REPORT, Subject.JOB_EXECUTION, Subject.CRAWL_EXECUTION, Subject.PAGE_LOG, Subject.CRAWL_LOG];

    if (this.isAdmin()) {
      can(Action.MANAGE, Subject.ALL);
    }

    if (this.isOperator()) {
      can(Action.READ, Subject.HOME);
      can(Action.READ, reports);
      can([Action.READ, Action.UPDATE], Subject.ANNOTATION);
      can(Action.READ, Subject.CONFIGS);
      can([Action.READ, Action.UPDATE], Subject.CRAWLER_STATUS);
      can([Action.CREATE, Action.READ, Action.UPDATE, Action.UPDATE_ALL], operatorConfigs);
      can(Action.RUN_CRAWL, [Kind[Kind.SEED], Kind[Kind.CRAWLJOB]]);
      can(Action.ABORT, [Subject.JOB_EXECUTION, Subject.CRAWL_EXECUTION]);
      can([Action.READ, Action.UPDATE], Subject.LOGCONFIG);
      can(Action.READ, Subject.SCHEDULE_OVERVIEW);
    }

    if (this.isCurator()) {
      can(Action.READ, Subject.HOME);
      can(Action.READ, Subject.CRAWLER_STATUS);
      can([Action.CREATE, Action.READ, Action.UPDATE, Action.UPDATE_ALL], curatorConfigs);
      can(Action.RUN_CRAWL, [Kind[Kind.SEED], Kind[Kind.CRAWLJOB]]);
      can(Action.ABORT, [Subject.JOB_EXECUTION, Subject.CRAWL_EXECUTION]);
      can([Action.READ, Action.UPDATE], Subject.ANNOTATION);
      can(Action.READ, Subject.CONFIGS);
      can(Action.READ, reports);
      can(Action.READ, Subject.SCHEDULE_OVERVIEW);
    }

    if (this.isConsultant()) {
      can(Action.READ, Subject.HOME);
      can(Action.READ, Subject.CRAWLER_STATUS);
      can([Action.CREATE, Action.READ, Action.UPDATE], [Kind[Kind.CRAWLENTITY], Kind[Kind.SEED]]);
      can(Action.READ, Subject.CONFIGS);
      can(Action.READ, reports);
    }

    if (this.isAnyUser()) {
      can(Action.READ, Subject.HOME);
    }
    this.ability.update(rules);
  }
}
