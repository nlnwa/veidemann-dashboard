import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {Role} from '../../../commons/models/configs/rolemapping.model';


@Injectable()
export class AuthService {

  roles: Role[] = [Role.ANY];

  constructor(private oauthService: OAuthService) {
  }

  get groups(): string {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['groups'] : '';
  }

  get name(): string {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['name'] : '';
  }

  get email(): string {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims['email'] : '';
  }

  get idToken(): string {
    return this.oauthService.getIdToken();
  }

  /**
   * @returns authorization header for API calls
   */
  get metadata(): { authorization: string } {
    return {authorization: 'Bearer ' + this.idToken};
  }

  get requestedPath(): string {
    return this.oauthService.state;
  }

  isAdmin(): boolean {
    return this.roles.includes(Role.ADMIN);
  }

  isCurator(): boolean {
    return this.roles.includes(Role.CURATOR);
  }

  isReadonly(): boolean {
    return this.roles.includes(Role.READONLY);
  }

  login(redirectUrl?: string) {
    this.oauthService.initImplicitFlow(redirectUrl);
  }

  logout() {
    this.oauthService.logOut();
    this.roles = [Role.ANY];
  }
}
