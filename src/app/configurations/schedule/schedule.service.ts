import {Injectable} from '@angular/core';
import {ErrorHandlerService} from '../../commons/';
import {Http} from '@angular/http';
import {Schedule} from './';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ScheduleService {

  private scheduleUrl = `${environment.API_URL}/schedule`;

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {

  }

  getSchedule(schedule_id) {
    return this.http.get(`${this.scheduleUrl}/${schedule_id}`)
      .map(res => res.json().value);
  }

  getAllSchedules() {
    return this.http.get(this.scheduleUrl)
      .map(res => res.json());
  }

  createSchedule(newSchedule: Schedule): Observable<Schedule> {
    return this.http.post(this.scheduleUrl, newSchedule)
      .map(response => response.json() as Schedule)
      .catch(this.errorhandlerservice.handleError);
  }

  deleteSchedule(delScheduleId: String): Observable<String> {
    return this.http.delete(this.scheduleUrl + '/' + delScheduleId)
      .map(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }

  updateSchedule(putSchedule: Schedule): Observable<Schedule> {
    const putUrl = this.scheduleUrl + '/' + putSchedule.id;
    return this.http.put(putUrl, putSchedule)
      .map(response => response.json() as Schedule)
      .catch(this.errorhandlerservice.handleError);
  }
}
