import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Logconfig} from './';
import {ErrorHandlerService} from '../../commons/';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class LogService {

  private logconfigUrl = `${environment.API_URL}/logconfig`;

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {
  }

  getAllLogconfigs() {
    return this.http.get(this.logconfigUrl)
      .map(res => res.json());
  }

  updateLogconfig(putLogconfig: Logconfig): Observable<Logconfig> {
    return this.http.put(this.logconfigUrl, putLogconfig)
      .map(response => response.json() as Logconfig)
      .catch(this.errorhandlerservice.handleError);
  }

  /*  getLogconfig(job_id) {
   return this.http.get(`${this.logconfigUrl}/${job_id}`)
   .map(res => res.json().value);
   }



   createLogconfig(putLogconfig: Logconfig): Observable<Logconfig> {
   return this.http.post(this.logconfigUrl, putLogconfig)
   .map(response => response.json() as Logconfig)
   .catch(this.errorhandlerservice.handleError);
   }

   deleteLogconfig(delLogconfigId: String): Observable<String> {
   return this.http.delete(this.logconfigUrl + '/' + delLogconfigId)
   .map(response => response.json() as String)
   .catch(this.errorhandlerservice.handleError);
   }
   */

}
