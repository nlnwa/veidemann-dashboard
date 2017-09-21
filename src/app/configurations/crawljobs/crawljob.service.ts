import {Injectable} from '@angular/core';
import {Crawljob} from './';
import {Http} from '@angular/http';
import {ErrorHandlerService} from '../../commons/';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class CrawljobService {

  private crawljobUrl = `${environment.API_URL}/crawljob`;

  constructor(private http: Http,
              private errorhandlerservice: ErrorHandlerService) {
  }

  getAllCrawlJobs() {
    return this.http.get(this.crawljobUrl)
      .map(res => res.json());
  }

  getCrawlJob(job_id) {
    return this.http.get(`${this.crawljobUrl}/${job_id}`)
      .map(res => res.json().value);
  }

  updateCrawljob(putCrawljob: Crawljob): Observable<Crawljob> {
    const putUrl = this.crawljobUrl + '/' + putCrawljob.id;
    return this.http.put(putUrl, putCrawljob)
      .map(response => response.json() as Crawljob)
      .catch(this.errorhandlerservice.handleError);
  }

  createCrawljob(putCrawljob: Crawljob): Observable<Crawljob> {
    return this.http.post(this.crawljobUrl, putCrawljob)
      .map(response => response.json() as Crawljob)
      .catch(this.errorhandlerservice.handleError);
  }

  deleteCrawljob(delCrawljobId: String): Observable<String> {
    return this.http.delete(this.crawljobUrl + '/' + delCrawljobId)
      .map(response => response.json() as String)
      .catch(this.errorhandlerservice.handleError);
  }


}
