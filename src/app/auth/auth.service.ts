import {Injectable} from '@angular/core';
import {AuthConfig, JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {RoleService} from './role.service';
import {IdpReply} from '../commons/models/controller.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthService {

  private readonly URL: string = `${environment.apiGateway}/control/idp`;

  constructor(private oauthService: OAuthService, private roleService: RoleService, private http: HttpClient) {
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
    this.roleService.resetRoles();
  }

  private getOpenIdConnectIssuer(): Observable<string> {
    return this.http.get<IdpReply>(this.URL)
      .map(reply => reply.open_id_connect_issuer);
  }

  public configure(auth: AuthConfig): Promise<any> {
    return this.getOpenIdConnectIssuer().toPromise()
      .then(issuer => {
        if (issuer !== '') {
          auth.issuer = issuer;
          this.oauthService.configure(auth);
          this.oauthService.tokenValidationHandler = new JwksValidationHandler();
          return this.oauthService.loadDiscoveryDocumentAndTryLogin()
            .then(() => this.roleService.fetchRoles())
            .catch(() => Promise.resolve());
        } else {
          Promise.resolve(this.roleService.fetchRoles());
        }
      });
  }
}
