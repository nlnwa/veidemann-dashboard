import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Level, LogLevels} from '../../commons/models';
import {AppConfigService, AuthService} from '../../core/services';
import {map} from 'rxjs/operators';
import {ControllerPromiseClient} from '../../../api/gen/veidemann_api/controller_grpc_web_pb';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable()
export class LogService {
  private controllerPromiseClient: ControllerPromiseClient;

  constructor(private authService: AuthService,
              private appConfigService: AppConfigService) {
    this.controllerPromiseClient = new ControllerPromiseClient(appConfigService.grpcWebUrl, null, null);
  }

  getLogConfig(): Observable<LogLevels> {
    const metadata = this.authService.metadata;
    return fromPromise(this.controllerPromiseClient.getLogConfig(new Empty(), metadata)).pipe(
      map(_ => LogLevels.fromProto(_))
    );
  }

  saveLogConfig(logLevels: LogLevels): Observable<LogLevels> {
    const metadata = this.authService.metadata;
    return fromPromise(this.controllerPromiseClient.saveLogConfig(LogLevels.toProto(logLevels), metadata)).pipe(
      map(_ => LogLevels.fromProto(_))
    );
  }
}
