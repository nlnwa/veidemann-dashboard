import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../commons/models/app-config.model';
import {environment} from '../../../environments/environment';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {AuthService} from './auth';
import {AppConfigService} from './app.config.service';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import {ControllerPromiseClient} from '../../../api';
import {Role} from '../../commons/models';

@Injectable()
export class AppInitializerService {

  initialized = false;
  error: Error;

  constructor(private http: HttpClient) {
  }

  /**
   *
   * @param appConfigService Configuration store
   * @param oauthService OIDC library service
   * @param authService Role store
   */
  async init(appConfigService: AppConfigService,
             oauthService: OAuthService,
             authService: AuthService): Promise<any> {
    try {
      const appConfig: AppConfig = await this.getAppConfig(environment.config);

      appConfigService.grpcWebUrl = appConfig.grpcWebUrl || environment.grpcWebUrl;

      const controllerPromiseClient = new ControllerPromiseClient(appConfigService.grpcWebUrl, null, null);

      const issuer = await controllerPromiseClient.getOpenIdConnectIssuer(new Empty())
        .then(response => response.getOpenIdConnectIssuer());

      if (issuer) {
        const authConfig = new AuthConfig(Object.assign({}, environment.authConfig, appConfig.authConfig, {issuer}));
        oauthService.configure(authConfig);

        await oauthService.loadDiscoveryDocumentAndTryLogin();

        if (!oauthService.hasValidIdToken()) {
          oauthService.logOut(true);
        }
      }

      authService.roles = await controllerPromiseClient.getRolesForActiveUser(new Empty(), authService.metadata)
        .then(roleList => roleList.getRoleList())
        .catch(error => {
          // TODO this catch clause can be removed when bug in veidemann-controller is resolved
          if (!issuer) {
            return [Role.ANY, Role.ANY_USER, Role.ADMIN];
          } else {
            throw error;
          }
        });

      this.initialized = true;
    } catch (error) {
      this.error = error;
    }
  }

  private getAppConfig(configUrl: string): Promise<AppConfig> {
    return this.http.get<AppConfig>(configUrl).toPromise();
  }
}
