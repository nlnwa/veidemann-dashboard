import {Injectable} from '@angular/core';
import {Entity} from './entity.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../commons/crud.service';

@Injectable()
export class EntityService extends CrudService<Entity> {

  static readonly URL: string = `${environment.API_URL}/entities`;

  constructor(protected http: HttpClient) {
    super(http, EntityService.URL);
  }
}
