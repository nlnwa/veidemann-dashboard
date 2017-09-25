import {Injectable} from '@angular/core';
import {Schedule} from './';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Schedules} from './schedule.model';

@Injectable()
export class ScheduleService {

  private scheduleUrl = `${environment.API_URL}/schedule`;

  constructor(private http: HttpClient) {

  }

  getSchedule(schedule_id): Observable<Schedule> {
    return this.http.get<Schedules>(`${this.scheduleUrl}/${schedule_id}`)
      .map(res => res.value[0]);
  }

  getAllSchedules(): Observable<Schedules> {
    return this.http.get<Schedules>(this.scheduleUrl);
  }

  createSchedule(newSchedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.scheduleUrl, newSchedule);
  }

  deleteSchedule(delScheduleId: String): Observable<String> {
    return this.http.delete(this.scheduleUrl + '/' + delScheduleId);
  }

  updateSchedule(putSchedule: Schedule): Observable<Schedule> {
    const putUrl = this.scheduleUrl + '/' + putSchedule.id;
    return this.http.put(putUrl, putSchedule);
  }
}
