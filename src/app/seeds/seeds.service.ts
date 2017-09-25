import {Injectable} from '@angular/core';
import {Seed, Seeds} from './seed.model';
import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SeedService {

  private seedsUrl = `${environment.API_URL}/seeds`;
  private seedSearchUrl = `${environment.API_URL}/seedsearch`;
  private seedsOfEntityUrl = `${environment.API_URL}/seedsofentity`;

  constructor(private http: HttpClient) {}

  getAllSeeds(): Observable<Seeds> {
    return this.http.get(this.seedsUrl);
  }

  getSeed(seed): Observable<Seed> {
    return this.http.get<Seeds>(`${this.seedsUrl}/${seed}`)
      .map(seeds => seeds.value[0]);
  }

  search(term: string): Observable<Seeds> {
    return this.http.get(`${this.seedSearchUrl}/name=${term}`);
  }

  deleteSeed(seedId: String): Observable<String> {
    return this.http.delete(`${this.seedsUrl}/${seedId}`);
  }

  // put("/api/entities/:id")
  updateSeed(putSeed: Seed): Observable<Seed> {
    return this.http.put(`${this.seedsUrl}/${putSeed.id}`, putSeed);
  }

  // post("/api/entities")
  createSeed(newSeed: Seed): Observable<Seed> {
    return this.http.post(this.seedsUrl, newSeed);
  }

  getSeedsOfEntity(entity_id): Observable<Seeds> {
    return this.http.get(`${this.seedsOfEntityUrl}/entityid=${entity_id}`);
  }

}
