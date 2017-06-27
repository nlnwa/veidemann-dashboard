import {Injectable} from "@angular/core";
import {Schedule} from "../../models/schedule";
import {Crawljob} from "../../models/crawljob";
import {Http} from "@angular/http";

@Injectable()
export class CrawljobService {

  private crawljobUrl = '/api/crawljob';
  private scheduleUrl = '/api/schedule';


  constructor(private http: Http) {
  }

  getAllCrawlJobs() {
    return this.http.get(this.crawljobUrl)
      .map(res => res.json());
  }

  updateCrawljob(putCrawljob: Crawljob): Promise<Crawljob> {
    const putUrl = this.crawljobUrl + '/' + putCrawljob.id;
    return this.http.put(putUrl, putCrawljob)
      .toPromise()
      .then(response => response.json() as Crawljob)
      .catch(this.handleError);
  }

  createCrawljob(putCrawljob: Crawljob): Promise<Crawljob> {
    return this.http.post(this.crawljobUrl, putCrawljob)
      .toPromise()
      .then(response => response.json() as Crawljob)
      .catch(this.handleError);
  }

  deleteCrawljob(delCrawljobId: String): Promise<String> {
    return this.http.delete(this.crawljobUrl + '/' + delCrawljobId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
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
      .catch(this.handleError);
  }

  deleteSchedule(delScheduleId: String): Promise<String> {
    return this.http.delete(this.scheduleUrl + '/' + delScheduleId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  updateSchedule(putSchedule: Schedule): Promise<Schedule> {
    const putUrl = this.scheduleUrl + '/' + putSchedule.id;
    return this.http.put(putUrl, putSchedule)
      .toPromise()
      .then(response => response.json() as Schedule)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
