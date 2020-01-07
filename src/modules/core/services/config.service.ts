import {Injectable} from '@angular/core';

import {from, Observable, Observer} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {ConfigPromiseClient, GetLabelKeysRequest, LabelKeysResponse, ListRequest, UpdateRequest} from '../../../api';
import {AuthService} from './auth';
import {AppConfigService} from './app.config.service';
import {ConfigObject, ConfigRef} from '../../commons/models/config';


@Injectable()
export class ConfigService {

  private configPromiseClient: ConfigPromiseClient;

  constructor(protected authService: AuthService,
              private appConfig: AppConfigService) {
    this.configPromiseClient = new ConfigPromiseClient(appConfig.grpcWebUrl, null, null);
  }


  list(listRequest: ListRequest): Observable<ConfigObject> {
    return new Observable((observer: Observer<ConfigObject>) => {
      const stream = this.configPromiseClient.listConfigObjects(listRequest, this.authService.metadata)
        .on('data', (data) => observer.next(ConfigObject.fromProto(data)))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    });
  }

  count(request: ListRequest): Observable<number> {
    return from(this.configPromiseClient.countConfigObjects(request, this.authService.metadata))
      .pipe(map(listCountResponse => listCountResponse.getCount()));
  }

  get(configRef: ConfigRef): Observable<ConfigObject> {
    return from(this.configPromiseClient.getConfigObject(ConfigRef.toProto(configRef), this.authService.metadata)).pipe(
      map(ConfigObject.fromProto)
    );
  }

  save(config: ConfigObject): Observable<ConfigObject> {
    return from(this.configPromiseClient.saveConfigObject(ConfigObject.toProto(config), this.authService.metadata)).pipe(
      map(ConfigObject.fromProto)
    );
  }

  update(updateRequest: UpdateRequest): Observable<number> {
    return from(this.configPromiseClient.updateConfigObjects(updateRequest, this.authService.metadata)).pipe(
      map(updateResponse => updateResponse.getUpdated())
    );
  }

  delete(configObject: ConfigObject): Observable<boolean> {
    return from(this.configPromiseClient.deleteConfigObject(ConfigObject.toProto(configObject), this.authService.metadata)).pipe(
      map(deleteResponse => deleteResponse.getDeleted())
    );
  }

  getLabelKeys(request: GetLabelKeysRequest): Observable<LabelKeysResponse> {
    return from(this.configPromiseClient.getLabelKeys(request, this.authService.metadata));
  }
}
