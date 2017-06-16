import { Component, OnInit } from '@angular/core';
import {Seed} from "../seed";
import {Observable, Subject} from "rxjs";
import {SeedsService} from "../seeds.service";
import {Router} from "@angular/router";
import { Location }  from '@angular/common';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-seedsearch',
  templateUrl: './seedsearch.component.html',
  styleUrls: ['./seedsearch.component.css']
})
export class SeedSearchComponent implements OnInit {
  seed: Observable<Seed[]>;
  selectedSeed: Seed;


  private searchTerms = new Subject<string>();

  constructor(
    private SeedService: SeedsService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    )
{}
  search(term: string): void {
    this.searchTerms.next(term.replace(/\//g,'%2F'));
  }


  selectSeed(seed: Seed) {
    this.selectedSeed = seed;
    }

  ngOnInit() {
    this.seed = this.searchTerms
    .debounceTime(300)        // wait 300ms after each keystroke before considering the term
    .distinctUntilChanged()   // ignore if next search term is same as previous
    .switchMap(term => term   // switch to new observable each time the term changes
      // return the http search observable
      ? this.SeedService.search(term)
      // or the observable of empty heroes if there was no search term
      : Observable.of<Seed[]>([]))

    .catch(error => {
      // TODO: add real error handling
      console.log(error);
      return Observable.of<Seed[]>([]);
    });

  }
  gotoDetail(seed: Seed): void {
    let link = ['api/seeds/', seed.id];
    this.router.navigate(link);
  }


}
