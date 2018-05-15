import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../shared/crud.service';
import {BrowserScript} from '../../commons/models/config.model';

@Injectable()
export class BrowserScriptService extends CrudService<BrowserScript> {

  protected readonly url: string = `${environment.apiGateway}/control/browserscripts`;

  constructor(protected http: HttpClient) {
    super(http);
  }
}
