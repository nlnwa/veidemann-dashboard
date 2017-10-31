export const environment = {
  production: true,
  API_URL: '/api',
  auth: {

    // Url of the Identity Provider
    issuer: 'http://$EXTERNAL_HOSTNAME:32000/dex',

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin,

    // The SPA's id. The SPA is registered with this id at the auth-server
    clientId: 'veidemann-gui',

    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    scope: 'openid profile email groups offline_access audience:server:client_id:veidemann-api',

    requireHttps: false
  },
};
