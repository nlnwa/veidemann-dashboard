import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LogLevels} from '../../commons/models';
import {map} from 'rxjs/operators';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import {fromPromise} from 'rxjs/internal-compatibility';
import {ConfigPromiseClient} from '../../../api';
import {OAuthService} from 'angular-oauth2-oidc';
import {AppConfigService} from '../../core/services';

@Injectable()
export class LogService {
  private configPromiseClient: ConfigPromiseClient;

  constructor(private oauthService: OAuthService,
              private appConfig: AppConfigService) {
    this.configPromiseClient = new ConfigPromiseClient(appConfig.grpcWebUrl, null, null);
  }

  /**
   * @returns authorization header for API calls
   */
  get metadata(): { authorization: string } {
    const idToken = this.oauthService.getIdToken();
    if (idToken) {
      return {authorization: 'Bearer ' + idToken};
    } else {
      return null;
    }
  }

  getLogConfig(): Observable<LogLevels> {
    return fromPromise(this.configPromiseClient.getLogConfig(new Empty(), this.metadata)).pipe(
      map(_ => LogLevels.fromProto(_))
    );
  }

  saveLogConfig(logLevels: LogLevels): Observable<LogLevels> {
    return fromPromise(this.configPromiseClient.saveLogConfig(LogLevels.toProto(logLevels), this.metadata)).pipe(
      map(_ => LogLevels.fromProto(_))
    );
  }
}
