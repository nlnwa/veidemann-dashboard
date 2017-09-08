import {Injectable} from "@angular/core";
import {ErrorHandlerService} from "../../commons/";
import {Http} from "@angular/http";
import {Schedule} from "./";
import {environment} from '../../../environments/environment';

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

  createSchedule(newSchedule: Schedule): Promise<Schedule> {
    return this.http.post(this.scheduleUrl, newSchedule)
      .toPromise()
      .then(response => response.json() as Schedule)
      .catch(this.errorhandlerservice.handleError);
  }

  deleteSchedule(delScheduleId: String): Promise<String> {
    return this.http.delete(this.scheduleUrl + '/' + delScheduleId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }

  updateSchedule(putSchedule: Schedule): Promise<Schedule> {
    const putUrl = this.scheduleUrl + '/' + putSchedule.id;
    return this.http.put(putUrl, putSchedule)
      .toPromise()
      .then(response => response.json() as Schedule)
      .catch(this.errorhandlerservice.handleError);
  }
}
