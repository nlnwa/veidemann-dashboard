import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../shared/crud.service';
import {PolitenessConfig, RobotPolicy} from '../../commons/models/config.model';

@Injectable()
export class PolitenessConfigService extends CrudService<PolitenessConfig> {

  static readonly URL: string = `${environment.apiGateway}/control/politenessconfigs`;

  constructor(protected http: HttpClient) {
    super(http, PolitenessConfigService.URL);
  }

  getRobotsConfig(): Observable<string[]> {
    return of(Object.keys(RobotPolicy));
  }
}
