import {Inject, Injectable} from '@angular/core';

import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {ControllerApiService} from './api/controller-api.service';
import {AuthService} from './auth';
import {AppConfig} from '../models/app-config.model';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  error: Error;

  constructor(private appConfig: AppConfig,
              private oAuthService: OAuthService,
              private authService: AuthService,
              private controllerApiService: ControllerApiService) {
  }

  async init() {
    try {
      const issuer = await this.controllerApiService.getOpenIdConnectIssuer();

      if (issuer) {
        this.appConfig.authConfig.issuer = issuer;
        this.oAuthService.configure(new AuthConfig(this.appConfig.authConfig));
        await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
        if (!this.oAuthService.hasValidIdToken()) {
          this.oAuthService.logOut(true);
        }
      }
      this.authService.roles = await this.controllerApiService.getRolesForActiveUser();
      this.authService.updateAbility();
    } catch (error) {
      this.error = error;
    }
  }
}
