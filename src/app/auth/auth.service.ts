import {Injectable} from '@angular/core';
import {AuthConfig, JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {RoleService} from './role.service';


@Injectable()
export class AuthService {

  constructor(private oauthService: OAuthService, private roleService: RoleService) {
  }

  get groups() {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['groups'] : null;
  }

  get name() {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['name'] : null;
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  async logout() {
    this.oauthService.logOut();
    await this.roleService.fetchRoles();
  }

  async initialize(authConfig: AuthConfig) {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    try {
      await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    } catch (err) {
      // noop
    } finally {
      await this.roleService.fetchRoles();
    }
  }
}
