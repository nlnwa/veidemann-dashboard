import {AuthConfig} from 'angular-oauth2-oidc';
import {DeploymentVersions} from '../../../shared/models/deployment-versions.model';

export class AppConfig {
  authConfig?: AuthConfig;
  grpcWebUrl?: string;
  waybackUrl?: string;
  versions?: DeploymentVersions;

  constructor(json?: Partial<AppConfig>) {
    if (json) {
      Object.assign(this, json);
    }
  }
}
