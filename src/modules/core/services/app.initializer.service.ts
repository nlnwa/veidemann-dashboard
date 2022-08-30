import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {AuthService} from './auth';
import {AppConfig} from '../models';
import {ControllerPromiseClient} from '../../../api/controller/v1/controller_grpc_web_pb';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  private client: ControllerPromiseClient;

  error: Error;

  constructor(private appConfig: AppConfig,
              private oAuthService: OAuthService,
              private authService: AuthService) {
    this.client = new ControllerPromiseClient(appConfig.grpcWebUrl);
  }

  async init() {
    try {
      const issuer = await this.client.getOpenIdConnectIssuer(new Empty()).then(_ => _.getOpenIdConnectIssuer());
      if (issuer) {
        this.appConfig.authConfig.issuer = issuer;
        this.oAuthService.configure(new AuthConfig(this.appConfig.authConfig));
        await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
        if (!this.oAuthService.hasValidIdToken()) {
          this.oAuthService.logOut(true);
        }
      }
      this.authService.roles = await this.client
        .getRolesForActiveUser(new Empty(), this.authService.metadata).then(_ => _.getRoleList());
    } catch (err) {
      this.error = err;
    }
  }
}
