import {Injectable} from '@angular/core';
import {defer, from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';

import {ControllerPromiseClient, RoleProto} from '../../../api';
import {AuthService} from './auth';
import {AppConfigService} from './app.config.service';


@Injectable()
export class ControllerService {

  private controllerPromiseClient: ControllerPromiseClient;

  constructor(private authService: AuthService,
              private appConfig: AppConfigService) {
    this.controllerPromiseClient = new ControllerPromiseClient(appConfig.grpcWebUrl, null, null);
  }

  getOpenIdConnectIssuer(): Promise<string> {
    return this.controllerPromiseClient.getOpenIdConnectIssuer(new Empty())
      .then(response => response.getOpenIdConnectIssuer());
  }

  getRolesForActiveUser(): Observable<RoleProto[]> {
    return defer(() => from(this.controllerPromiseClient.getRolesForActiveUser(new Empty(), this.authService.metadata)))
      .pipe(map(roleList => roleList.getRoleList()));
  }
}
