import {ErrorHandler, Injectable} from '@angular/core';
import {EMPTY, from, Observable} from 'rxjs';
import {catchError, count, filter, map, mergeMap, shareReplay} from 'rxjs/operators';

import {
  Annotation,
  BrowserConfig,
  ConfigObject,
  ConfigRef,
  CrawlConfig,
  CrawlJob,
  Kind,
  Label,
  LogLevels,
  RoleMapping,
  Seed
} from '../../../shared/models';
import {ConfigQuery, escapeRegex, handleError} from '../../../shared/func';
import {Getter, Searcher} from '../../../shared/directives';
import {GetScriptAnnotationsRequest, ListRequest, UpdateRequest} from '../../../api/config/v1/config_pb';
import {FieldMask} from '../../../api/commons/v1/resources_pb';
import {ConfigApiService} from './api/config-api.service';

@Injectable({providedIn: 'root'})
export class ConfigService
  implements Searcher<ConfigQuery, ConfigObject>, Getter<ConfigObject> {

  // TODO
  private readonly cache: Map<string, Observable<ConfigObject>>;

  // The listRequest last used to fetch data
  private effectiveListRequest: ListRequest;

  constructor(private configApiService: ConfigApiService,
              private errorHandler: ErrorHandler) {
    this.cache = new Map();
  }

  get(configRef: ConfigRef): Observable<ConfigObject> {
    return this.configApiService.get(ConfigRef.toProto(configRef)).pipe(
      map(ConfigObject.fromProto),
      handleError(this.errorHandler, undefined),
    );
  }

  search(query: ConfigQuery): Observable<ConfigObject> {
    const listRequest = this.getListRequest(query);
    this.effectiveListRequest = listRequest;

    return this.configApiService.list(listRequest).pipe(
      map(ConfigObject.fromProto),
      handleError(this.errorHandler, null));
  }

  list(listRequest: ListRequest): Observable<ConfigObject> {
    return from(this.configApiService.list(listRequest)).pipe(
      map(ConfigObject.fromProto),
      handleError(this.errorHandler, null));
  }

  count(query: ConfigQuery): Observable<number> {
    const listRequest = this.getListRequest(query);
    return this.configApiService.count(listRequest).pipe(
      handleError(this.errorHandler, 0),
    );
  }

  save(configObject: ConfigObject): Observable<ConfigObject> {
    return this.configApiService.save(ConfigObject.toProto(configObject)).pipe(
      map(ConfigObject.fromProto),
      handleError(this.errorHandler, null),
    );
  }

  saveMultiple(configObjects: ConfigObject[]): Observable<number> {
    return from(configObjects).pipe(
      mergeMap(configObject => this.configApiService.save(ConfigObject.toProto(configObject))),
      handleError(this.errorHandler, null),
      filter(_ => !!_), // don't count errors
      count());
  }

  update(configObject: ConfigObject): Observable<ConfigObject> {
    return this.configApiService.save(ConfigObject.toProto(configObject)).pipe(
      map(ConfigObject.fromProto),
      handleError(this.errorHandler, null),
    );
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

    return this.configApiService.update(updateRequest).pipe(
      handleError(this.errorHandler, 0),
    );
  }

  delete(configObject: ConfigObject): Observable<boolean> {
    return this.configApiService.delete(ConfigObject.toProto((configObject))).pipe(
      handleError(this.errorHandler, false),
    );
  }

  deleteMultiple(configObjects: ConfigObject[]): Observable<number> {
    return from(configObjects).pipe(
      mergeMap((configObject) => this.configApiService.delete(ConfigObject.toProto(configObject))),
      handleError(this.errorHandler, 0),
      filter(_ => _ > 0),
      count()
    );
  }

  move(configObject: ConfigObject, entityRef: ConfigRef): Observable<number> {
    const labels = [
      new Label({key: 'entityRef', value: configObject.seed.entityRef.id})
    ];
    const template = new ConfigObject({kind: Kind.SEED});
    template.meta.labelList = labels;
    template.seed.entityRef = entityRef;
    const paths = ['seed.entityRef', 'meta.label+'];

    return this.updateWithTemplate(template, paths, [configObject.id]);
  }

  moveMultiple(configObjects: ConfigObject[], entityRef: ConfigRef): Observable<number> {
    return from(configObjects).pipe(
      mergeMap(configObject => this.move(configObject, entityRef)),
      count(updated => !!updated));
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
        if (query.disabled !== null) {
          fieldMask.addPaths('crawlJob.disabled');
          queryTemplate.crawlJob.disabled = query.disabled;
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
        if (query.disabled !== null) {
          fieldMask.addPaths('seed.disabled');
          queryTemplate.seed.disabled = query.disabled;
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
            queryTemplate.roleMapping.group = name.substring(name.indexOf(':') + 1);
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

    if (query.direction && query.active) {
      listRequest.setOrderByPath('meta.' + query.active);
      listRequest.setOrderDescending(query.direction === 'desc');
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
          const regex = name.substring(name.indexOf(':') + 1);
          listRequest.setNameRegex(regex);
        } else if (name.startsWith('"') && name.endsWith('"')) {
          const exact = '^' + escapeRegex(name.substring(1, name.length - 1)) + '$';
          listRequest.setNameRegex(exact);
        } else if (query.kind === Kind.SEED) {
          if (name.startsWith('.')) {
            const subDomainSearch = '^(?:https?://)?.*' + escapeRegex(name) + '/?';
            listRequest.setNameRegex(subDomainSearch);
          } else {
            const commonSearch = '^(?:https?://)?(?:w{3}\.)?' + escapeRegex(name) + '/?';
            listRequest.setNameRegex(commonSearch);
          }
        } else {
          listRequest.setNameRegex(escapeRegex(name));
        }
      }
    }
    return listRequest;
  }

  getScriptAnnotations(jobId: string, seedId?: string): Observable<Annotation[]> {
    const request = new GetScriptAnnotationsRequest();
    if (jobId) {
      request.setJob(ConfigRef.toProto(new ConfigRef({kind: Kind.CRAWLJOB, id: jobId})));
    }
    if (seedId) {
      request.setSeed(ConfigRef.toProto(new ConfigRef({kind: Kind.SEED, id: seedId})));
    }
    return this.configApiService.getScriptAnnotations(request).pipe(
      map(list => list.map(Annotation.fromProto)),
      handleError(this.errorHandler, []),
    );
  }

  getLogConfig(): Observable<LogLevels> {
    return this.configApiService.getLogConfig().pipe(
      map(LogLevels.fromProto),
      handleError(this.errorHandler, [])
    );
  }

  saveLogConfig(logLevels: LogLevels): Observable<LogLevels> {
    return this.configApiService.saveLogConfig(LogLevels.toProto(logLevels)).pipe(
      map(LogLevels.fromProto)
    );
  }

  getJob(id: string): Observable<ConfigObject> {
    const configRef = new ConfigRef({id, kind: Kind.CRAWLJOB});
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }
    const job$: Observable<ConfigObject> = this.configApiService.get(ConfigRef.toProto(configRef)).pipe(
      // TODO fix pipe
      shareReplay(1),
      map(ConfigObject.fromProto),
      catchError(err => {
        this.cache.delete(id);
        return EMPTY;
      })
    );
    this.cache.set(id, job$);

    return job$;
  }

  getSeed(id: string): Observable<ConfigObject> {
    const configRef = new ConfigRef({id, kind: Kind.SEED});
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }
    const seed$ = this.configApiService.get(ConfigRef.toProto(configRef)).pipe(
      shareReplay(1),
      //TODO careful to clean up share replay and friends
      map(ConfigObject.fromProto),
      catchError(err => {
        this.cache.delete(id);
        return EMPTY;
      })
    );
    this.cache.set(id, seed$);

    return seed$;
  }
}
