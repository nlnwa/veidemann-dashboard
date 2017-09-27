import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../commons/crud.service';
import {ListReply} from '../commons/models/controller.model';
import {Seed} from '../commons/models/config.model';

@Injectable()
export class SeedService extends CrudService<Seed> {

  private static readonly URL: string = `${environment.API_URL}/seeds`;
  private static readonly seedSearchUrl = `${environment.API_URL}/seedsearch`;
  private static readonly seedsOfEntityUrl = `${environment.API_URL}/seedsofentity`;


  constructor(protected http: HttpClient) {
    super(http, SeedService.URL);
  }

  search(term: string): Observable<ListReply<Seed>> {
    return this.http.get<ListReply<Seed>>(`${SeedService.seedSearchUrl}/name=${term}`);
  }

  getSeedsOfEntity(entity_id): Observable<ListReply<Seed>> {
    return this.http.get<ListReply<Seed>>(`${SeedService.seedsOfEntityUrl}/entityid=${entity_id}`);
  }
}
