import { Component, OnInit } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { Hero }        from './data-model';
import { HeroService } from './hero.service';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html'
})
export class HeroListComponent implements OnInit {
  heroes: any = [];
  isLoading = false;
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }


  ngOnInit() {this.heroService.getHeroes().subscribe(heroes => {this.heroes = heroes}); }



  getHeroes() {
    this.isLoading = true;
    this.heroes = this.heroService.getHeroes().subscribe(heroes => console.log(heroes));
                      // Todo: error handling
                      //.finally(() => this.isLoading = false);
    console.log(this.heroService.getHeroes());

    this.selectedHero = undefined;
  }

  select(hero: Hero) { this.selectedHero = hero; }
}

/*  getHeroes() {
 this.heroService
 .getHeroes()
 .then((heroes: Hero[]) => {
 this.heroes = heroes.map((hero) => {
 return hero;
 });
 });
 }*/

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
