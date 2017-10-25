import {Injectable} from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './auth.config';

@Injectable()
export class AuthService {
  constructor(private oauthService: OAuthService) {
    this.configureAuth();
  }

  public get groups() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    } else {
      return claims['groups'];
    }
  }

  public get name() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    } else {
      return claims['name'];
    }
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
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
