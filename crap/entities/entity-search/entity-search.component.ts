import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/Rx';

import { EntitySearchService } from '../entity-search.service';
import { Value } from '../entity';



@Component({
  selector: 'entity-search',
  templateUrl: './entity-search.component.html',
  styleUrls: [ './entity-search.component.css' ],
  providers: [EntitySearchService]
})
export class EntitySearchComponent implements OnInit {
  entities: Observable<Value[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private entitySearchService: EntitySearchService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.entities = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.entitySearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Value[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Value[]>([]);
      });
  }
/*  gotoDetail(entity: Value): void {
    let link = ['/api/listcrawlentities', entity.id];
    this.router.navigate(link);
  }
  */
}
