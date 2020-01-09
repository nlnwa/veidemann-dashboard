import {Injectable} from '@angular/core';
import {from, Observable, Subject} from 'rxjs';
import {count, distinctUntilChanged, finalize, map, mergeMap, scan} from 'rxjs/operators';

import {FieldMask, ListRequest, UpdateRequest} from '../../../api';
import {BrowserConfig, ConfigObject, ConfigRef, CrawlConfig, CrawlJob, Kind, Label, RoleMapping, Seed} from '../../commons/models';
import {createListRequest, labelQuery, nameQuery, pageListRequest, Query, withQueryTemplate, withSort} from '../func/query';
import {ConfigService} from '../../core/services';


@Injectable()
export class DataService {

  // The listRequest last used to fetch data
  private effectiveListRequest: ListRequest;

  private loading: Subject<boolean>;
  loading$: Observable<boolean>;

  constructor(private configService: ConfigService) {
    this.loading = new Subject<boolean>();
    this.loading$ = this.loading.pipe(
      map(isLoading => isLoading ? 1 : -1),
      scan((acc, curr) => acc + curr, 0),
      map(sem => sem > 0),
      distinctUntilChanged()
    );
  }

  get(configRef: ConfigRef): Observable<ConfigObject> {
    return this.load(this.configService.get(configRef));
  }

  search(query: Query): Observable<ConfigObject> {
    const listRequest = this.getListRequest(query);
    this.effectiveListRequest = listRequest;

    return this.load(this.configService.list(listRequest));
  }

  count(query: Query): Observable<number> {
    const listRequest = this.getListRequest(query);
    return this.configService.count(listRequest);
  }

  save(configObject: ConfigObject): Observable<ConfigObject> {
    return this.load(this.configService.save(configObject));
  }

  saveMultiple(configObjects: ConfigObject[]): Observable<number> {
    return this.load(from(configObjects).pipe(
      mergeMap(configObject => this.configService.save(configObject)),
      count()));
  }

  update(configObject: ConfigObject): Observable<ConfigObject> {
    return this.load(this.configService.save(configObject));
  }

  updateWithTemplate(updateTemplate: ConfigObject, paths: string[], ids: string[]): Observable<number> {
    let listRequest: ListRequest;

    if (ids.length > 0) {
      listRequest = createListRequest(updateTemplate.kind.valueOf());
      listRequest.setIdList(ids);
    } else {
      // use previous stored list request as basis
      // but set page size and offset to defaults because we want to update ALL requested objects
      listRequest = this.effectiveListRequest;
      listRequest.setPageSize(0);
      listRequest.setOffset(0);
    }

    const fieldMask = new FieldMask();
    fieldMask.setPathsList(paths);

    const updateRequest = new UpdateRequest();
    updateRequest.setListRequest(listRequest);
    updateRequest.setUpdateTemplate(ConfigObject.toProto(updateTemplate));
    updateRequest.setUpdateMask(fieldMask);

    return this.load(this.configService.update(updateRequest));
  }

  delete(configObject: ConfigObject): Observable<boolean> {
    return this.load(this.configService.delete(configObject));
  }

  deleteMultiple(configObjects: ConfigObject[]): Observable<number> {
    return this.load(from(configObjects).pipe(
      mergeMap((configObject) => this.configService.delete(configObject)),
      count(_ => _)
    ));
  }

  move(configObject: ConfigObject, entityRef: ConfigRef): Observable<number> {
    return this.load(this._move(configObject, entityRef));
  }

  moveMultiple(configObjects: ConfigObject[], entityRef: ConfigRef): Observable<number> {
    return this.load(from(configObjects).pipe(
      mergeMap(configObject => this._move(configObject, entityRef)),
      count(updated => !!updated)));
  }

  private _move(configObject: ConfigObject, entityRef: ConfigRef): Observable<number> {
    const refLabel = new Label({key: 'entityRef', value: configObject.seed.entityRef.id});
    const updateTemplate = new ConfigObject({kind: Kind.SEED});
    updateTemplate.meta.labelList = [refLabel];
    updateTemplate.seed.entityRef = entityRef;
    const pathList = ['seed.entityRef', 'meta.label+'];

    return this.updateWithTemplate(updateTemplate, pathList, [configObject.id]);
  }

