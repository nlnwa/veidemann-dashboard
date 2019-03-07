import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ConfigObject, Kind} from '../commons/models';
import {map, toArray} from 'rxjs/operators';
import {BackendService} from './shared/backend.service';
import {pathToKind} from '../commons/func/kind';
import {combineLatest, Observable} from 'rxjs';
import {ofKind} from './shared/data.service';

@Injectable()
export class OptionsResolver implements Resolve<any> {


  constructor(private backendService: BackendService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const kind: Kind = pathToKind(route.paramMap.get('kind')) || route.data.kind;

    switch (kind) {
      case Kind.SEED:
      case Kind.CRAWLENTITY:
        return this.backendService.list(ofKind(Kind.CRAWLJOB.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
          map(crawlJobs => ({crawlJobs}))
        );

      case Kind.CRAWLJOB:
        const crawlScheduleConfig$ = this.backendService.list(ofKind(Kind.CRAWLSCHEDULECONFIG.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
        );

        const crawlConfig$ = this.backendService.list(ofKind(Kind.CRAWLCONFIG.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
        );

        return combineLatest(crawlScheduleConfig$, crawlConfig$).pipe(
          map(([crawlScheduleConfigs, crawlConfigs]) => ({crawlScheduleConfigs, crawlConfigs})));

      case Kind.CRAWLCONFIG:
        const collection$ = this.backendService.list(ofKind(Kind.COLLECTION.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
        );
        const browserConfig$ = this.backendService.list(ofKind(Kind.BROWSERCONFIG.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
        );
        const politenessConfig$ = this.backendService.list(ofKind(Kind.POLITENESSCONFIG.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
        );
        return combineLatest(collection$, browserConfig$, politenessConfig$).pipe(
          map(([collections, browserConfigs, politenessConfigs]) => ({collections, browserConfigs, politenessConfigs})));

      case Kind.BROWSERCONFIG:
        return this.backendService.list(ofKind(Kind.BROWSERSCRIPT.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
          map(browserScripts => ({browserScripts}))
        );

      default:
        return {};
    }
  }

}
