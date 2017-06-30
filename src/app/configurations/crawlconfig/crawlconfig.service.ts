import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Crawlconfig} from "./crawlconfig";

@Injectable()
export class CrawlconfigService {

  private crawlconfigUrl = '/api/crawlconfig';

  constructor(private http: Http) {
  }

  getCrawlconfig(crawlconfig_id) {
    return this.http.get(`${this.crawlconfigUrl}/${crawlconfig_id}`)
      .map(res => res.json().value);
  }

  getAllCrawlconfigs() {
    return this.http.get(this.crawlconfigUrl)
      .map(res => res.json());
  }

  createCrawlconfig(newCrawlconfig: Crawlconfig): Promise<Crawlconfig> {
    return this.http.post(this.crawlconfigUrl, newCrawlconfig)
      .toPromise()
      .then(response => response.json() as Crawlconfig)
      .catch(this.handleError);
  }

  deleteCrawlconfig(delCrawlconfigId: String): Promise<String> {
    return this.http.delete(this.crawlconfigUrl + '/' + delCrawlconfigId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  updateCrawlconfig(putCrawlconfig: Crawlconfig): Promise<Crawlconfig> {
    const putUrl = this.crawlconfigUrl + '/' + putCrawlconfig.id;
    return this.http.put(putUrl, putCrawlconfig)
      .toPromise()
      .then(response => response.json() as Crawlconfig)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
