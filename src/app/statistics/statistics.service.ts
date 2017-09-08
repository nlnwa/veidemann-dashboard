import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {environment} from '../../environments/environment';

@Injectable()
export class StatisticsService {

  private seedsUrl = `${environment.API_URL}/seeds`;
  private entitiesUrl = `${environment.API_URL}/entities`;

  constructor(private http: Http) {
  }

  getSeeds() {
    return this.http.get(this.seedsUrl)
      .map(res => res.json());
  }

  getEntities() {
    return this.http.get(this.entitiesUrl)
      .map(res => res.json());
  }

}
