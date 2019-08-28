import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ConfigObject, Kind} from '../../commons/models';
import {map, toArray} from 'rxjs/operators';
import {BackendService} from '../../core/services';
import {Observable} from 'rxjs';
import {createListRequest} from '../../configurations/services/data/data.service';

export interface ConfigOptions {
  crawlJobs: ConfigObject[];
}

@Injectable()
export class OptionsResolver implements Resolve<ConfigOptions> {

  constructor(private backendService: BackendService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ConfigOptions> | Promise<ConfigOptions> | ConfigOptions {
    return this.backendService.list(createListRequest(Kind.CRAWLJOB.valueOf())).pipe(
      map(configObject => ConfigObject.fromProto(configObject)),
      toArray(),
      map(crawlJobs => ({crawlJobs}))
      );
  }
}
