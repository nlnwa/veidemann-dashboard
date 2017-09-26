import {Injectable} from '@angular/core';
import {PolitenessConfig} from './';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../../commons/crud.service';

@Injectable()
export class PolitenessConfigService extends CrudService<PolitenessConfig> {

  private static readonly robotsPolicyUrl = `${environment.API_URL}/robotspolicy`;

  static readonly URL: string = `${environment.API_URL}/politenessconfig`;

  constructor(protected http: HttpClient) {
    super(http, PolitenessConfigService.URL);
  }

  getRobotsConfig(): Observable<Object[]> {
    return this.http.get(PolitenessConfigService.robotsPolicyUrl)
      .map((res => res['menuitem']));
  }
}
