// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  config: '/assets/config/environment.json',
  apiGateway: '/api',
  auth: {

    // Url of the Identity Provider
    issuer: '',

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/activity',

    // The SPA's id. The SPA is registered with this id at the auth-server
    clientId: 'veidemann-gui',

    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    scope: 'openid profile email groups offline_access audience:server:client_id:veidemann-api',

    requireHttps: false
  },
};
