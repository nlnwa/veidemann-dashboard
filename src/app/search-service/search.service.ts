import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/bufferCount'
import {EntityService} from '../entities/entity.service';
import {SeedService} from '../seeds/seeds.service';
import {Entity} from '../commons/models/config.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SearchService {

  private completedSubject = new Subject<any>();
  completed$ = this.completedSubject.asObservable().bufferCount(4);

  constructor(private entityService: EntityService,
              private seedService: SeedService) {
  }

  search(term: string): Observable<Entity> {
    const entities$ = this.entityService.search({page_size: 100, name: term})
      .map(reply => reply.value)
      .finally(() => this.completedSubject.next());

    const entityLabel$ = this.entityService.search({selector: {label: [{key: term}, {value: term}]}})
      .map(reply => reply.value)
      .finally(() => this.completedSubject.next());

    const seedLabel$ = this.seedService.search({selector: {label: [{key: term}, {value: term}]}})
      .map(reply => reply.value)
      .finally(() => this.completedSubject.next())
      .flatMap(seeds =>
        Observable.forkJoin(seeds.map(seed => this.entityService.get(seed.entity_id))));

    const seedEntities$ = this.seedService.search({name: term})
      .map(reply => reply.value)
      .finally(() => this.completedSubject.next())
      .flatMap(seeds =>
        Observable.forkJoin(seeds.map(seed => this.entityService.get(seed.entity_id))));

    return entities$
      .merge(entityLabel$)
      .merge(seedLabel$)
      .merge(seedEntities$)
      .flatMap(entities => entities)
      .distinct()
  }
}
