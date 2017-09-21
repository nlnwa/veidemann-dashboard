import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Seed} from './seed';
import {ErrorHandlerService} from '../commons/';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SeedService {

  private seedsUrl = `${environment.API_URL}/seeds`;
  private seedSearchUrl = `${environment.API_URL}/seedsearch`;
  private seedsOfEntityUrl = `${environment.API_URL}/seedsofentity`;

  constructor(private http: Http,
              private errorHandlerService: ErrorHandlerService) {
  }

  getAllSeeds(): Observable<Seed[]> {
    return this.http.get(this.seedsUrl)
      .map(res => res.json().value as Seed[]);
  }

  getSeed(seed) {
    const url = `${this.seedsUrl}/${seed}`;
    return this.http.get(url)
      .map(res => res.json().value as Seed);
  }

  search(term: string): Observable<Seed[]> {
    return this.http
      .get(`${this.seedSearchUrl}/name=${term}`)
      .map(res => res.json().value);
  }

  deleteSeed(delSeedid: String): Observable<String> {
    return this.http.delete(this.seedsUrl + '/' + delSeedid)
      .map(res => res.json().value as String)
  }

  // put("/api/entities/:id")
  updateSeed(putSeed: Seed): Observable<Seed> {
    const putUrl = this.seedsUrl + '/' + putSeed.id;
    return this.http.put(putUrl, putSeed)
      .map(response => response.json() as Seed)
  }

  // post("/api/entities")
  createSeed(newSeed: Seed): Observable<Seed> {
    return this.http.post(this.seedsUrl, newSeed)
      .map(response => response.json() as Seed)
  }

  getSeedsOfEntity(entity_id) {
    return this.http
      .get(`${this.seedsOfEntityUrl}/entityid=${entity_id}`)
      .map(res => res.json());
  }

}
