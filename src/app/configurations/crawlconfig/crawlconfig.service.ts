import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Crawlconfig} from './';
import {ErrorHandlerService} from '../../commons/';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CrawlconfigService {

  private crawlconfigUrl = `${environment.API_URL}/crawlconfig`;

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {
  }

  getCrawlconfig(crawlconfig_id) {
    return this.http.get(`${this.crawlconfigUrl}/${crawlconfig_id}`)
      .map(res => res.json().value);
  }

  getAllCrawlconfigs() {
    return this.http.get(this.crawlconfigUrl)
      .map(res => res.json());
  }

  createCrawlconfig(newCrawlconfig: Crawlconfig): Observable<Crawlconfig> {
    return this.http.post(this.crawlconfigUrl, newCrawlconfig)
      .map(response => response.json() as Crawlconfig)
      .catch(this.errorhandlerservice.handleError);
  }

  deleteCrawlconfig(delCrawlconfigId: String): Observable<String> {
    return this.http.delete(this.crawlconfigUrl + '/' + delCrawlconfigId)
      .map(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }

  updateCrawlconfig(putCrawlconfig: Crawlconfig): Observable<Crawlconfig> {
    const putUrl = this.crawlconfigUrl + '/' + putCrawlconfig.id;
    return this.http.put(putUrl, putCrawlconfig)
      .map(response => response.json() as Crawlconfig)
      .catch(this.errorhandlerservice.handleError);
  }

}
