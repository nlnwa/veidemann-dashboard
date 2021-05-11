import {AuthConfig} from 'angular-oauth2-oidc';

export class AppConfig {
  authConfig?: AuthConfig;
  grpcWebUrl?: string;

  constructor(json?: Partial<AppConfig>) {
    if (json) {
      Object.assign(this, json);
    }
  }
}
