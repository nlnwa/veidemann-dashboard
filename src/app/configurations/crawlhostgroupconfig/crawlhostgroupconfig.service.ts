import {Injectable} from '@angular/core';
import {CrawlHostGroupConfig} from './';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {CrawlHostGroupConfigs} from './crawlhostgroupconfig.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CrawlHostGroupConfigService {

  private crawlHostGroupConfigUrl = `${environment.API_URL}/crawlhostgroupconfig`;

  constructor(private http: HttpClient) {}

  getCrawlHostGroupConfig(crawlHostGroupConfigId): Observable<CrawlHostGroupConfig> {
    return this.http.get<CrawlHostGroupConfigs>(`${this.crawlHostGroupConfigUrl}/${crawlHostGroupConfigId}`)
      .map(reply => reply.value[0]);
  }

  getAllCrawlHostGroupConfig(): Observable<CrawlHostGroupConfigs> {
    return this.http.get<CrawlHostGroupConfigs>(this.crawlHostGroupConfigUrl);
  }

  createCrawlHostGroupConfig(crawlHostGroupConfig: CrawlHostGroupConfig): Observable<CrawlHostGroupConfig> {
    return this.http.post(this.crawlHostGroupConfigUrl, crawlHostGroupConfig);
  }

  deleteCrawlHostGroupConfig(crawlHostGroupConfigId: String): Observable<String> {
    return this.http.delete(this.crawlHostGroupConfigUrl + '/' + crawlHostGroupConfigId);
  }

  updateCrawlHostGroupConfig(putCrawlHostGroupConfig: CrawlHostGroupConfig): Observable<CrawlHostGroupConfig> {
    return this.http.put(this.crawlHostGroupConfigUrl + '/' + putCrawlHostGroupConfig.id, putCrawlHostGroupConfig);
  }
}

