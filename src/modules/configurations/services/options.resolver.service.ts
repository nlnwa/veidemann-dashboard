import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ConfigObject, Kind, RobotsPolicy, Role, RotationPolicy, SubCollectionType} from '../../commons/models';
import {map, toArray} from 'rxjs/operators';
import {BackendService} from '../../core/services';
import {pathToKind} from '../func/kind';
import {combineLatest, Observable, of} from 'rxjs';
import {createListRequest} from './data/data.service';
import {ConfigOptions} from '../containers/configurations/configurations.component';

@Injectable()
export class OptionsResolver implements Resolve<ConfigOptions> {


  constructor(private backendService: BackendService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ConfigOptions> | Promise<ConfigOptions> | ConfigOptions {
    const kind: Kind = pathToKind(route.paramMap.get('kind')) || route.data.kind;

    switch (kind) {


      case Kind.CRAWLJOB:
        const crawlScheduleConfig$ = this.backendService.list(createListRequest(Kind.CRAWLSCHEDULECONFIG.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
        );

        const crawlConfig$ = this.backendService.list(createListRequest(Kind.CRAWLCONFIG.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
        );

        return combineLatest([crawlScheduleConfig$, crawlConfig$]).pipe(
          map(([crawlScheduleConfigs, crawlConfigs]) => ({crawlScheduleConfigs, crawlConfigs}))
        );

      case Kind.CRAWLCONFIG:
        const collection$ = this.backendService.list(createListRequest(Kind.COLLECTION.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
        );
        const browserConfig$ = this.backendService.list(createListRequest(Kind.BROWSERCONFIG.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
        );
        const politenessConfig$ = this.backendService.list(createListRequest(Kind.POLITENESSCONFIG.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
        );
        return combineLatest([collection$, browserConfig$, politenessConfig$]).pipe(
          map(([collections, browserConfigs, politenessConfigs]) => ({collections, browserConfigs, politenessConfigs})));

      case Kind.BROWSERCONFIG:
        return this.backendService.list(createListRequest(Kind.BROWSERSCRIPT.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
          map(browserScripts => ({browserScripts}))
        );

      case Kind.POLITENESSCONFIG:
        return {
          robotsPolicies: [
            RobotsPolicy.OBEY_ROBOTS,
            RobotsPolicy.IGNORE_ROBOTS,
            RobotsPolicy.CUSTOM_ROBOTS,
            RobotsPolicy.OBEY_ROBOTS_CLASSIC,
            RobotsPolicy.CUSTOM_ROBOTS_CLASSIC,
            RobotsPolicy.CUSTOM_IF_MISSING,
            RobotsPolicy.CUSTOM_IF_MISSING_CLASSIC
          ]
        };

      case Kind.COLLECTION:
        return {
          rotationPolicies: [
            RotationPolicy.NONE,
            RotationPolicy.HOURLY,
            RotationPolicy.DAILY,
            RotationPolicy.MONTHLY,
            RotationPolicy.YEARLY,
          ],
          subCollectionTypes: [
            SubCollectionType.UNDEFINED,
            SubCollectionType.DNS,
            SubCollectionType.SCREENSHOT,
          ]
        };

      case Kind.ROLEMAPPING:
        return {
          roles: [
            Role.ANY_USER,
            Role.ANY,
            Role.ADMIN,
            Role.CURATOR,
            Role.READONLY,
            Role.OPERATOR,
          ]
        };

      case Kind.SEED:
      case Kind.CRAWLENTITY:
        return this.backendService.list(createListRequest(Kind.CRAWLJOB.valueOf())).pipe(
          map(configObject => ConfigObject.fromProto(configObject)),
          toArray(),
          map(crawlJobs => ({crawlJobs}))
        );

      default:
        return of(null);
    }
  }

}
