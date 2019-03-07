import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Kind} from '../commons/models';

@Injectable()
export class KindResolver implements Resolve<Kind> {

  readonly pathToKind = {
    crawljobs: Kind.CRAWLJOB,
    schedule: Kind.CRAWLSCHEDULECONFIG,
    crawlconfig: Kind.CRAWLCONFIG,
    crawlhostgroupconfig: Kind.CRAWLHOSTGROUPCONFIG,
    browserconfig: Kind.BROWSERCONFIG,
    browserscript: Kind.BROWSERSCRIPT,
    politenessconfig: Kind.POLITENESSCONFIG,
    rolemapping: Kind.ROLEMAPPING,
    collection: Kind.COLLECTION,
    entity: Kind.CRAWLENTITY,
    seed: Kind.SEED,
  };

  constructor() {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.pathToKind[route.paramMap.get('kind')];
  }
}
