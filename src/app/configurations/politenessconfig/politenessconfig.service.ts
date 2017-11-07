import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../../commons/crud.service';
import {PolitenessConfig} from '../../commons/models/config.model';

@Injectable()
export class PolitenessConfigService extends CrudService<PolitenessConfig> {

  static readonly URL: string = `${environment.API_URL}/politenessconfigs`;

  constructor(protected http: HttpClient) {
    super(http, PolitenessConfigService.URL);
  }

  getRobotsConfig(): Observable<string[]> {
    return Observable.of(['OBEY_ROBOTS', 'IGNORE_ROBOTS', 'CUSTOM_ROBOTS']);
  }
}
