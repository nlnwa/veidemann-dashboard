import {Injectable} from '@angular/core';
import {ConfigObject, Kind} from '../../../commons/models';
import {createListRequest, DataService, labelQuery, nameQuery, pageListRequest, Pager, withIds} from './data.service';
import {BackendService} from '../../../core/services';
import {EMPTY, merge, Observable, race, timer} from 'rxjs';
import {finalize, map, mergeMap, takeUntil, tap} from 'rxjs/operators';
import {ConfigObjectProto} from '../../../../api';
import {PageEvent} from '@angular/material/paginator';


/* tslint:disable:no-bitwise */
export enum ResultType {
  EntityName = 1 << 0,
  EntityLabel = 1 << 1,
  SeedName = 1 << 2,
  SeedLabel = 1 << 3,
}

export function isEntityName(item: ConfigObject): boolean {
  /* tslint:disable:no-bitwise */
  return ((item as any).type & ResultType.EntityName) > 0;
}

export function isEntityLabel(item: ConfigObject): boolean {
  /* tslint:disable:no-bitwise */
  return ((item as any).type & ResultType.EntityLabel) > 0;
}

export function isSeedName(item: ConfigObject): boolean {
  /* tslint:disable:no-bitwise */
  return ((item as any).type & ResultType.SeedName) > 0;
}

export function isSeedLabel(item: ConfigObject): boolean {
  /* tslint:disable:no-bitwise */
  return ((item as any).type & ResultType.SeedLabel) > 0;
}

const applyType = (item: any, type: ResultType) => {
  item.type |= type;

  return item;
};

const entityNameType = (item: any) => applyType(item, ResultType.EntityName);
const entityLabelType = (item: any) => applyType(item, ResultType.EntityLabel);
const seedNameType = (item: any) => applyType(item, ResultType.SeedName);
const seedLabelType = (item: any) => applyType(item, ResultType.SeedLabel);

function typeTag(term: string, entity: ConfigObject, seed?: ConfigObject) {
  if (!term) {
    return entity;
  }
  const regexp = '.*' + term + '.*';
  if (entity.meta.name.match(regexp) !== null) {
    entityNameType(entity);
  }
  if (entity.meta.labelList.some(label => (label.key + ':' + label.value).match(regexp) !== null)) {
    entityLabelType(entity);
  }
  if (seed) {
    if (isSeedName(entity)) {
      if (seed.meta.labelList.some(label => (label.key + ':' + label.value).match(regexp) != null)) {
        seedLabelType(entity);
      }
    } else {
      if (seed.meta.name.match(regexp) != null) {
        seedNameType(entity);
      }
    }
  }
  return entity;
}

@Injectable()
export class SearchDataService extends DataService {

  private term: string;

  private enCount = 0;
  private elCount = 0;
  private snCount = 0;
  private slCount = 0;

  private enPager: Pager = {pageSize: 5, pageIndex: 0};
  private elPager: Pager = {pageSize: 5, pageIndex: 0};
  private snPager: Pager = {pageSize: 5, pageIndex: 0};
  private slPager: Pager = {pageSize: 5, pageIndex: 0};

  protected isCountable = false;

  constructor(protected backendService: BackendService) {
    super(backendService);
    this._kind = Kind.CRAWLENTITY;
  }

  reset() {
    const pageSize = this._paginator ? this._paginator.pageSize : 0;
    const pageIndex = 0;

    this.enCount = 0;
    this.elCount = 0;
    this.snCount = 0;
    this.slCount = 0;
    this.enPager = {pageSize, pageIndex};
    this.elPager = {pageSize, pageIndex};
    this.snPager = {pageSize, pageIndex};
    this.slPager = {pageSize, pageIndex};
    super.reset();
  }

