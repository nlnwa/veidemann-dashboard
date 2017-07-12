import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ErrorHandlerService} from "../commons/components/errorhandlerservice";
import {Entity} from "./entity";

@Injectable()
export class EntityService {

  private entitiessUrl = '/api/entities';

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {
  }

  getEntities() {
    return this.http.get(this.entitiessUrl)
      .map(res => res.json())
      .catch(this.errorhandlerservice.handleError);
  }

  getEntity(entity) {
    return this.http.get(`${this.entitiessUrl}/${entity}`)
      .map(res => res.json().value)
      .catch(this.errorhandlerservice.handleError);
  }

  createEntity(newEntity: Entity): Promise<Entity> {
    return this.http.post(this.entitiessUrl, newEntity)
      .toPromise()
      .then(response => response.json() as Entity)
      .catch(this.errorhandlerservice.handleError);
  }

  deleteEntity(delEntityId: String): Promise<String> {
    return this.http.delete(this.entitiessUrl + '/' + delEntityId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }

  // put("/api/entities/:id")
  updateEntity(putEntity: Entity): Promise<Entity> {
    const putUrl = this.entitiessUrl + '/' + putEntity.id;
    return this.http.put(putUrl, putEntity)
      .toPromise()
      .then(response => response.json() as Entity)
      .catch(this.errorhandlerservice.handleError);
  }
}
