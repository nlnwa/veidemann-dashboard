import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Value }           from './entity';

@Injectable()
export class EntitySearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<Value[]> {
    console.log('searching');
    console.log(this.http.get(`api/searchcrawlentities/name=${term}`)
      .map(response => response.json().data as Value[]));
    return this.http
      .get(`api/searchcrawlentities/name=${term}`)
      .map(response => response.json().data as Value[]);
  }

}

