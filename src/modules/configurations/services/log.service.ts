import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Level, LogLevels} from '../../commons/models';
import {AppConfigService, AuthService} from '../../core/services';
import {map} from 'rxjs/operators';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import {fromPromise} from 'rxjs/internal-compatibility';
import {ConfigPromiseClient} from '../../../api';

@Injectable()
export class LogService {
  private configPromiseClient: ConfigPromiseClient;

  constructor(private authService: AuthService,
              private appConfigService: AppConfigService) {
    this.configPromiseClient = new ConfigPromiseClient(appConfigService.grpcWebUrl, null, null);
  }

  getLogConfig(): Observable<LogLevels> {
    const metadata = this.authService.metadata;
    return fromPromise(this.configPromiseClient.getLogConfig(new Empty(), metadata)).pipe(
      map(_ => LogLevels.fromProto(_))
    );
  }

  saveLogConfig(logLevels: LogLevels): Observable<LogLevels> {
    const metadata = this.authService.metadata;
    return fromPromise(this.configPromiseClient.saveLogConfig(LogLevels.toProto(logLevels), metadata)).pipe(
      map(_ => LogLevels.fromProto(_))
    );
  }
}
