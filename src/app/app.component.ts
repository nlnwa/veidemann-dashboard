import {Component, OnInit} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import {Seed, SeedService} from "./seeds/";
import {DateTime} from "./commons/";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  seed: Observable<Seed[]>;
  selectedSeed: Seed;
  searchfield: String;
  myDate: String;


  private searchTerms = new Subject<string>();

  constructor(private SeedService: SeedService,
              private router: Router,
              private datetime: DateTime) {
  }

  getTimestamp() {
    setInterval(() => {
      this.myDate = this.datetime.nowUTC();
    }, 1000);
  }


  search(term: string): void {
    this.searchTerms.next(term.replace(/\//g, '%2F'));
  }

  selectSeed(seed: Seed) {
    this.selectedSeed = seed;

  }

  ngOnInit() {
    this.getTimestamp();
    this.seed = this.searchTerms
      .debounceTime(150)        // wait 300ms after each keystroke before considering the term
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
    this.searchfield = null;
    this.search('');
    let link = ['/seeds/', seed.id];

    this.router.navigate(link);

  }

  updateSeed = (seed: Seed) => {
    //this.SeedService.getSeed(seed.id);
    //console.log(seed.meta.last_modified.seconds);
    //const updatedSeed = this.SeedService.getSeed(seed.id).subscribe(updatedSeed => updatedSeed);
  };

}