  private getListRequest(query: Query): ListRequest {
    let listRequest = createListRequest(query.kind);

    pageListRequest(listRequest, {pageIndex: query.pageIndex, pageSize: query.pageSize});

    const queryTemplate = new ConfigObject();
    const fieldMask = new FieldMask();

    switch (query.kind) {
      case Kind.CRAWLJOB:
        queryTemplate.crawlJob = new CrawlJob();

        if (query.scheduleId) {
          fieldMask.addPaths('crawlJob.scheduleRef');
          queryTemplate.crawlJob.scheduleRef = new ConfigRef({id: query.scheduleId, kind: Kind.CRAWLSCHEDULECONFIG});
        }
        if (query.crawlConfigId) {
          fieldMask.addPaths('crawlJob.crawlConfigRef');
          queryTemplate.crawlJob.crawlConfigRef = new ConfigRef({id: query.crawlConfigId, kind: Kind.CRAWLCONFIG});
        }
        break;
      case Kind.CRAWLCONFIG:
        queryTemplate.crawlConfig = new CrawlConfig();

        if (query.collectionId) {
          fieldMask.addPaths('crawlConfig.collectionRef');
          queryTemplate.crawlConfig.collectionRef = new ConfigRef({id: query.collectionId, kind: Kind.COLLECTION});
        }
        if (query.browserConfigId) {
          fieldMask.addPaths('crawlConfig.browserConfigRef');
          queryTemplate.crawlConfig.browserConfigRef = new ConfigRef({id: query.browserConfigId, kind: Kind.BROWSERCONFIG});
        }
        if (query.politenessId) {
          fieldMask.addPaths('crawlConfig.politenessRef');
          queryTemplate.crawlConfig.politenessRef = new ConfigRef({id: query.politenessId, kind: Kind.POLITENESSCONFIG});
        }
        break;
      case Kind.BROWSERCONFIG:
        queryTemplate.browserConfig = new BrowserConfig();

        if (query.scriptIdList.length) {
          fieldMask.addPaths('browserConfig.scriptRef');
          queryTemplate.browserConfig.scriptRefList = query.scriptIdList.map(id => new ConfigRef({id, kind: Kind.BROWSERSCRIPT}));
        }
        break;
      case Kind.SEED:
        queryTemplate.seed = new Seed();

        if (query.entityId) {
          fieldMask.addPaths('seed.entityRef');
          queryTemplate.seed.entityRef = new ConfigRef({id: query.entityId, kind: Kind.CRAWLENTITY});
        }
        if (query.crawlJobIdList.length) {
          fieldMask.addPaths('seed.jobRef');
          queryTemplate.seed.jobRefList = query.crawlJobIdList.map(id => new ConfigRef({id, kind: Kind.CRAWLJOB}));
        }
        break;
      case Kind.ROLEMAPPING:
        if (query.term !== null) {
          queryTemplate.roleMapping = new RoleMapping();
          const name = query.term;

          // Search keywords
          // default (no keywords): roleMapping email
          // "group:" roleMapping group
          // "email:" roleMapping email
          if (name.startsWith('group:')) {
            const group = name.substring(name.indexOf(':') + 1);
            queryTemplate.roleMapping.group = group;
            fieldMask.addPaths('roleMapping.group');
          } else {
            let email = name;
            if (name.startsWith('email:')) {
              email = name.substring(name.indexOf(':') + 1);
            }
            queryTemplate.roleMapping.email = email;
            fieldMask.addPaths('roleMapping.email');
          }
        }
        break;
    }

    if (fieldMask.getPathsList().length > 0) {
      withQueryTemplate(listRequest, queryTemplate, fieldMask);
    }

    if (query.sort) {
      withSort(listRequest, query.sort);
    }

    if (query.term !== null && query.kind !== Kind.ROLEMAPPING) {
      const tokens = query.term.split(/\s+/);

      // Search defaults to match on meta.name but can be modified with search prefixes:
      //
      // "label:" label query see https://github.com/nlnwa/veidemann-api/blob/master/protobuf/config/v1/config.proto for further syntax
      // "name:"  name query (match on meta.name)
      //
      // E.g.:
      // label:a:b  - search for label "a:b"
      // a:b        - search for label "a:b" because it contains :
      // name:hello:babe - search for name "hello:babe"
      tokens.forEach(token => {
        if (token.startsWith('label:')) {
          const labelSelector = token.substring(token.indexOf(':') + 1);
          listRequest = labelQuery(listRequest, labelSelector);
        } else if (token.startsWith('name:')) {
          const name = token.substring(token.indexOf(':') + 1);
          listRequest = nameQuery(listRequest, name);
        } else if (token.includes(':')) {
          listRequest = labelQuery(listRequest, token);
        } else {
          listRequest = nameQuery(listRequest, token);
        }
      });
    }

    return listRequest;
  }

  private load<T>(observable: Observable<T>): Observable<T> {
    this.loading.next(true);
    return observable.pipe(finalize(() => this.loading.next(false)));
  }
}
