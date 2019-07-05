import {Injectable} from '@angular/core';
import {ConfigurationsService} from './configurations.service';
import {ActivatedRoute} from '@angular/router';
import {ErrorService} from '../../core/services';
import {PageEvent} from '@angular/material/paginator';
import {SearchDataService, SeedDataService} from './data';
import {map, mergeMap, share, tap} from 'rxjs/operators';
import {Kind} from '../../commons/models';
import {NEVER, of} from 'rxjs';

@Injectable()
export class SearchConfigurationService extends ConfigurationsService {

  constructor(protected searchDataService: SearchDataService,
              protected seedDataService: SeedDataService,
              protected route: ActivatedRoute,
              protected errorService: ErrorService) {
    super(searchDataService, route, errorService);


    this.kind$ = NEVER;

    // stream of id (when query parameter id changes)
    const queryParam$ = this.route.queryParamMap.pipe(
      map(queryParamMap => queryParamMap.get('id')),
    );

    this.configObject$ = queryParam$.pipe(
      mergeMap(id => id ? this.searchDataService.get({id, kind: Kind.CRAWLENTITY}) : of(null)),
      tap(entity => this.seedDataService.ref = entity ? {id: entity.id, kind: entity.kind} : null),
      share()
    );
  }

  search(term: string, pageEvent?: PageEvent) {
    return this.searchDataService.search(term, pageEvent);
  }
}
