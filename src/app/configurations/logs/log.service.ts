import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Logconfig} from './';
import {ErrorHandlerService} from "../../commons/";


@Injectable()
export class LogService {

  private logconfigUrl = '/api/logconfig';

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {
  }

  getAllLogconfigs() {
    return this.http.get(this.logconfigUrl)
      .map(res => res.json());
  }

  updateLogconfig(putLogconfig: Logconfig): Promise<Logconfig> {
    const putUrl = this.logconfigUrl;
    return this.http.put(putUrl, putLogconfig)
      .toPromise()
      .then(response => response.json() as Logconfig)
      .catch(this.errorhandlerservice.handleError);
  }

/*  getLogconfig(job_id) {
    return this.http.get(`${this.logconfigUrl}/${job_id}`)
      .map(res => res.json().value);
  }



  createLogconfig(putLogconfig: Logconfig): Promise<Logconfig> {
    return this.http.post(this.logconfigUrl, putLogconfig)
      .toPromise()
      .then(response => response.json() as Logconfig)
      .catch(this.errorhandlerservice.handleError);
  }

  deleteLogconfig(delLogconfigId: String): Promise<String> {
    return this.http.delete(this.logconfigUrl + '/' + delLogconfigId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }
*/

}
