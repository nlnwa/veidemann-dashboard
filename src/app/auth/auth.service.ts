import {Injectable} from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import {AppConfig} from '../app.config';

@Injectable()
export class AuthService {

  constructor(private appConfig: AppConfig, private oauthService: OAuthService) {
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

  public configureAuth() {
    const auth = this.appConfig.auth;
    if (auth && auth.issuer !== '') {
      this.oauthService.configure(auth);
      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      this.oauthService.loadDiscoveryDocumentAndTryLogin()
        .catch(_ => Observable.empty());
    }
  }
}
