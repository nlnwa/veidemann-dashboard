import {Injectable} from '@angular/core';
import {CrawlJob} from './';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {CrawlJobs} from './crawljob.model';


@Injectable()
export class CrawlJobService {

  private crawlJobUrl = `${environment.API_URL}/crawljob`;

  constructor(private http: HttpClient) {}

  getAllCrawlJobs(): Observable<CrawlJobs> {
    return this.http.get(this.crawlJobUrl);
  }

  getCrawlJob(jobId): Observable<CrawlJob> {
    return this.http.get<CrawlJobs>(`${this.crawlJobUrl}/${jobId}`)
      .map(crawlJobReply => crawlJobReply.value[0]);
  }

  updateCrawlJob(crawlJob: CrawlJob): Observable<CrawlJob> {
    return this.http.put<CrawlJob>(`${this.crawlJobUrl}/${crawlJob.id}`, crawlJob);
  }

  createCrawlJob(crawlJob: CrawlJob): Observable<CrawlJob> {
    return this.http.post<CrawlJob>(this.crawlJobUrl, crawlJob);
  }

  deleteCrawlJob(crawlJobId: String): Observable<String> {
    return this.http.delete(this.crawlJobUrl + '/' + crawlJobId);
  }
}
