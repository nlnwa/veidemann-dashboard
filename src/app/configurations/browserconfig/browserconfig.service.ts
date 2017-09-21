import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Browserconfig} from './';
import {ErrorHandlerService} from '../../commons';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class BrowserconfigService {

  private browserconfigUrl = `${environment.API_URL}/browserconfig`;
  private browserscripts = `${environment.API_URL}/browserscripts`;

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {
  }

  getAllBrowserconfigs() {
    return this.http.get(this.browserconfigUrl)
      .map(res => res.json())
      .catch(this.errorhandlerservice.handleError);
  }

  getBrowserconfigs(browserconfig_id) {
    return this.http.get(`${this.browserconfigUrl}/${browserconfig_id}`)
      .map(res => res.json().value)
      .catch(this.errorhandlerservice.handleError);
  }

  createBrowserconfig(newBrowserconfig: Browserconfig): Observable<Browserconfig> {
    return this.http.post(this.browserconfigUrl, newBrowserconfig)
      .map(response => response.json() as Browserconfig)
      .catch(this.errorhandlerservice.handleError);
  }

  deleteBrowserconfig(delBrowserconfigId: String): Observable<String> {
    return this.http.delete(this.browserconfigUrl + '/' + delBrowserconfigId)
      .map(response => response.json() as String);
  }

  // put("/api/entities/:id")
  updateBrowserconfig(putBrowserconfig: Browserconfig): Observable<Browserconfig> {
    const putUrl = this.browserconfigUrl + '/' + putBrowserconfig.id;
    return this.http.put(putUrl, putBrowserconfig)
      .map(response => response.json() as Browserconfig);
  }


  getBrowserscripts() {
    return this.http.get(this.browserscripts)
      .map(res => res.json())
      .catch(this.errorhandlerservice.handleError);
  }

}
