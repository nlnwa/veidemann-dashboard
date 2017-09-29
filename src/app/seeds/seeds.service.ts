import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CrudService} from '../commons/crud.service';
import {ListReply} from '../commons/models/controller.model';
import {Seed} from '../commons/models/config.model';

@Injectable()
export class SeedService extends CrudService<Seed> {

  private static readonly URL: string = `${environment.API_URL}/seeds`;

  constructor(protected http: HttpClient) {
    super(http, SeedService.URL);
  }

  getSeedsOfEntity(entityId): Observable<ListReply<Seed>> {
    const params = new HttpParams().set('entity_id', entityId);
    return this.http.get<ListReply<Seed>>(SeedService.URL, {params});
  }
}
