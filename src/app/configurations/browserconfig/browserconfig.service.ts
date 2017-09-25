import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {BrowserConfig, BrowserConfigs} from './browserconfig.model';


@Injectable()
export class BrowserconfigService {

  private browserConfigUrl = `${environment.API_URL}/browserconfig`;

  constructor(private http: HttpClient) {}

  getAllBrowserConfigs(): Observable<BrowserConfigs> {
    return this.http.get(this.browserConfigUrl);
  }

  getBrowserConfig(browserConfigId): Observable<BrowserConfig> {
    return this.http.get<BrowserConfigs>(`${this.browserConfigUrl}/${browserConfigId}`)
      .map(reply => reply.value[0]);
  }

  createBrowserConfig(browserConfig: BrowserConfig): Observable<BrowserConfig> {
    return this.http.post(this.browserConfigUrl, browserConfig);
  }

  deleteBrowserConfig(browserConfigId: String): Observable<String> {
    return this.http.delete(this.browserConfigUrl + '/' + browserConfigId);
  }

  // put("/api/entities/:id")
  updateBrowserConfig(browserConfig: BrowserConfig): Observable<BrowserConfig> {
    return this.http.put(this.browserConfigUrl + '/' + browserConfig.id, browserConfig);
  }
}
