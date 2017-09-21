import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {CrawlHostGroupConfig} from './';
import {environment} from '../../../environments/environment';
import {ErrorHandlerService} from '../../commons/';
import {Observable} from 'rxjs/Observable';
import {CrawlHostGroupConfigs} from "./crawlhostgroupconfig.model";

@Injectable()
export class CrawlhostgroupconfigService {

  private crawlhostgroupconfigUrl = `${environment.API_URL}/crawlhostgroupconfig`;

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {
  }

  getCrawlhostgroupconfig(crawlhostgroupconfig_id): Observable<CrawlHostGroupConfig> {
    return this.http.get(`${this.crawlhostgroupconfigUrl}/${crawlhostgroupconfig_id}`)
      .map(res => res.json().value);
  }

  getAllCrawlhostgroupconfig(): Observable<CrawlHostGroupConfigs> {
    return this.http.get(this.crawlhostgroupconfigUrl)
      .map(res => res.json());
  }

  createCrawlhostgroupconfig(newCrawlhostgroupconfig: CrawlHostGroupConfig): Observable<CrawlHostGroupConfig> {
    return this.http.post(this.crawlhostgroupconfigUrl, newCrawlhostgroupconfig)
      .map(response => response.json() as CrawlHostGroupConfig)
      .catch(this.errorhandlerservice.handleError);
  }

  deleteCrawlhostgroupconfig(delCrawlhostgroupconfigId: String): Observable<String> {
    return this.http.delete(this.crawlhostgroupconfigUrl + '/' + delCrawlhostgroupconfigId)
      .map(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }

  updateCrawlhostgroupconfig(putCrawlhostgroupconfig: CrawlHostGroupConfig): Observable<CrawlHostGroupConfig> {
    const putUrl = this.crawlhostgroupconfigUrl + '/' + putCrawlhostgroupconfig.id;
    return this.http.put(putUrl, putCrawlhostgroupconfig)
      .map(response => response.json() as CrawlHostGroupConfig)
      .catch(this.errorhandlerservice.handleError);
  }
}

