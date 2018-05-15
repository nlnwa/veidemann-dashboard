import {Injectable} from '@angular/core';
import {from, merge, Observable, Subject} from 'rxjs';
import {bufferWhen, finalize, map, mergeMap, tap, first} from 'rxjs/operators';

import {EntityService} from '../entities';
import {SeedService} from '../seeds';
import {Item} from '../../commons/list';
import {ListReply} from '../../commons/models/controller.model';
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
  pageSize: number;
  pageIndex: number;
}

interface Pager extends PageQuery {
  length: number;
}

export interface SearchReply extends Pager {
  value: Item[];
}

export interface SearchQuery extends Pager {
  term: string;
}

const emptyPage = {length: 0, pageSize: 0, pageIndex: 0};

// flip page
const flipPager = (pager: Pager, reply: ListReply<any>) => {
  pager.length = parseInt(reply.count, 10) || 0;
};

const pagerToQuery = (pager: Pager) => ({
  page_size: pager.pageSize,
  page: pager.pageIndex,
});

// queries utilizing pager
const labelQuery = (term, pager) => ({label_selector: [term], ...pagerToQuery(pager)});
const nameQuery = (term, pager) => ({name: term, ...pagerToQuery(pager)});

@Injectable()
export class SearchService {

  private pager: Pager;
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

  search({term = '', length = 0, pageIndex = 0, pageSize = 0}: SearchQuery): Observable<SearchReply> {
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

    this.updatePagers(term, pageIndex, pageSize);

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
            : entityName$)
      .pipe(
        bufferWhen(() => searchCompleted$),
        first(),
        map((entities) => ({value: entities, ...this.combinePagers()})),
      );
  }

  private updatePagers(term, pageIndex: number, pageSize: number): void {
    this.enPager.pageSize =
      this.elPager.pageSize =
      this.slPager.pageSize =
      this.snPager.pageSize = pageSize;
    this.enPager.pageIndex = pageIndex;
  }

  private combinePagers(): Pager {
    return [this.enPager, this.elPager, this.snPager, this.slPager].reduce((acc, curr) => {
      acc.length += curr.length;
      // TODO
      return acc;
    }, {length: 0, pageIndex: 0, pageSize: 0});
  }
}
