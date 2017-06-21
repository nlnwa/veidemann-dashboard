import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Seed} from "./seed";

@Injectable()
export class SeedsService {
  private seedsUrl = '/api/seeds';
  private entitiessUrl = '/api/entities';
  private crawljobUrl = '/api/crawljob';

  constructor(private http: Http) {
  }

  getAllSeeds() {
    return this.http.get(this.seedsUrl)
      .map(res => res.json().value);
  }


  getSeed(seed) {
    const url = `${this.seedsUrl}/${seed}`;
    return this.http.get(url)
      .map(res => res.json());
  }

  search(term: string): Observable<Seed[]> {
    return this.http
      .get(`api/seedsearch/name=${term}`)
      .map(res => res.json().value);
  }

  getEntities() {
    return this.http.get(this.entitiessUrl)
      .map(res => res.json());
  }

  getEntity(entity) {
    return this.http.get(`${this.entitiessUrl}/${entity}`)
      .map(res => res.json().value);
  }


  getCrawlJobs() {
    return this.http.get(this.crawljobUrl)
      .map(res => res.json());
  }

  getCrawlJob(job_id) {
    return this.http.get(`${this.crawljobUrl}/${job_id}`)
      .map(res => res.json().value);
  }

  deleteSeed(delSeedid: String): Promise<String> {
    return this.http.delete(this.seedsUrl + '/' + delSeedid)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/entities/:id")
  updateSeed(putSeed: Seed): Promise<Seed> {
    const putUrl = this.seedsUrl + '/' + putSeed.id;
    return this.http.put(putUrl, putSeed)
      .toPromise()
      .then(response => response.json() as Seed)
      .catch(this.handleError);
  }

  // post("/api/entities")
  createSeed(newSeed: Seed): Promise<Seed> {
    return this.http.post(this.seedsUrl, newSeed)
      .toPromise()
      .then(response => response.json() as Seed)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error accurred', error);
    return Promise.reject(error.message || error);
  }


}
