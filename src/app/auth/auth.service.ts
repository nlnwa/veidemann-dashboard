import {Injectable} from '@angular/core';

import {AuthConfig, JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {RoleService} from './role.service';


@Injectable()
export class AuthService {

  constructor(private oauthService: OAuthService, private roleService: RoleService) {
  }

  public get groups() {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['groups'] : null;
  }

  public get name() {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['name'] : null;
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logout() {
    this.oauthService.logOut();
    this.roleService.resetRoles();
  }

  public configure(auth: AuthConfig): Promise<any> {
    if (auth && auth.issuer !== '') {
      this.oauthService.configure(auth);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      return this.oauthService.loadDiscoveryDocumentAndTryLogin()
        .then(() => this.roleService.fetchRoles())
        .catch(() => Promise.resolve());
    } else {
      console.log('No idp issuer configured so authentication is not possible.');
      return Promise.resolve();
    }
  }
}
