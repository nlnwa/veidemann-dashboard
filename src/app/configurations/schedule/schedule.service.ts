import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../../commons/crud.service';
import {Schedule} from '../../commons/models/config.model';

@Injectable()
export class ScheduleService extends CrudService<Schedule> {

  static readonly URL: string = `${environment.apiGateway}/schedules`;

  constructor(protected http: HttpClient) {
    super(http, ScheduleService.URL);
  }
}
