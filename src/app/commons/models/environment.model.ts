import {environment} from '../../../environments/environment';

export class Environment {
  auth: AuthConfig;
  apiGateway: string;

  constructor(env: Environment = {} as Environment) {
    const {
      auth = environment.auth,
      apiGateway = environment.apiGateway,
    } = env;
    this.auth = auth;
    this.apiGateway = apiGateway;
  }
}

export class AuthConfig {
  issuer: string;
  requireHttps: boolean;
  redirectUri: string;
  clientId: string;
  scope: string;

  constructor(auth: AuthConfig = {} as AuthConfig) {
    const {
      issuer = environment.auth.issuer,
      requireHttps = environment.auth.requireHttps,
      redirectUri = environment.auth.redirectUri,
      clientId = environment.auth.clientId,
      scope = environment.auth.scope,
    } = auth;
    this.issuer = issuer;
    this.requireHttps = requireHttps;
    this.redirectUri = redirectUri;
    this.clientId = clientId;
    this.scope = scope;
  }
}
