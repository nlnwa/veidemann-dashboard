import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ErrorHandlerService} from '../commons/';
import {Entity} from './entity';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EntityService {

  private entitiesUrl = `${environment.API_URL}/entities`;

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {
  }

  getEntities() {
    return this.http.get(this.entitiesUrl)
      .map(res => res.json())
      .catch(this.errorhandlerservice.handleError);
  }

  getEntity(entity) {
    return this.http.get(`${this.entitiesUrl}/${entity}`)
      .map(res => res.json().value)
      .catch(this.errorhandlerservice.handleError);
  }

  createEntity(newEntity: Entity): Observable<Entity> {
    return this.http.post(this.entitiesUrl, newEntity)
      .map(response => response.json() as Entity)
      .catch(this.errorhandlerservice.handleError);
  }

  deleteEntity(delEntityId: String): Observable<String> {
    return this.http.delete(this.entitiesUrl + '/' + delEntityId)
      .map(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }

  // put("/api/entities/:id")
  updateEntity(putEntity: Entity): Observable<Entity> {
    const putUrl = this.entitiesUrl + '/' + putEntity.id;
    return this.http.put(putUrl, putEntity)
      .map(response => response.json() as Entity)
      .catch(this.errorhandlerservice.handleError);
  }
}
