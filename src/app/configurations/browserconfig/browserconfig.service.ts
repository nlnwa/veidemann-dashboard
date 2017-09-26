import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BrowserConfig} from './browserconfig.model';
import {environment} from '../../../environments/environment';
import {CrudService} from '../../commons/crud.service';

@Injectable()
export class BrowserConfigService extends CrudService<BrowserConfig> {

  static readonly URL: string = `${environment.API_URL}/browserConfig`;

  constructor(protected http: HttpClient) {
    super(http, BrowserConfigService.URL);
  }
}
