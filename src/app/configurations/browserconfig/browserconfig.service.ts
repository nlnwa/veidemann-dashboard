import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Browserconfig} from "./";
import {ErrorHandlerService} from "../../commons";


@Injectable()
export class BrowserconfigService {

  private browserconfigUrl = '/api/browserconfig';
  private browserscripts = '/api/browserscripts';

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {
  }

  getAllBrowserconfigs() {
    return this.http.get(this.browserconfigUrl)
      .map(res => res.json())
      .catch(this.errorhandlerservice.handleError);
    ;
  }

  getBrowserconfigs(browserconfig_id) {
    return this.http.get(`${this.browserconfigUrl}/${browserconfig_id}`)
      .map(res => res.json().value)
      .catch(this.errorhandlerservice.handleError);
    ;
  }

  createBrowserconfig(newBrowserconfig: Browserconfig): Promise<Browserconfig> {
    return this.http.post(this.browserconfigUrl, newBrowserconfig)
      .toPromise()
      .then(response => response.json() as Browserconfig)
      .catch(this.errorhandlerservice.handleError);
  }

  deleteBrowserconfig(delBrowserconfigId: String): Promise<String> {
    return this.http.delete(this.browserconfigUrl + '/' + delBrowserconfigId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }

  // put("/api/entities/:id")
  updateBrowserconfig(putBrowserconfig: Browserconfig): Promise<Browserconfig> {
    const putUrl = this.browserconfigUrl + '/' + putBrowserconfig.id;
    return this.http.put(putUrl, putBrowserconfig)
      .toPromise()
      .then(response => response.json() as Browserconfig)
      .catch(this.errorhandlerservice.handleError);
  }


  getBrowserscripts() {
    return this.http.get(this.browserscripts)
      .map(res => res.json())
      .catch(this.errorhandlerservice.handleError);
    ;
  }

}
