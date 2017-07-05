import {Component, OnInit} from "@angular/core";
import {Seed} from "../seed";
import {Observable, Subject} from "rxjs";
import {SeedsService} from "../seeds.service";
import {Router} from "@angular/router";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

@Component({
  selector: 'app-seedsearch',
  templateUrl: './seedsearch.component.html',
  styleUrls: ['./seedsearch.component.css']
})
export class SeedSearchComponent implements OnInit {
  seed: Observable<Seed[]>;
  selectedSeed: Seed;

  private searchTerms = new Subject<string>();

  constructor(private SeedService: SeedsService,
              private router: Router) {
  }

  search(term: string): void {
    this.searchTerms.next(term.replace(/\//g, '%2F'));
  }

  selectSeed(seed: Seed) {
    this.selectedSeed = seed;
    this.search('');
    //let link = ['/seeds/', seed.id];
    //this.router.navigate(link);
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
    let link = ['/seeds/', seed.id];
    this.router.navigate(link);
  }

  updateSeed = (seed: Seed) => {
    //this.SeedService.getSeed(seed.id);
    //console.log(seed.meta.last_modified.seconds);
    //const updatedSeed = this.SeedService.getSeed(seed.id).subscribe(updatedSeed => updatedSeed);
  };

}
