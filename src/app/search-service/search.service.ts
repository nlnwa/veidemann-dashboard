import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/bufferCount'
import {EntityService} from '../entities/entity.service';
import {SeedService} from '../seeds/seeds.service';
import {Item} from '../commons/list/list-database';

/* tslint:disable:no-bitwise */
export enum ResultType {
  EntityName = 1 << 0,
  EntityLabel = 1 << 1,
  SeedName = 1 << 2,
  SeedLabel = 1 << 3,
}


@Injectable()
export class SearchService {

  private completedSubject = new Subject<any>();
  completed$ = this.completedSubject.asObservable().bufferCount(4);

  private static applyType(item: any, type) {
    (<any>item).type = type;
    return item;
  }

  constructor(private entityService: EntityService,
              private seedService: SeedService) {
  }

  search(term: string): Observable<Item> {
    let selector = {};
    if (term) {
      selector = {selector: {label: [{key: term}, {value: term}]}};
    }

    const entities$: Observable<Item> = this.entityService.search({page_size: 100, name: term})
      .flatMap(
        (reply) => reply.value,
        (_, inner) => SearchService.applyType(inner, ResultType.EntityName))
      .finally(() => this.completedSubject.next());

    const entityLabel$: Observable<Item> = this.entityService.search(selector)
      .flatMap(
        (reply) => reply.value,
        (_, inner) => SearchService.applyType(inner, ResultType.EntityLabel))
      .finally(() => this.completedSubject.next());

    const seedLabel$: Observable<Item> = this.seedService.search(selector)
      .flatMap(reply =>
        Observable.forkJoin(reply.value.map(seed => this.entityService.get(seed.entity_id)))
          .finally(() => this.completedSubject.next())
          .flatMap(
            (entities) => entities,
            (_, inner) => SearchService.applyType(inner, ResultType.SeedLabel)));

    const seedEntities$: Observable<Item> = this.seedService.search({name: term})
      .flatMap(reply =>
        Observable.forkJoin(reply.value.map(seed => this.entityService.get(seed.entity_id)))
          .finally(() => this.completedSubject.next())
          .flatMap(
            (entities) => entities,
            (_, inner) => SearchService.applyType(inner, ResultType.SeedName)));

    return entities$
      .merge(entityLabel$)
      .merge(seedLabel$)
      .merge(seedEntities$);
  }
}