  search(term: string, pageEvent?: PageEvent): Observable<ConfigObject> {
    const isNewTerm = this.term !== term;
    this.term = term;
    let labelSearch = false;
    let seedSearch = false;

    if (term.startsWith('http') || term.startsWith('url:')) {
      seedSearch = true;
      if (term.startsWith('url:')) {
        term = term.replace('url:', '');
      }
    } else if (term.indexOf(':') !== -1) {
      labelSearch = true;
    }

    if (isNewTerm) {
      this.reset();
    }

    this.updatePagers(pageEvent);
    const maxIndex = Math.max(this.enPager.pageIndex, this.elPager.pageIndex, this.snPager.pageIndex, this.slPager.pageIndex);

    const entityName$: Observable<ConfigObject> = this.backendService.list(
      nameQuery(pageListRequest(createListRequest(Kind.CRAWLENTITY), this.enPager), term))
      .pipe(
        tap(() => this.enCount += 1),
        map((configObjectProto: ConfigObjectProto) => ConfigObject.fromProto(configObjectProto)),
        map(configObject => entityNameType(configObject)),
        map(configObject => typeTag(term, configObject))
      );

    const entityLabel$: Observable<ConfigObject> = this.backendService.list(
      labelQuery(pageListRequest(createListRequest(Kind.CRAWLENTITY), this.elPager), term))
      .pipe(
        tap(() => this.elCount += 1),
        map((configObjectProto: ConfigObjectProto) => ConfigObject.fromProto(configObjectProto)),
        map(configObject => entityLabelType(configObject)),
        map(configObject => typeTag(term, configObject))
      );

    const seedLabel$: Observable<ConfigObject> = this.backendService.list(
      labelQuery(pageListRequest(createListRequest(Kind.SEED), this.slPager), term))
      .pipe(
        tap(() => this.slCount += 1),
        map(seedProto => ConfigObject.fromProto(seedProto)),
        mergeMap(seed => this.backendService.list(withIds(createListRequest(Kind.CRAWLENTITY), [seed.seed.entityRef.id])).pipe(
          map((configObjectProto: ConfigObjectProto) => ConfigObject.fromProto(configObjectProto)),
          map(configObject => seedLabelType(configObject)),
          map(configObject => typeTag(term, configObject, seed))
        ))
      );

    const seedName$: Observable<ConfigObject> = this.backendService.list(
      nameQuery(pageListRequest(createListRequest(Kind.SEED), this.snPager), term))
      .pipe(
        tap(() => this.snCount += 1),
        map(seedProto => ConfigObject.fromProto(seedProto)),
        mergeMap((seed: ConfigObject) => this.backendService.list(
          withIds(createListRequest(Kind.CRAWLENTITY), [seed.seed.entityRef.id])).pipe(
          map((configObjectProto: ConfigObjectProto) => ConfigObject.fromProto(configObjectProto)),
          map(configObject => seedNameType(configObject)),
          map(configObject => typeTag(term, configObject, seed))
        ))
      );

    this.loading.next(true);
    return (term.length > 0
      ? merge(
        maxIndex > this.enPager.pageIndex || (!isNewTerm && this.enCount === 0) || labelSearch || seedSearch ? EMPTY : entityName$,
        maxIndex > this.elPager.pageIndex || (!isNewTerm && this.elCount === 0) || seedSearch ? EMPTY : entityLabel$,
        maxIndex > this.slPager.pageIndex || (!isNewTerm && this.slCount === 0) || seedSearch ? EMPTY : seedLabel$,
        maxIndex > this.snPager.pageIndex || (!isNewTerm && this.snCount === 0) || labelSearch ? EMPTY : seedName$
      )
      : entityName$)
      .pipe(
        tap(configObject => this.add(configObject)),
        takeUntil(race(this.ngUnsubscribe, timer(10000))),
        finalize(() => this.loading.next(false))
      );
  }

  protected add(configObject: ConfigObject) {
    const found = this.data.find(c => c.id === configObject.id);
    if (found) {
      // tslint:disable:no-bitwise
      (found as any).type |= (configObject as any).type;
      super.replace(found);
    } else {
      super.add(configObject);
    }
  }

  protected fetchPage(page: PageEvent): Observable<ConfigObject> {
    return this.search(this.term || '', page)
      .pipe(finalize(() => this.pageLength = this.data.length > 0 ? this.data.length + 1 : 0));
  }

  private updatePagers(pageEvent: PageEvent) {
    if (pageEvent) {
      this.enPager = {pageSize: pageEvent.pageSize, pageIndex: this.enCount / pageEvent.pageSize};
      this.elPager = {pageSize: pageEvent.pageSize, pageIndex: this.elCount / pageEvent.pageSize};
      this.snPager = {pageSize: pageEvent.pageSize, pageIndex: this.snCount / pageEvent.pageSize};
      this.slPager = {pageSize: pageEvent.pageSize, pageIndex: this.slCount / pageEvent.pageSize};
    } else {
      this.enPager = this.getPagerPage();
      this.elPager = this.getPagerPage();
      this.snPager = this.getPagerPage();
      this.slPager = this.getPagerPage();
    }
  }
}
