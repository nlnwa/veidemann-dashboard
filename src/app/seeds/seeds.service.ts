import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Seed} from "./";
import {ErrorHandlerService} from "../commons/";

@Injectable()
export class SeedService {
  private seedsUrl = '/api/seeds';

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {
  }

  getAllSeeds() {
    return this.http.get(this.seedsUrl)
      .map(res => res.json().value);
  }

  getSeed(seed) {
    const url = `${this.seedsUrl}/${seed}`;
    return this.http.get(url)
      .map(res => res.json().value as Seed);
  }

  search(term: string): Observable<Seed[]> {
    return this.http
      .get(`api/seedsearch/name=${term}`)
      .map(res => res.json().value);
  }

  deleteSeed(delSeedid: String): Promise<String> {
    return this.http.delete(this.seedsUrl + '/' + delSeedid)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }

  // put("/api/entities/:id")
  updateSeed(putSeed: Seed): Promise<Seed> {
    const putUrl = this.seedsUrl + '/' + putSeed.id;
    return this.http.put(putUrl, putSeed)
      .toPromise()
      .then(response => response.json() as Seed)
      .catch(this.errorhandlerservice.handleError);
  }

  // post("/api/entities")
  createSeed(newSeed: Seed): Promise<Seed> {
    return this.http.post(this.seedsUrl, newSeed)
      .toPromise()
      .then(response => response.json() as Seed)
      .catch(this.errorhandlerservice.handleError);
  }

  getSeedsOfEntity(entity_id) {
    return this.http
      .get(`api/seedsofentity/entityid=${entity_id}`)
      .map(res => res.json());
  }

}
