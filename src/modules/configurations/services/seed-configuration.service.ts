import {Injectable} from '@angular/core';
import {NEVER} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ErrorService} from '../../core/services';
import {ConfigurationsService} from './configurations.service';
import {DataService} from './data';

@Injectable()
export class SeedConfigurationService extends ConfigurationsService {

  constructor(protected dataService: DataService,
              protected route: ActivatedRoute,
              protected errorService: ErrorService) {
    super(dataService, route, errorService);

    this.kind$ = NEVER;
    this.configObject$ = NEVER;
  }
}
