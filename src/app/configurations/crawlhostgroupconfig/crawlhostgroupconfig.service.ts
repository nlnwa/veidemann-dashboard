import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Crawlhostgroupconfig} from './';
import {environment} from '../../../environments/environment';
import {ErrorHandlerService} from '../../commons/';

@Injectable()
export class CrawlhostgroupconfigService {

  private crawlhostgroupconfigUrl = `${environment.API_URL}/crawlhostgroupconfig`;

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {
  }

  getCrawlhostgroupconfig(crawlhostgroupconfig_id) {
    return this.http.get(`${this.crawlhostgroupconfigUrl}/${crawlhostgroupconfig_id}`)
      .map(res => res.json().value);
  }

  getAllCrawlhostgroupconfig() {
    return this.http.get(this.crawlhostgroupconfigUrl)
      .map(res => res.json());
  }

  createCrawlhostgroupconfig(newCrawlhostgroupconfig: Crawlhostgroupconfig): Promise<Crawlhostgroupconfig> {
    return this.http.post(this.crawlhostgroupconfigUrl, newCrawlhostgroupconfig)
      .toPromise()
      .then(response => response.json() as Crawlhostgroupconfig)
      .catch(this.errorhandlerservice.handleError);
  }

  deleteCrawlhostgroupconfig(delCrawlhostgroupconfigId: String): Promise<String> {

    return this.http.delete(this.crawlhostgroupconfigUrl + '/' + delCrawlhostgroupconfigId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }

  updateCrawlhostgroupconfig(putCrawlhostgroupconfig: Crawlhostgroupconfig): Promise<Crawlhostgroupconfig> {
    const putUrl = this.crawlhostgroupconfigUrl + '/' + putCrawlhostgroupconfig.id;
    return this.http.put(putUrl, putCrawlhostgroupconfig)
      .toPromise()
      .then(response => response.json() as Crawlhostgroupconfig)
      .catch(this.errorhandlerservice.handleError);
  }
}

