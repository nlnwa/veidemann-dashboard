import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Browserscript} from "./browserscript";
import {ErrorHandlerService} from "../../commons/components/errorhandlerservice";


@Injectable()
export class BrowserscriptService {

  private browserscriptUrl = '/api/browserscript';

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {
  }


  getAllBrowserscripts() {
    return this.http.get(this.browserscriptUrl)
      .map(res => res.json());
  }

  getBrowserscript(browserscript_id) {
    return this.http.get(`${this.browserscriptUrl}/${browserscript_id}`)
      .map(res => res.json().value);
  }

  createBrowserscript(newBrowserscript: Browserscript): Promise<Browserscript> {
    return this.http.post(this.browserscriptUrl, newBrowserscript)
      .toPromise()
      .then(response => response.json() as Browserscript)
      .catch(this.errorhandlerservice.handleError);
  }

  deletePolitenessConfig(delBrowserscriptId: String): Promise<String> {
    return this.http.delete(this.browserscriptUrl + '/' + delBrowserscriptId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }

  updatePolitenessConfig(putBrowserscript: Browserscript): Promise<Browserscript> {
    const putUrl = this.browserscriptUrl + '/' + putBrowserscript.id;
    return this.http.put(putUrl, putBrowserscript)
      .toPromise()
      .then(response => response.json() as Browserscript)
      .catch(this.errorhandlerservice.handleError);
  }


}
