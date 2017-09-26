import {Component, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Seed} from '../seed.model';
import {SeedService} from '../seeds.service';
import 'rxjs/add/observable/merge';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-seedsearch',
  templateUrl: './seedsearch.component.html',
  styleUrls: ['./seedsearch.component.css']
})
export class SeedSearchComponent implements OnInit {
  seedDataSource: SeedDataSource;

  selectedSeed: Seed;
  searchInput: String;

  private searchTerms = new Subject<string>();

  constructor(private seedService: SeedService,
              private router: Router) {
  }

  search(term: string): void {
    this.searchTerms.next(term.replace(/\//g, '%2F'));
  }

  handleRowClick(row) {
    this.selectedSeed = row as Seed;
  }

  selectSeed(seed: Seed) {
    this.searchInput = null;
    this.selectedSeed = seed;
    this.search('');
    // let link = ['/seeds/', seed.id];
    // this.router.navigate(link);
  }


  ngOnInit() {
    this.seedDataSource = new SeedDataSource(this.seedService);

    /*
      this.seed = this.searchTerms
        .debounceTime(150)        // wait 300ms after each keystroke before considering the term
        .distinctUntilChanged()   // ignore if next search term is same as previous
        .switchMap(term => term   // switch to new observable each time the term changes
          // return the http search observable
          ? this.SeedService.search(term)
          // or the observable of empty heroes if there was no search term
          : Observable.of<Seed[]>([]))

        .catch(error => {
          return Observable.of<Seed[]>([]);
        });
        */
  }

  gotoDetail(seed: Seed): void {
    const link = ['/seeds/', seed.id];
    this.router.navigate(link);
  }

  updateSeed = (seed: Seed) => {
    // this.SeedService.getSeed(seed.id);
    // console.log(seed.meta.last_modified.seconds);
    // const updatedSeed = this.SeedService.getSeed(seed.id).subscribe(updatedSeed => updatedSeed);
  };

}

export class SeedDataSource extends DataSource<Seed> {
  _dataChange = new BehaviorSubject<Seed[]>([]);

  constructor(private seedService: SeedService) {
    super();
    this.seedService.list().subscribe(seeds => this._dataChange.next(seeds.value));
  }

  connect(): Observable<Seed[]> {
    return this._dataChange;
  }

  disconnect() {}
}
