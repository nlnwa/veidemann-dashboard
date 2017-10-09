import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/distinct';
import {EntityService} from '../entities/entity.service';
import {SeedService} from '../seeds/seeds.service';
import {Entity} from '../commons/models/config.model';

@Injectable()
export class SearchService {

  constructor(private entityService: EntityService,
              private seedService: SeedService) {
  }

  search(term: string): Observable<Entity> {
    const entities$ = this.entityService.search({page_size: 100, name: term})
      .map(reply => reply.value);

    const entityLabel$ = this.entityService.search({selector: {label: [{key: term}, {value: term}]}})
      .map(reply => reply.value);

    const seedLabel$ = this.seedService.search({selector: {label: [{key: term}, {value: term}]}})
      .map(reply => reply.value)
      .flatMap(seeds =>
        Observable.forkJoin(seeds.map(seed => this.entityService.get(seed.entity_id))));

    const seedEntities$ = this.seedService.search({name: term})
      .map(reply => reply.value)
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
