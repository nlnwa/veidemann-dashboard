import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  issuer: 'http://$EXTERNAL_HOSTNAME:32000/dex',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/activity',

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: 'veidemann-api',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email groups',

  requireHttps: false
}
