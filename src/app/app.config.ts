import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Environment} from './commons/models/environment.model';
import {environment} from '../environments/environment';
import {IdpReply} from './commons/models/controller.model';

@Injectable()
export class AppConfig {

  private _env: Environment;

  constructor(private http: HttpClient) {
  }

  get environment(): Environment {
    return this._env;
  }

  private getOpenIdConnectIssuer(): Promise<string> {
    return this.http.get<IdpReply>(this.environment.apiGateway + '/control/idp').toPromise()
      .then(reply => reply.open_id_connect_issuer || '');
  }

  public load(): Promise<any> {
    return this.http.get<Environment>(environment.config).toPromise()
      .then(env => this._env = new Environment(env))
      .then(() => this.getOpenIdConnectIssuer()
        .then(issuer => this._env.auth.issuer = issuer));
  }
}
