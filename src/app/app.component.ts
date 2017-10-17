import {Component, OnInit} from '@angular/core';
import {DateTime} from './commons/';
import {JwksValidationHandler, OAuthService} from "angular-oauth2-oidc";
import {authConfig} from './auth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myDate: String;
  isExpertMode: boolean;

  constructor(private oauthService: OAuthService) {
    this.configureAuth();
  }

  setExpertMode(bool: boolean) {
    this.isExpertMode = bool;
  }

  getTimestamp() {
    setInterval(() => {
      this.myDate = DateTime.nowUTC();
    }, 1000);
  }

  ngOnInit() {
    this.getTimestamp();
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logout() {
    this.oauthService.logOut();
  }

  public get groups() {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['groups'];
  }

  public get name() {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims['name'];
  }

  private configureAuth() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
