import {Injectable} from '@angular/core';
import {Metadata} from 'grpc-web';
import {OAuthService} from 'angular-oauth2-oidc';
import {Role} from '../../../../shared/models';


@Injectable()
export class AuthService {

  roles: Role[];

  constructor(private oauthService: OAuthService) {
    this.roles = [Role.ANY];
  }

  get groups(): string {
    const claims = this.oauthService.getIdentityClaims();
    // @ts-ignore
    return claims ? claims.groups : '';
  }

  get name(): string {
    const claims = this.oauthService.getIdentityClaims();
    // @ts-ignore
    return claims ? claims.name : '';
  }

  get email(): string {
    const claims = this.oauthService.getIdentityClaims();
    // @ts-ignore
    return claims ? claims.email : '';
  }

  get isLoggedIn(): boolean {
    return this.roles.some(role => role !== Role.ANY);
  }

  get requestedUri(): string {
    return this.oauthService.state;
  }

  /**
   * @returns authorization header for API calls
   */
  get metadata(): Metadata {
    const idToken = this.oauthService.getIdToken();
    if (idToken) {
      return {authorization: 'Bearer ' + idToken};
    } else {
      return null;
    }
  }

  isAuthorized(roles: Role[]): boolean {
    for (const role of this.roles) {
      if (roles.includes(role)) {
        return true;
      }
    }
    return false;
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
