import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/finally';
import {EntityService} from '../entities';
import {SeedService} from '../seeds';
import {Item} from '../../commons/list';


/* tslint:disable:no-bitwise */
export enum ResultType {
  EntityName = 1 << 0,
  EntityLabel = 1 << 1,
  SeedName = 1 << 2,
  SeedLabel = 1 << 3,
}

@Injectable()
export class SearchService {

  private subject: Subject<void> = new Subject<void>();
  searchCompleted$ = this.subject.asObservable();

  private static applyType(item: any, type) {
    item.type = type;
    return item;
  }

  constructor(private entityService: EntityService,
              private seedService: SeedService) {
  }

  search(term: string): Observable<Item> {
    let completeCount = 1;
    if (term) {
      completeCount = 4;
    }
    let count = 0;
    const complete = () => {
      count++;
      if (count >= completeCount) {
        this.subject.next();
      }
    };

    const entities$: Observable<Item> = this.entityService.search({name: term})
      .flatMap((reply) => reply.value || [],
        (_, inner) => SearchService.applyType(inner, ResultType.EntityName))
      .finally(complete);

    const entityLabel$: Observable<Item> = this.entityService.search({label_selector: [term]})
      .flatMap((reply) => reply.value || [],
        (_, inner) => SearchService.applyType(inner, ResultType.EntityLabel))
      .finally(complete);

    const seedLabel$: Observable<Item> = this.seedService.search({label_selector: [term]})
      .flatMap(reply => reply.value ? Observable.forkJoin(reply.value.map(seed => this.entityService.get(seed.entity_id))) : [])
      .flatMap(
        (entities) => entities,
        (_, inner) => SearchService.applyType(inner, ResultType.SeedLabel))
      .finally(complete);

    const seedEntities$: Observable<Item> = this.seedService.search({name: term})
      .flatMap(reply => reply.value ? Observable.forkJoin(reply.value.map(seed => this.entityService.get(seed.entity_id))) : [])
      .flatMap(
        (entities) => entities,
        (_, inner) => SearchService.applyType(inner, ResultType.SeedName))
      .finally(complete);

    return completeCount > 1
      ? entities$
        .merge(entityLabel$)
        .merge(seedLabel$)
        .merge(seedEntities$)
      : entities$;
  }
}
