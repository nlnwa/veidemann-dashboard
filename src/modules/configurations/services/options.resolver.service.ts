import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ConfigObject, Kind} from '../../commons/models';
import {map, toArray} from 'rxjs/operators';
import {BackendService} from '../../core/services';
import {pathToKind} from '../func/kind';
import {combineLatest, Observable} from 'rxjs';
import {ofKind} from './data.service';
import {RobotsPolicy} from '../../commons/models/configs/politenessconfig.model';
import {RotationPolicy} from '../../commons/models/configs/collection.model';
import {SubCollectionType} from '../../commons/models/configs/subcollection.model';
import {Role} from '../../commons/models/configs/rolemapping.model';

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
          map(([crawlScheduleConfigs, crawlConfigs]) => ({crawlScheduleConfigs, crawlConfigs}))
        );

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

      case Kind.POLITENESSCONFIG:
        return {
          robotsPolicies: [
            RobotsPolicy.OBEY_ROBOTS,
            RobotsPolicy.IGNORE_ROBOTS,
            RobotsPolicy.CUSTOM_ROBOTS,
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

      default:
        return {};
    }
  }

}
