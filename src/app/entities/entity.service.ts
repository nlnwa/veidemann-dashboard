import {Injectable} from '@angular/core';
import {Entities, Entity} from './entity.model';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EntityService {

  private entitiesUrl = `${environment.API_URL}/entities`;

  constructor(private http: HttpClient) {}

  getAllEntities(): Observable<Entities> {
    return this.http.get<Entities>(this.entitiesUrl);
  }

  getEntity(entityId: string): Observable<Entity> {
    return this.http.get<Entities>(`${this.entitiesUrl}/${entityId}`)
      .map((reply) => reply.value[0]);
  }

  createEntity(entity: Entity): Observable<Entity> {
    return this.http.post(this.entitiesUrl, entity);
  }

  deleteEntity(entityId: String) {
    return this.http.delete(this.entitiesUrl + '/' + entityId);
  }

  // put("/api/entities/:id")
  updateEntity(entity: Entity): Observable<Entity> {
    return this.http.put(this.entitiesUrl + '/' + entity.id, entity);
  }
}
