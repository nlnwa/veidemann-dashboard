import {Injectable} from '@angular/core';
import {AuthConfig, JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';


@Injectable()
export class AuthService {

  constructor(private oauthService: OAuthService) {
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
  }

  public configure(auth: AuthConfig): Promise<any> {
      this.oauthService.configure(auth);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      return this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
