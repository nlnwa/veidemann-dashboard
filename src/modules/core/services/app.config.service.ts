import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Environment} from '../../commons/models/environment.model';
import {environment} from '../../../environments/environment';
import {IdpReply} from '../../commons/models/controller.model';
import {AuthService} from './auth/auth.service';

@Injectable()
export class AppConfigService {

  private _env: Environment;

  initialized = false;
  error: string;

  constructor(private http: HttpClient) {
  }

  get environment(): Environment {
    return this._env;
  }

  private getOpenIdConnectIssuer(): Promise<string> {
    return this.http.get<IdpReply>(this.environment.apiGateway + '/control/idp')
      .toPromise()
      .then(reply => reply.open_id_connect_issuer || '');
  }

  async load(authService: AuthService): Promise<any> {

    try {
      const config = await this.http.get<Environment>(environment.config).toPromise();

      this._env = new Environment(config);

      this._env.authConfig.issuer = await this.getOpenIdConnectIssuer();

      await authService.initialize(this._env.authConfig);

      this.initialized = true;
    } catch (error) {
      this.error = error.message;
    }
  }
}
