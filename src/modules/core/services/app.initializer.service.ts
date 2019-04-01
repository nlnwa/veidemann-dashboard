import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../commons/models/app-config.model';
import {environment} from '../../../environments/environment';
import {IdpReply} from '../../commons/models/controller.model';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {AuthService} from './auth';
import {AppConfigService} from './app.config.service';
import {Role, RoleList} from '../../commons/models/configs/rolemapping.model';

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

      appConfigService.apiGatewayUrl = appConfig.apiGatewayUrl || environment.apiGatewayUrl;
      appConfigService.grpcWebUrl = appConfig.grpcWebUrl || environment.grpcWebUrl;

      const issuer = await this.getOpenIdConnectIssuer(appConfigService.apiGatewayUrl);

      const authConfig = new AuthConfig(Object.assign({}, environment.authConfig, appConfig.authConfig, {issuer}));
      oauthService.configure(authConfig);

      await oauthService.loadDiscoveryDocumentAndTryLogin();
      if (!oauthService.hasValidIdToken()) {
        oauthService.logOut(true);
      } else {
        authService.roles = await this.getRoles(appConfigService.apiGatewayUrl);
      }

      this.initialized = true;
    } catch (error) {
      this.error = error;
    }
  }

  private getOpenIdConnectIssuer(apiGatewayUrl: string): Promise<string> {
    return this.http.get<IdpReply>(apiGatewayUrl + '/control/idp').toPromise()
      .then(reply => reply.open_id_connect_issuer || '');
  }

  private getAppConfig(configUrl: string): Promise<AppConfig> {
    return this.http.get<AppConfig>(configUrl).toPromise();
  }

  private getRoles(apiGatewayUrl: string): Promise<Role[]> {
    return this.http.get<RoleList>(apiGatewayUrl + '/control/activeroles').toPromise()
      .then(res => res.role.map(role => Role[role]));
  }
}
