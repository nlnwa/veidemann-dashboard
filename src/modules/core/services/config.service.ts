import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {count, mergeMap} from 'rxjs/operators';

import {FieldMask, ListRequest, UpdateRequest} from '../../../api';
import {
  BrowserConfig,
  ConfigObject,
  ConfigRef,
  CrawlConfig,
  CrawlJob,
  Kind,
  Label,
  RoleMapping,
  Seed
} from '../../../shared/models';
import {QueryService, Sort} from '../../commons/services/query.service';
import {ConfigApiService} from './index';

export interface ConfigQuery {
  kind: Kind;
  entityId: string;
  scheduleId: string;
  crawlConfigId: string;
  collectionId: string;
  browserConfigId: string;
  politenessId: string;
  crawlJobIdList: string[];
  scriptIdList: string[];
  term: string;
  sort: Sort;
  pageSize: number;
  pageIndex: number;
}

// this is a direct translation to code of the spec
// @see https://github.com/benjamingr/RegExp.escape
function escapeRegex(S) {
  // 1. let str be ToString(S).
  // 2. ReturnIfAbrupt(str).
  const str = String(S);
  // 3. Let cpList be a List containing in order the code
  // points as defined in 6.1.4 of str, starting at the first element of str.
  const cpList = Array.from(str[Symbol.iterator]());
  // 4. let cuList be a new List
  const cuList = [];
  // 5. For each code point c in cpList in List order, do:
  for (const c of cpList) {
    // i. If c is a SyntaxCharacter then do:
    if ('^$\\.*+?()[]{}|'.indexOf(c) !== -1) {
      // a. Append "\" to cuList.
      cuList.push('\\');
    }
    // Append c to cpList.
    cuList.push(c);
  }
  // 6. Let L be a String whose elements are, in order, the elements of cuList.
  const L = cuList.join('');
  // 7. Return L.
  return L;
}

@Injectable()
export class ConfigService extends QueryService {

  // The listRequest last used to fetch data
  private effectiveListRequest: ListRequest;

  private cache: Map<string, string>;

  constructor(private configApiService: ConfigApiService) {
    super();
  }

  get(configRef: ConfigRef): Observable<ConfigObject> {
    return this.load(this.configApiService.get(configRef));
  }

  search(query: ConfigQuery): Observable<ConfigObject> {
    const listRequest = this.getListRequest(query);
    this.effectiveListRequest = listRequest;

    return this.load(this.configApiService.list(listRequest));
  }

  count(query: ConfigQuery): Observable<number> {
    const listRequest = this.getListRequest(query);
    return this.configApiService.count(listRequest);
  }

  save(configObject: ConfigObject): Observable<ConfigObject> {
    return this.load(this.configApiService.save(configObject));
  }

  saveMultiple(configObjects: ConfigObject[]): Observable<number> {
    return this.load(from(configObjects).pipe(
      mergeMap(configObject => this.configApiService.save(configObject)),
      count()));
  }

  update(configObject: ConfigObject): Observable<ConfigObject> {
    return this.load(this.configApiService.save(configObject));
  }

  updateWithTemplate(updateTemplate: ConfigObject, paths: string[], ids: string[]): Observable<number> {
    let listRequest: ListRequest;

    if (ids.length > 0) {
      listRequest = new ListRequest();
      listRequest.setKind(updateTemplate.kind.valueOf());
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

    return this.load(this.configApiService.update(updateRequest));
  }

  delete(configObject: ConfigObject): Observable<boolean> {
    return this.load(this.configApiService.delete(configObject));
  }

  deleteMultiple(configObjects: ConfigObject[]): Observable<number> {
    return this.load(from(configObjects).pipe(
      mergeMap((configObject) => this.configApiService.delete(configObject)),
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

  private getListRequest(query: ConfigQuery): ListRequest {
    const listRequest = new ListRequest();
    listRequest.setKind(query.kind.valueOf());

    listRequest.setOffset(query.pageIndex * query.pageSize);
    listRequest.setPageSize(query.pageSize);

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
          queryTemplate.crawlConfig.browserConfigRef = new ConfigRef({
            id: query.browserConfigId,
            kind: Kind.BROWSERCONFIG
          });
        }
        if (query.politenessId) {
          fieldMask.addPaths('crawlConfig.politenessRef');
          queryTemplate.crawlConfig.politenessRef = new ConfigRef({
            id: query.politenessId,
            kind: Kind.POLITENESSCONFIG
          });
        }
        break;
      case Kind.BROWSERCONFIG:
        queryTemplate.browserConfig = new BrowserConfig();

        if (query.scriptIdList.length) {
          fieldMask.addPaths('browserConfig.scriptRef');
          queryTemplate.browserConfig.scriptRefList = query.scriptIdList.map(id => new ConfigRef({
            id,
            kind: Kind.BROWSERSCRIPT
          }));
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
      listRequest.setQueryTemplate(ConfigObject.toProto(queryTemplate));
      listRequest.setQueryMask(fieldMask);
    }

    if (query.sort) {
      listRequest.setOrderByPath('meta.' + query.sort.active);
      listRequest.setOrderDescending(query.sort.direction === 'desc');
    }

    if (query.term !== null && query.kind !== Kind.ROLEMAPPING) {
      const parts = query.term.split('label:');

      const label = (parts[1] || '').trim();
      const name = parts[0].trim();

      if (label) {
        listRequest.setLabelSelectorList([label]);
      }

      if (name) {
        if (name.startsWith('regex:')) {
          const regex = name.substring(name.indexOf(':') + 1)
          listRequest.setNameRegex(regex);
        } else if (name.startsWith('"') && name.endsWith('"')) {
          const exact = '^' + escapeRegex(name.substring(1, name.length - 1)) + '$';
          listRequest.setNameRegex(exact);
        } else if (name.startsWith('.')) {
          const subDomainSearch = '^(?:https?://)?.*' + escapeRegex(name) + '/?';
          listRequest.setNameRegex(subDomainSearch);
        } else {
          const commonSearch = '^(?:https?://)?(?:w{3}\.)?' + escapeRegex(name) + '/?';
          listRequest.setNameRegex(commonSearch);
        }
      }
    }
    return listRequest;
  }
}
