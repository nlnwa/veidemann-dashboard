import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {map, toArray} from 'rxjs/operators';
import {ConfigObject, Kind} from '../../../shared/models';
import {ConfigService} from '../../core/services/config.service';
import {ListRequest} from '../../../api/config/v1/config_pb';


export interface ConfigOptions {
  crawlJobs?: ConfigObject[];
}

@Injectable()
export class OptionsResolver implements Resolve<ConfigOptions> {


  constructor(private configService: ConfigService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ConfigOptions> | Promise<ConfigOptions> | ConfigOptions {
    const listRequest = new ListRequest();
    listRequest.setKind(Kind.CRAWLJOB.valueOf());
    return this.configService.list(listRequest).pipe(
      toArray(),
      map(crawlJobs => crawlJobs.sort((a, b) => a.meta.name.localeCompare(b.meta.name))),
      map(crawlJobs => ({crawlJobs}))
    );
  }

}
