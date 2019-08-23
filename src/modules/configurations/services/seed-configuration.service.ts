import {Injectable} from '@angular/core';
import {NEVER, Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ErrorService} from '../../core/services';
import {ConfigurationsService} from './configurations.service';
import {SeedDataService} from './data';
import {ConfigObject} from '../../commons/models';
import {DataSource} from '@angular/cdk/table';

@Injectable()
export class SeedConfigurationService extends ConfigurationsService {

  constructor(protected dataService: SeedDataService,
              protected route: ActivatedRoute,
              protected errorService: ErrorService) {
    super(dataService, route, errorService);

    this.kind$ = NEVER;
    this.configObject$ = NEVER;
  }

  getDataSource(): DataSource<ConfigObject> {
    return this.dataService.dataSource;
  }

  move(configObject: ConfigObject): Observable<number> {
    return this.dataService.move(configObject);
  }

  moveMultiple(configObjects: ConfigObject[]): Observable<number> {
    return this.dataService.moveMultiple(configObjects);
  }

  reload() {
    this.dataService.reload();
  }
}
