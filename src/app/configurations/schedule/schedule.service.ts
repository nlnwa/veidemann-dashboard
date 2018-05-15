import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../shared/crud.service';
import {CrawlScheduleConfig} from '../../commons/models/config.model';

@Injectable()
export class ScheduleService extends CrudService<CrawlScheduleConfig> {

  protected readonly url: string = `${environment.apiGateway}/control/crawlscheduleconfigs`;

  constructor(protected http: HttpClient) {
    super(http);
  }
}
