import {Injectable} from '@angular/core';

import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {ControllerService} from './controller.service';
import {AuthService} from './auth';
import {AppConfigService} from './app.config.service';

@Injectable()
export class AppInitializerService {

  error: Error;

  constructor(private appConfig: AppConfigService,
              private oAuthService: OAuthService,
              private authService: AuthService,
              private controllerService: ControllerService) {
  }

  async init() {
    try {
      const issuer = await this.controllerService.getOpenIdConnectIssuer();

      if (issuer) {
        this.appConfig.authConfig = new AuthConfig(Object.assign(this.appConfig.authConfig, {issuer}));

        this.oAuthService.configure(this.appConfig.authConfig);
        await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
        if (!this.oAuthService.hasValidIdToken()) {
          this.oAuthService.logOut(true);
        }
      }
      this.authService.roles = await this.controllerService.getRolesForActiveUser().toPromise();
    } catch (error) {
      this.error = error;
    }
  }
}
