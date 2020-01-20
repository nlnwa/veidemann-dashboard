import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Empty} from 'google-protobuf/google/protobuf/empty_pb';

import {ControllerPromiseClient} from '../../../../api';
import {AuthService} from '../auth';
import {AppConfigService} from '../app.config.service';
import {RunStatus} from '../../../../shared/models/controller';
import {Role} from '../../../../shared/models/config';


@Injectable()
export class ControllerApiService {

  private controllerPromiseClient: ControllerPromiseClient;

  constructor(private authService: AuthService,
              private appConfig: AppConfigService) {
    this.controllerPromiseClient = new ControllerPromiseClient(appConfig.grpcWebUrl, null, null);
  }

  getOpenIdConnectIssuer(): Promise<string> {
    return this.controllerPromiseClient.getOpenIdConnectIssuer(new Empty())
      .then(response => response.getOpenIdConnectIssuer());
  }

  getRolesForActiveUser(): Promise<Role[]> {
    return this.controllerPromiseClient.getRolesForActiveUser(new Empty(), this.authService.metadata)
      .then(roleList => roleList.getRoleList());
  }

  getRunStatus(): Observable<RunStatus> {
    return from(this.controllerPromiseClient.status(new Empty()))
      .pipe(map(status => status.getRunstatus()));
  }
}
