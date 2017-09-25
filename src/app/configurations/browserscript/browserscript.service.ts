import {Injectable} from '@angular/core';
import {BrowserScript, BrowserScripts} from './browserscript.model';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class BrowserscriptService {

  private browserScriptUrl = `${environment.API_URL}/browserscript`;

  constructor(private http: HttpClient) {}


  getAllBrowserScripts(): Observable<BrowserScripts> {
    return this.http.get(this.browserScriptUrl);
  }

  getBrowserScript(browserScriptId): Observable<BrowserScript> {
    return this.http.get<BrowserScripts>(`${this.browserScriptUrl}/${browserScriptId}`)
      .map(res => res.value[0]);
  }

  createBrowserScript(browserScript: BrowserScript): Observable<BrowserScript> {
    return this.http.post(this.browserScriptUrl, browserScript);
  }

  deletePolitenessConfig(browserScriptId: String): Observable<String> {
    return this.http.delete(this.browserScriptUrl + '/' + browserScriptId);
  }

  updatePolitenessConfig(browserScript: BrowserScript): Observable<BrowserScript> {
    return this.http.put(this.browserScriptUrl + '/' + browserScript.id, browserScript)
  }
}
