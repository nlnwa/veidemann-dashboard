import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {CrawlConfig, CrawlConfigs} from './crawlconfig.model';


@Injectable()
export class CrawlconfigService {

  private crawlConfigUrl = `${environment.API_URL}/crawlconfig`;

  constructor(private http: HttpClient) {}

  getCrawlConfig(crawlConfigId): Observable<CrawlConfig> {
    return this.http.get<CrawlConfigs>(`${this.crawlConfigUrl}/${crawlConfigId}`)
      .map(res => res.value[0]);
  }

  getAllCrawlConfigs(): Observable<CrawlConfigs> {
    return this.http.get(this.crawlConfigUrl);
  }

  createCrawlConfig(newCrawlconfig: CrawlConfig): Observable<CrawlConfig> {
    return this.http.post(this.crawlConfigUrl, newCrawlconfig);
  }

  deleteCrawlConfig(delCrawlconfigId: String): Observable<String> {
    return this.http.delete(this.crawlConfigUrl + '/' + delCrawlconfigId);
  }

  updateCrawlConfig(putCrawlconfig: CrawlConfig): Observable<CrawlConfig> {
    return this.http.put(this.crawlConfigUrl + '/' + putCrawlconfig.id, putCrawlconfig);
  }

}
