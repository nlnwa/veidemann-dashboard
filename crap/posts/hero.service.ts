import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/delay';

import { Hero } from './data-model';

@Injectable()
export class HeroService {

  constructor(private http: Http){}

  private userssUrl = '/api/users';

  delayMs = 500;

  /*return this.http
.get(`api/searchcrawlentities/name=${term}`)
  .map(response => response.json().data as Value[]);
  */

  getHeroes() {
    return this.http.get(this.userssUrl)
      .map(res => res.json());
  }

  /*getHeroes(): Observable<Hero[]> {
    return this.http.get(this.userssUrl)
      .map(response => response.json().data as Hero[])
  }*/

 /* // Fake server get; assume nothing can go wrong
  getHeroes(): Observable<Hero[]> {
    return of(heroes).delay(this.delayMs); // simulate latency with delay
  }*/

  // Fake server update; assume nothing can go wrong
  /*updateHero(hero: Hero): Observable<Hero>  {
    const oldHero = heroes.find(h => h.id === hero.id);
    const newHero = Object.assign(oldHero, hero); // Demo: mutate cached hero
    return of(newHero).delay(this.delayMs); // simulate latency with delay
  }*/
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
