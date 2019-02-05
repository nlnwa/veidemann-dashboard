// import {Injectable} from '@angular/core';
// import {from, merge, Observable, Subject} from 'rxjs';
// import {bufferWhen, finalize, map, mergeMap, tap, first} from 'rxjs/operators';
//
// import {EntityService} from '../entities';
// import {SeedService} from '../seeds';
// import {ListReply} from '../../commons/models/controller.model';
// import {Entity, Seed} from '../../commons/models/config.model';
//
//

import {merge, Observable, Subject} from 'rxjs';
import {ConfigObject, CrawlEntity, Kind, Label, Meta, Seed} from '../../commons/models';
import {FieldMask, ListRequest} from '../../../api/config/v1/config_pb';
import {BackendService} from '../shared/backend.service';
import {bufferWhen, finalize, first, map, mergeMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';


/* tslint:disable:no-bitwise */
export enum ResultType {
  EntityName = 1 << 0,
  EntityLabel = 1 << 1,
  SeedName = 1 << 2,
  SeedLabel = 1 << 3,
}

const applyType = (item: any, type: ResultType) => {
  item.type = type;
  return item;
};

const entityNameType = (item: any) => applyType(item, ResultType.EntityName);
const entityLabelType = (item: any) => applyType(item, ResultType.EntityLabel);
const seedNameType = (item: any) => applyType(item, ResultType.SeedName);
const seedLabelType = (item: any) => applyType(item, ResultType.SeedLabel);
//
//
interface PageQuery {
  pageSize: number;
  pageIndex: number;
}

interface Pager extends PageQuery {
  length?: number;
  value?: any;
}

export interface SearchReply extends Pager {
  value: ConfigObject[];
}

export interface SearchQuery extends Pager {
  term: string;
}

const emptyPage = {length: 0, pageSize: 0, pageIndex: 0};

// flip page
// const flipPager = (pager: Pager, reply: ListReply<any>) => {
//   pager.length = parseInt(reply.count, 10) || 0;
// };

const pagerToQuery = (pager: Pager) => ({
  page_size: pager.pageSize,
  page: pager.pageIndex,
});

// // queries utilizing pager
// const labelQuery = (term, pager) => ({label_selector: [term], ...pagerToQuery(pager)});
// const nameQuery = (term, pager) => ({name: term, ...pagerToQuery(pager)});

@Injectable()
export class SearchService {

  private pager: Pager;
  private enPager: Pager;
  private elPager: Pager;
  private snPager: Pager;
  private slPager: Pager;

//
  constructor(private backendService: BackendService) {


//     // initialize pagers with empty page
    this.enPager = {...emptyPage};
    this.elPager = {...emptyPage};
    this.snPager = {...emptyPage};
    this.slPager = {...emptyPage};
  }

  nameQuery(term: string, pager: Pager, kind: Kind): ListRequest {
    const listRequest = new ListRequest();
    listRequest.setKind(kind.valueOf());
    listRequest.setOffset(pager.pageIndex);
    listRequest.setPageSize(pager.pageSize);

    if (!term) {
      return listRequest;
    }
    listRequest.setNameRegex('.*' + term + '.*');

    return listRequest;
  }

  labelQuery(term: string, pager: Pager, kind: Kind) {
    const listRequest = new ListRequest();
    listRequest.setKind(kind.valueOf());
    listRequest.setOffset(pager.pageIndex);
    listRequest.setPageSize(pager.pageSize);

    listRequest.setLabelSelectorList(term.split(/\s+/).filter(_ => _));

    return listRequest;
  }


  search({term = '', pageIndex = 0, pageSize = 0}): any {
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

    this.updatePagers(pageIndex, pageSize);


    const entityName$: Observable<ConfigObject[]> = this.backendService.list(this.nameQuery(term, this.enPager, Kind.CRAWLENTITY))
      .pipe(
        map((reply) => reply.map(c => ConfigObject.fromProto(c)) || []),
        mergeMap((entities) => entities.map(entityNameType)),
        finalize(completed)
      );

    const entityLabel$: Observable<ConfigObject> = this.backendService.list(this.labelQuery(term, this.elPager, Kind.CRAWLENTITY))
      .pipe(
        map((reply) => reply.map(c => ConfigObject.fromProto(c)) || []),
        mergeMap((entities) => entities.map(entityLabelType)),
        finalize(completed)
      );

    const seedLabel$: Observable<ConfigObject> = this.backendService.list(this.labelQuery(term, this.slPager, Kind.SEED))
      .pipe(
        map((reply) => reply.map(c => ConfigObject.fromProto(c)) || []),
        mergeMap((seeds) => seeds.map(seedLabelType)),
        finalize(completed)
      );

    const seedName$: Observable<ConfigObject> = this.backendService.list(this.nameQuery(term, this.snPager, Kind.SEED))
      .pipe(
        //       tap((reply) => flipPager(this.snPager, reply)),
        map((reply) => reply.map(c => ConfigObject.fromProto(c)) || []),
        mergeMap((seeds) => seeds.map(seedNameType)),
        finalize(completed)
      );


//
//     const entityName$: Observable<Entity> = this.entityService.search(nameQuery(term, this.enPager))
//       .pipe(
//         tap((reply) => flipPager(this.enPager, reply)),
//         map((reply) => reply.value || []),
//         mergeMap((entities) => entities.map(entityNameType)),
//         finalize(completed)
//       );
//
//     const entityLabel$: Observable<Entity> = this.entityService.search(labelQuery(term, this.elPager))
//       .pipe(
//         tap((reply) => flipPager(this.elPager, reply)),
//         map((reply) => reply.value || []),
//         mergeMap((entities) => entities.map(entityLabelType)),
//         finalize(completed)
//       );
//
//     const seedLabel$: Observable<Entity> = this.seedService.search(labelQuery(term, this.slPager))
//       .pipe(
//         tap((reply) => flipPager(this.slPager, reply)),
//         map((reply) => reply.value || []),
//         mergeMap((seeds: Seed[]) => from(seeds).pipe(
//           mergeMap((seed: Seed) => this.entityService.get(seed.entity_id).pipe(map(seedLabelType)))
//         )),
//         finalize(completed)
//       );
//
//     const seedName$: Observable<Entity> = this.seedService.search(nameQuery(term, this.snPager))
//       .pipe(
//         tap((reply) => flipPager(this.snPager, reply)),
//         map((reply) => reply.value || []),
//         mergeMap((seeds: Seed[]) => from(seeds).pipe(
//           mergeMap((seed: Seed) => this.entityService.get(seed.entity_id).pipe(map(seedNameType)))
//         )),
//         finalize(completed)
//       );
//
    return (completeCount > 1
      ? merge(entityName$, entityLabel$, seedLabel$, seedName$)
      : entityName$)
      .pipe(
        bufferWhen(() => searchCompleted$),
        first(),
        map(entities => this.mergeSearchResult(entities)),
        map((entities) => this.combinePagers(entities)),
      );
  }

//
  private mergeSearchResult(items: any[]): any[] {
    const dataSet = new Set();
    return items.reduce((acc, curr) => {
      if (dataSet.has(curr.id)) {
        const index = acc.findIndex((item) => item.id === curr.id);
        // tslint:disable:no-bitwise
        acc[index].type |= (<any>curr).type;
      } else {
        dataSet.add(curr.id);
        acc.push(curr);
      }
      return acc;
    }, []);
  }

//
  private updatePagers(pageIndex: number, pageSize: number): void {
    this.enPager.pageSize =
      this.elPager.pageSize =
        this.slPager.pageSize =
          this.snPager.pageSize = pageSize;
    this.enPager.pageIndex = pageIndex;
  }

//
  private combinePagers(entities: any[]): any {
    const result: any = [this.enPager, this.elPager, this.snPager, this.slPager].reduce((acc, curr) => {
      acc.length += curr.length;
      // TODO
      return acc;
    }, {value: entities, length: 0, pageIndex: 0, pageSize: 0});
    return result;
  }
}
