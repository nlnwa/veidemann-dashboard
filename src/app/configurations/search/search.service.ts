import {Injectable} from '@angular/core';
import {from, merge, Observable, Subject} from 'rxjs';
import {bufferWhen, finalize, map, mergeMap, tap} from 'rxjs/operators';

import {EntityService} from '../entities';
import {SeedService} from '../seeds';
import {Item} from '../../commons/list';
import {Seed} from '../../commons/models/config.model';


/* tslint:disable:no-bitwise */
export enum ResultType {
  EntityName = 1 << 0,
  EntityLabel = 1 << 1,
  SeedName = 1 << 2,
  SeedLabel = 1 << 3,
}

const applyType = (item: any, type) => {
  item.type = type;
  return item;
};

const entityNameType = (item: any) => applyType(item, ResultType.EntityName);
const entityLabelType = (item: any) => applyType(item, ResultType.EntityLabel);
const seedNameType = (item: any) => applyType(item, ResultType.SeedName);
const seedLabelType = (item: any) => applyType(item, ResultType.SeedLabel);

interface PageQuery {
  page_size: number;
  page: number;
}

interface Pager extends PageQuery {
  count: number;
}


const page_size = 20;
const emptyPage = {count: 0, page_size, page: 0};

// flip page
const flipPager = (pager: Pager, reply: any) => {
  return {...emptyPage};
};

// queries utilizing pager
const labelQuery = (term, pager) => ({label_selector: [term], ...(pager as PageQuery)});
const nameQuery = (term, pager) => ({name: term, ...(pager as PageQuery)});

@Injectable()
export class SearchService {

  private enPager: Pager;
  private elPager: Pager;
  private snPager: Pager;
  private slPager: Pager;

  constructor(private entityService: EntityService,
              private seedService: SeedService) {
    // initialize pagers with empty page
    this.enPager = {...emptyPage};
    this.elPager = {...emptyPage};
    this.snPager = {...emptyPage};
    this.slPager = {...emptyPage};
  }

  search(term: string): Observable<Item[]> {
    const completeCount = term ? 4 : 1;
    const complete = new Subject<void>();
    const searchCompleted$ = complete.asObservable();

    let count = completeCount;
    const completed = () => {
      count--;
      if (count === 0) {
        complete.next();
      }
    };

    const entityName$: Observable<Item> = this.entityService.search(nameQuery(term, this.enPager))
      .pipe(
        tap((reply) => flipPager(this.enPager, reply)),
        map((reply) => reply.value || []),
        mergeMap((entities) => entities.map(entityNameType)),
        finalize(completed)
      );

    const entityLabel$: Observable<Item> = this.entityService.search(labelQuery(term, this.elPager))
      .pipe(
        tap((reply) => flipPager(this.elPager, reply)),
        map((reply) => reply.value || []),
        mergeMap((entities) => entities.map(entityLabelType)),
        finalize(completed)
      );

    const seedLabel$: Observable<Item> = this.seedService.search(labelQuery(term, this.slPager))
      .pipe(
        tap((reply) => flipPager(this.slPager, reply)),
        map((reply) => reply.value || []),
        mergeMap((seeds: Seed[]) => from(seeds).pipe(
          mergeMap((seed: Seed) => this.entityService.get(seed.entity_id).pipe(map(seedLabelType)))
        )),
        finalize(completed)
      );

    const seedName$: Observable<Item> = this.seedService.search(nameQuery(term, this.snPager))
      .pipe(
        tap((reply) => flipPager(this.snPager, reply)),
        map((reply) => reply.value || []),
        mergeMap((seeds: Seed[]) => from(seeds).pipe(
          mergeMap((seed: Seed) => this.entityService.get(seed.entity_id).pipe(map(seedNameType)))
        )),
        finalize(completed)
      );

    return (completeCount > 1
      ? merge(entityName$, entityLabel$, seedLabel$, seedName$)
      : entityName$).pipe(
      // distinct((entity) => entity.id),
      bufferWhen(() => searchCompleted$)
    );
  }
}
