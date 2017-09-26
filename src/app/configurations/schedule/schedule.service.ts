import {Injectable} from '@angular/core';
import {Schedule} from './';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../../commons/crud.service';

@Injectable()
export class ScheduleService extends CrudService<Schedule> {

  static readonly URL: string = `${environment.API_URL}/schedule`;

  constructor(protected http: HttpClient) {
    super(http, ScheduleService.URL);
  }
}
