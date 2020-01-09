import {Injectable} from '@angular/core';

import {from, Observable, Observer, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {ConfigObjectProto, ConfigPromiseClient, GetLabelKeysRequest, LabelKeysResponse, ListRequest, UpdateRequest} from '../../../api';
import {AuthService} from './auth';
import {AppConfigService} from './app.config.service';
import {ConfigObject, ConfigRef} from '../../commons/models/config';
import {ErrorService} from './error.service';

const catchConfigError = (errorService: ErrorService, returnValue: any) =>
  catchError(error => {
    errorService.dispatch(error);
    return of(returnValue);
  });

@Injectable()
export class ConfigService {

  private configPromiseClient: ConfigPromiseClient;

  constructor(protected authService: AuthService,
              private appConfig: AppConfigService,
              private errorService: ErrorService) {
    this.configPromiseClient = new ConfigPromiseClient(appConfig.grpcWebUrl, null, null);
  }

  list(listRequest: ListRequest): Observable<ConfigObject> {
    return new Observable((observer: Observer<ConfigObjectProto>) => {
      const stream = this.configPromiseClient.listConfigObjects(listRequest, this.authService.metadata)
        .on('data', (data) => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    }).pipe(
      map(ConfigObject.fromProto),
      catchConfigError(this.errorService, null)
    );
  }

  count(request: ListRequest): Observable<number> {
    return from(this.configPromiseClient.countConfigObjects(request, this.authService.metadata))
      .pipe(
        map(listCountResponse => listCountResponse.getCount()),
        catchConfigError(this.errorService, 0)
      );
  }

  get(configRef: ConfigRef): Observable<ConfigObject> {
    return from(this.configPromiseClient.getConfigObject(ConfigRef.toProto(configRef), this.authService.metadata))
      .pipe(
        map(ConfigObject.fromProto),
        catchConfigError(this.errorService, null)
      );
  }

  save(config: ConfigObject): Observable<ConfigObject> {
    return from(this.configPromiseClient.saveConfigObject(ConfigObject.toProto(config), this.authService.metadata)).pipe(
      map(ConfigObject.fromProto),
      catchConfigError(this.errorService, null)
    );
  }

  update(updateRequest: UpdateRequest): Observable<number> {
    return from(this.configPromiseClient.updateConfigObjects(updateRequest, this.authService.metadata)).pipe(
      map(updateResponse => updateResponse.getUpdated()),
      catchConfigError(this.errorService, null)
    );
  }

  delete(configObject: ConfigObject): Observable<boolean> {
    return from(this.configPromiseClient.deleteConfigObject(ConfigObject.toProto(configObject), this.authService.metadata))
      .pipe(
        map(deleteResponse => deleteResponse.getDeleted()),
        catchError(error => {
          this.errorService.delete(error, configObject);
          return of(false);
        })
      );
  }

  getLabelKeys(request: GetLabelKeysRequest): Observable<Array<string>> {
    return from(this.configPromiseClient.getLabelKeys(request, this.authService.metadata))
      .pipe(
        map((response: LabelKeysResponse) => response.getKeyList()),
        catchConfigError(this.errorService, [])
      );
  }
}
