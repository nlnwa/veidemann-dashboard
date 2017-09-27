import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../commons/crud.service';
import {Entity} from '../commons/models/config.model';

@Injectable()
export class EntityService extends CrudService<Entity> {

  static readonly URL: string = `${environment.API_URL}/entities`;

  constructor(protected http: HttpClient) {
    super(http, EntityService.URL);
  }
}
