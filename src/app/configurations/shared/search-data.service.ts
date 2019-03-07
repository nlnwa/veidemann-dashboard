import {Injectable} from '@angular/core';
import {ConfigObject, Kind} from '../../commons/models';
import {DataService, labelQuery, nameQuery, ofKind, paged, Pager, withIds} from './data.service';
import {BackendService} from './backend.service';
import {EMPTY, merge, Observable, race, Subject, timer} from 'rxjs';
import {map, mergeMap, takeUntil, tap} from 'rxjs/operators';
import {ConfigObjectProto} from '../../../api';
import {PageEvent} from '@angular/material';


/* tslint:disable:no-bitwise */
export enum ResultType {
  EntityName = 1 << 0,
  EntityLabel = 1 << 1,
  SeedName = 1 << 2,
  SeedLabel = 1 << 3,
}

export function isEntityName(item: ConfigObject): boolean {
  /* tslint:disable:no-bitwise */
  return ((<any>item).type & ResultType.EntityName) > 0;
}

export function isEntityLabel(item: ConfigObject): boolean {
  /* tslint:disable:no-bitwise */
  return ((<any>item).type & ResultType.EntityLabel) > 0;
}

export function isSeedName(item: ConfigObject): boolean {
  /* tslint:disable:no-bitwise */
  return ((<any>item).type & ResultType.SeedName) > 0;
}

export function isSeedLabel(item: ConfigObject): boolean {
  /* tslint:disable:no-bitwise */
  return ((<any>item).type & ResultType.SeedLabel) > 0;
}

const entityNameType = (item: any) => applyType(item, ResultType.EntityName);
const entityLabelType = (item: any) => applyType(item, ResultType.EntityLabel);
const seedNameType = (item: any) => applyType(item, ResultType.SeedName);
const seedLabelType = (item: any) => applyType(item, ResultType.SeedLabel);

const applyType = (item: any, type: ResultType) => {
  item.type |= type;

  return item;
};

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

  private cancel$ = new Subject<void>();

  constructor(protected backendService: BackendService) {
    super(backendService);
    this._kind = Kind.CRAWLENTITY;
  }

  protected add(configObject: ConfigObject) {
    if (this._data.value.some(c => c.id === configObject.id)) {
      const found = this.data.find(c => c.id === configObject.id);
      // tslint:disable:no-bitwise
      (<any>found).type |= (<any>configObject).type;
      super.replace(found);
    } else {
      super.add(configObject);
    }
  }

  protected onPage(pageEvent: PageEvent) {
    if (this.term === undefined) {
      this.search('').subscribe();
    } else if (this.data.length > ((pageEvent.pageIndex + 1) * pageEvent.pageSize)) {
      this._data.next(this.data);
    } else {
      this.search(this.term, pageEvent).subscribe();
    }
  }

  clear() {
    super.clear();
    this.enCount = 0;
    this.elCount = 0;
    this.snCount = 0;
    this.slCount = 0;
    this.enPager = {pageSize: this._paginator.pageSize, pageIndex: 0};
    this.elPager = {pageSize: this._paginator.pageSize, pageIndex: 0};
    this.snPager = {pageSize: this._paginator.pageSize, pageIndex: 0};
    this.slPager = {pageSize: this._paginator.pageSize, pageIndex: 0};
  }

  private getPagerPage() {
    return {pageIndex: this._paginator.pageIndex, pageSize: this._paginator.pageSize};
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

  destroy() {
    this.cancel$.next();
  }

  search(term: string, pageEvent?: PageEvent): Observable<ConfigObject> {
    const isNewTerm = this.term !== term;
    this.term = term;

    if (isNewTerm) {
      this.clear();
      this._paginator.pageIndex = 0;
      this.reset.emit();
    }

    this.updatePagers(pageEvent);
    const maxIndex = Math.max(this.enPager.pageIndex, this.elPager.pageIndex, this.snPager.pageIndex, this.slPager.pageIndex);

    const entityName$: Observable<ConfigObject> = this.backendService.list(nameQuery(paged(ofKind(Kind.CRAWLENTITY), this.enPager), term))
      .pipe(
        tap(() => this.enCount += 1),
        map((configObjectProto: ConfigObjectProto) => ConfigObject.fromProto(configObjectProto)),
        map(configObject => entityNameType(configObject)),
        map(configObject => typeTag(term, configObject))
      );

    const entityLabel$: Observable<ConfigObject> = this.backendService.list(labelQuery(paged(ofKind(Kind.CRAWLENTITY), this.elPager), term))
      .pipe(
        tap(() => this.elCount += 1),
        map((configObjectProto: ConfigObjectProto) => ConfigObject.fromProto(configObjectProto)),
        map(configObject => entityLabelType(configObject)),
        map(configObject => typeTag(term, configObject))
      );

    const seedLabel$: Observable<ConfigObject> = this.backendService.list(labelQuery(paged(ofKind(Kind.SEED), this.slPager), term))
      .pipe(
        tap(() => this.slCount += 1),
        map(seedProto => ConfigObject.fromProto(seedProto)),
        mergeMap(seed => this.backendService.list(withIds(ofKind(Kind.CRAWLENTITY), [seed.seed.entityRef.id])).pipe(
          map((configObjectProto: ConfigObjectProto) => ConfigObject.fromProto(configObjectProto)),
          map(configObject => seedLabelType(configObject)),
          map(configObject => typeTag(term, configObject, seed))
        ))
      );

    const seedName$: Observable<ConfigObject> = this.backendService.list(nameQuery(paged(ofKind(Kind.SEED), this.snPager), term))
      .pipe(
        tap(() => this.snCount += 1),
        map(seedProto => ConfigObject.fromProto(seedProto)),
        mergeMap((seed: ConfigObject) => this.backendService.list(withIds(ofKind(Kind.CRAWLENTITY), [seed.seed.entityRef.id])).pipe(
          map((configObjectProto: ConfigObjectProto) => ConfigObject.fromProto(configObjectProto)),
          map(configObject => seedNameType(configObject)),
          map(configObject => typeTag(term, configObject, seed))
        ))
      );

    this.cancel$.next();

    return (term.length > 0
      ? merge(
        maxIndex > this.enPager.pageIndex || (!isNewTerm && this.enCount === 0) ? EMPTY : entityName$,
        maxIndex > this.elPager.pageIndex || (!isNewTerm && this.elCount === 0) ? EMPTY : entityLabel$,
        maxIndex > this.slPager.pageIndex || (!isNewTerm && this.slCount === 0) ? EMPTY : seedLabel$,
        maxIndex > this.snPager.pageIndex || (!isNewTerm && this.snCount === 0) ? EMPTY : seedName$
      )
      : entityName$)
      .pipe(
        tap(configObject => this.add(configObject)),
        takeUntil(race(this.cancel$, timer(10000)))
      );
  }
}
