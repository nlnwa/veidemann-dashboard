import {from, Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';
import {Metadata} from 'grpc-web';
import {MetadataInterceptor} from './interceptors';
import {ConfigPromiseClient} from '../../../../api/config/v1/config_grpc_web_pb';
import {
  GetLabelKeysRequest,
  GetScriptAnnotationsRequest,
  GetScriptAnnotationsResponse,
  LabelKeysResponse,
  ListRequest,
  UpdateRequest
} from '../../../../api/config/v1/config_pb';
import {Annotation, ConfigObject, ConfigRef, LogLevels} from '../../../../api/config/v1/resources_pb';
import {Empty} from 'google-protobuf/google/protobuf/empty_pb';


export class ConfigApiService {
  private client: ConfigPromiseClient;

  constructor(private host: string,
              private metadata?: Metadata) {
    let options: { [p: string]: any };
    if (metadata) {
      const interceptor = new MetadataInterceptor(metadata);
      options = {
        'streamInterceptors': [interceptor],
        'unaryInterceptors': [interceptor]
      };
    }
    this.client = new ConfigPromiseClient(host, null, options);
  }

  list(listRequest: ListRequest): Observable<ConfigObject> {
    return new Observable((observer: Observer<ConfigObject>) => {
      const stream = this.client.listConfigObjects(listRequest)
        .on('data', (data) => observer.next(data))
        .on('error', error => observer.error(error))
        .on('end', () => observer.complete());
      return () => stream.cancel();
    });
  }

  count(request: ListRequest): Observable<number> {
    return from(this.client.countConfigObjects(request)).pipe(
      map(listCountResponse => listCountResponse.getCount())
    );
  }

  get(configRef: ConfigRef): Observable<ConfigObject> {
    return from(this.client.getConfigObject(configRef));
  }

  save(config: ConfigObject): Observable<ConfigObject> {
    return from(this.client.saveConfigObject(config));
  }

  update(updateRequest: UpdateRequest): Observable<number> {
    return from(this.client.updateConfigObjects(updateRequest)).pipe(
      map(updateResponse => updateResponse.getUpdated()),
    );
  }

  delete(configObject: ConfigObject): Observable<boolean> {
    return from(this.client.deleteConfigObject(configObject)).pipe(
      map(deleteResponse => deleteResponse.getDeleted()),
    );
  }

  getLabelKeys(request: GetLabelKeysRequest): Observable<Array<string>> {
    return from(this.client.getLabelKeys(request)).pipe(
      map((response: LabelKeysResponse) => response.getKeyList())
    );
  }

  getScriptAnnotations(request: GetScriptAnnotationsRequest): Observable<Annotation[]> {
    return from(this.client.getScriptAnnotations(request)).pipe(
      map((response: GetScriptAnnotationsResponse) => response.getAnnotationList()),
    );
  }

  getLogConfig(): Observable<LogLevels.LogLevel[]> {
    return from(this.client.getLogConfig(new Empty())).pipe(
      map(_ => _.getLogLevelList()));
  }

  saveLogConfig(logLevels: LogLevels): Observable<LogLevels.LogLevel[]> {
    return from(this.client.saveLogConfig(logLevels)).pipe(
      map(_ => _.getLogLevelList()));
  }
}
