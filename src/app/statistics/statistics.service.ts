import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Seeds} from "./statistics";

@Injectable()
export class StatisticsService {

  constructor(private http: Http) { }

  getSeeds() {
    return this.http.get('/api/seeds')
      .map(res => res.json());
  }

  getEntities() {
    return this.http.get('/api/entities')
      .map(res => res.json());
  }

}
