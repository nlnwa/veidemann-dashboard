import {environment} from '../../../environments/environment';

export class AuthConfig {
  issuer: string;
  requireHttps: boolean;
  redirectUri: string;
  clientId: string;
  scope: string;

  constructor(authConfig: AuthConfig = {} as AuthConfig) {
    const {
      issuer = environment.authConfig.issuer,
      requireHttps = environment.authConfig.requireHttps,
      redirectUri = environment.authConfig.redirectUri,
      clientId = environment.authConfig.clientId,
      scope = environment.authConfig.scope,
    } = authConfig;
    this.issuer = issuer;
    this.requireHttps = requireHttps;
    this.redirectUri = redirectUri;
    this.clientId = clientId;
    this.scope = scope;
  }
}

export class Environment {
  authConfig: AuthConfig;
  apiGateway: string;
  grpcWeb: string;

  constructor(env: Environment = {} as Environment) {
    if (env.hasOwnProperty('authConfig')) {
      env.authConfig = new AuthConfig(env.authConfig);
    }
    const {
      authConfig = environment.authConfig,
      apiGateway = environment.apiGateway,
      grpcWeb = environment.grpcWeb,
    } = env;
    this.authConfig = authConfig;
    this.apiGateway = apiGateway;
    this.grpcWeb = grpcWeb;
  }
}
