import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../shared/crud.service';
import {Entity} from '../../commons/models/config.model';

@Injectable()
export class EntityService extends CrudService<Entity> {

  static readonly URL: string = `${environment.apiGateway}/entities`;

  constructor(protected http: HttpClient) {
    super(http, EntityService.URL);
  }
}
