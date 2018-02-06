import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthConfig, Environment} from './commons/models/environment.model';
import {environment} from '../environments/environment';

@Injectable()
export class AppConfig {

  private _env: Environment;

  get environment(): Environment {
    return this._env;
  }

  set environment(env: Environment) {
    this._env = new Environment(env);
  }

  constructor(private http: HttpClient) {
    this.environment = environment;
  }

  get auth(): AuthConfig {
    return this.environment.auth;
  }

  public load(): Promise<Environment> {
    if (environment.config === '') {
      return Promise.resolve(this.environment = {} as Environment);
    }
    return this.http.get<Environment>(environment.config).toPromise()
      .then(env => this.environment = env )
      .catch(err => {
        console.error(err);
        return this.environment = {} as Environment;
      })
  }
}
