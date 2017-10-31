import {Injectable} from '@angular/core';
import {AuthConfig, JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.configureAuth();
  }

  public get groups() {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['groups'] : null;
  }

  public get name() {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['name'] : null;
  }

  public get authorizationHeader() {
    const token = this.oauthService.getIdToken();
    return `Bearer ${token}`;
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

  private configureAuth() {
    this.oauthService.configure(environment.auth as AuthConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
