import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {CrudService} from '../shared/crud.service';
import {BrowserConfig} from '../../commons/models/config.model';
import {Observable, of} from 'rxjs';

@Injectable()
export class BrowserConfigService extends CrudService<BrowserConfig> {

  protected readonly url: string = `${environment.apiGateway}/control/browserconfigs`;

  constructor(protected http: HttpClient) {
    super(http);
  }

  getBrowserConfig(): Observable<Object[]> {
    return of(
      [
        {
          'id': '1',
          'itemName': 'OBEY_ROBOTS',
        },
        {
          'id': '2',
          'itemName': 'IGNORE_ROBOTS',
        },
        {
          'id': '3',
          'itemName': 'CUSTOM_ROBOTS',
        },
      ]);
  }
}
