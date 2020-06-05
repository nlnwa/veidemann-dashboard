import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Kind, robotsPolicies, roles, rotationPolicies, subCollectionTypes, browserScriptTypes} from '../../../shared/models';
import {map, toArray} from 'rxjs/operators';
import {ConfigApiService} from '../../core/services';
import {combineLatest, Observable, of} from 'rxjs';
import {ConfigOptions} from '../containers';
import {ConfigPath} from '../func';
import {createListRequest} from '../func/query';


@Injectable()
export class OptionsResolver implements Resolve<ConfigOptions> {

  constructor(private backendService: ConfigApiService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ConfigOptions> | Promise<ConfigOptions> | ConfigOptions {
    const kind: Kind = ConfigPath[route.paramMap.get('kind')] || route.data.kind;

    switch (kind) {


      case Kind.CRAWLJOB:
        const crawlScheduleConfig$ = this.backendService.list(createListRequest(Kind.CRAWLSCHEDULECONFIG.valueOf())).pipe(
          toArray(),
        );

        const crawlConfig$ = this.backendService.list(createListRequest(Kind.CRAWLCONFIG.valueOf())).pipe(
          toArray(),
        );

        return combineLatest([crawlScheduleConfig$, crawlConfig$]).pipe(
          map(([crawlScheduleConfigs, crawlConfigs]) => ({crawlScheduleConfigs, crawlConfigs}))
        );

      case Kind.CRAWLCONFIG:
        const collection$ = this.backendService.list(createListRequest(Kind.COLLECTION.valueOf())).pipe(
          toArray(),
        );
        const browserConfig$ = this.backendService.list(createListRequest(Kind.BROWSERCONFIG.valueOf())).pipe(
          toArray(),
        );
        const politenessConfig$ = this.backendService.list(createListRequest(Kind.POLITENESSCONFIG.valueOf())).pipe(
          toArray(),
        );
        return combineLatest([collection$, browserConfig$, politenessConfig$]).pipe(
          map(([collections, browserConfigs, politenessConfigs]) => ({collections, browserConfigs, politenessConfigs})));

      case Kind.BROWSERCONFIG:
        return this.backendService.list(createListRequest(Kind.BROWSERSCRIPT.valueOf())).pipe(
          toArray(),
          map(browserScripts => ({browserScripts}))
        );

      case Kind.POLITENESSCONFIG:
        return {robotsPolicies};

      case Kind.COLLECTION:
        return {rotationPolicies, subCollectionTypes};

      case Kind.ROLEMAPPING:
        return {roles};

      case Kind.SEED:
        return this.backendService.list(createListRequest(Kind.CRAWLJOB.valueOf())).pipe(
          toArray(),
          map(crawlJobs => ({crawlJobs}))
        );

      case Kind.BROWSERSCRIPT:
        return {browserScriptTypes};

      default:
        return of({});
    }
  }

}
