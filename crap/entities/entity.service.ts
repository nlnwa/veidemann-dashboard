import { Injectable } from '@angular/core';
import { Value } from './entity';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EntityService {

  private entitiessUrl = '/api/entities';

  constructor (private http: Http) {}


  getAllEntities() {
    return this.http.get(this.entitiessUrl)
      .map(res => res.json());
  }

  // post("/api/entities")
  createEntity(newEntity: Value[]): Promise<Value> {

    return this.http.post(this.entitiessUrl, newEntity)
      .toPromise()
      .then(response => response.json() as Value)
      .catch(this.handleError);
  }


  deleteEntity(delEntityid: String): Promise<String> {
    return this.http.delete(this.entitiessUrl + '/' + delEntityid)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/entities/:id")
  updateEntity(putEntity: Value): Promise<Value> {
    var putUrl = this.entitiessUrl + '/' + putEntity.id;
    return this.http.put(putUrl, putEntity)
      .toPromise()
      .then(response => response.json() as Value)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}


