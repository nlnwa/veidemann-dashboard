import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Schedule} from "../models/schedule";
import {Crawlconfig} from "../models/crawlconfig";
import {BrowserConfig} from "../models/BrowserConfig";
import {PolitenessConfig} from "../models/Politenessconfig";
import {Crawljob} from "../models/crawljob";

@Injectable()
export class CrawljobService {

  private crawljobUrl = '/api/crawljob';
  private scheduleUrl = '/api/schedule';
  private crawlconfigUrl = '/api/crawlconfig';
  private browserconfigUrl = '/api/browserconfig';
  private politenessconfigUrl = '/api/politenessconfig';


  constructor(private http: Http) {
  }


  getAllCrawlJobs() {
    return this.http.get(this.crawljobUrl)
      .map(res => res.json());
  }


  updateCrawljob(putCrawljob: Crawljob): Promise<Crawljob> {
    var putUrl = this.crawljobUrl + '/' + putCrawljob.id;
    return this.http.put(putUrl, putCrawljob)
      .toPromise()
      .then(response => response.json() as Crawljob)
      .catch(this.handleError);
  }

  createCrawljob(putCrawljob: Crawljob): Promise<Crawljob> {
    return this.http.post(this.crawljobUrl, putCrawljob)
      .toPromise()
      .then(response => response.json() as Crawljob)
      .catch(this.handleError);
  }

  // delete("/api/users/:id")
  deleteCrawljob(delCrawlJobId: String): Promise<String> {
    return this.http.delete(this.crawljobUrl + '/' + delCrawlJobId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }


  getSchedule(schedule_id) {
    return this.http.get(`${this.scheduleUrl}/${schedule_id}`)
      .map(res => res.json().value);
  }

  getAllSchedules() {
    return this.http.get(this.scheduleUrl)
      .map(res => res.json());
  }

  getCrawlConfig(crawlconfig_id) {

    return this.http.get(`${this.crawlconfigUrl}/${crawlconfig_id}`)
      .map(res => res.json().value);
  }

  getAllCrawlconfigs() {
    return this.http.get(this.crawlconfigUrl)
      .map(res => res.json());
  }

  getAllBrowserconfigs() {
    return this.http.get(this.browserconfigUrl)
      .map(res => res.json());
  }

  getBrowserconfigs(browserconfig_id) {
    return this.http.get(`${this.browserconfigUrl}/${browserconfig_id}`)
      .map(res => res.json().value);
  }


  getAllPolitenessconfigs() {
    return this.http.get(this.politenessconfigUrl)
      .map(res => res.json());
  }

  getPolitenessconfig(politenessconfig_id) {
    return this.http.get(`${this.politenessconfigUrl}/${politenessconfig_id}`)
      .map(res => res.json().value)
  }

  // post("/api/entities")
  createSchedule(newSchedule: Schedule): Promise<Schedule> {
    return this.http.post(this.scheduleUrl, newSchedule)
      .toPromise()
      .then(response => response.json() as Schedule)
      .catch(this.handleError);
  }

  // delete("/api/users/:id")
  deleteSchedule(delScheduleId: String): Promise<String> {
    return this.http.delete(this.scheduleUrl + '/' + delScheduleId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/entities/:id")
  updateSchedule(putSchedule: Schedule): Promise<Schedule> {
    var putUrl = this.scheduleUrl + '/' + putSchedule.id;
    return this.http.put(putUrl, putSchedule)
      .toPromise()
      .then(response => response.json() as Schedule)
      .catch(this.handleError);
  }

  createCrawlConfig(newCrawlConfig: Crawlconfig): Promise<Crawlconfig> {
    return this.http.post(this.crawlconfigUrl, newCrawlConfig)
      .toPromise()
      .then(response => response.json() as Crawlconfig)
      .catch(this.handleError);
  }

  // delete("/api/users/:id")
  deleteCrawlConfig(delCrawlConfigId: String): Promise<String> {
    return this.http.delete(this.crawlconfigUrl + '/' + delCrawlConfigId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/entities/:id")
  updateCrawlConfig(putCrawlConfig: Crawlconfig): Promise<Crawlconfig> {
    var putUrl = this.crawlconfigUrl + '/' + putCrawlConfig.id;
    return this.http.put(putUrl, putCrawlConfig)
      .toPromise()
      .then(response => response.json() as Crawlconfig)
      .catch(this.handleError);
  }

  createBrowserConfig(newBrowserConfig: BrowserConfig): Promise<BrowserConfig> {
    return this.http.post(this.browserconfigUrl, newBrowserConfig)
      .toPromise()
      .then(response => response.json() as BrowserConfig)
      .catch(this.handleError);
  }

  // delete("/api/users/:id")
  deleteBrowserConfig(delBrowserConfigId: String): Promise<String> {
    return this.http.delete(this.browserconfigUrl + '/' + delBrowserConfigId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/entities/:id")
  updateBrowserConfig(putBrowserConfig: BrowserConfig): Promise<BrowserConfig> {
    var putUrl = this.browserconfigUrl + '/' + putBrowserConfig.id;
    return this.http.put(putUrl, putBrowserConfig)
      .toPromise()
      .then(response => response.json() as BrowserConfig)
      .catch(this.handleError);
  }

  createPolitenessConfig(newPolitenessConfig: PolitenessConfig): Promise<PolitenessConfig> {
    return this.http.post(this.politenessconfigUrl, newPolitenessConfig)
      .toPromise()
      .then(response => response.json() as PolitenessConfig)
      .catch(this.handleError);
  }

  // delete("/api/users/:id")
  deletePolitenessConfig(delPolitenessConfigId: String): Promise<String> {
    return this.http.delete(this.politenessconfigUrl + '/' + delPolitenessConfigId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/entities/:id")
  updatePolitenessConfig(putPolitenessConfig: PolitenessConfig): Promise<PolitenessConfig> {
    var putUrl = this.politenessconfigUrl + '/' + putPolitenessConfig.id;
    return this.http.put(putUrl, putPolitenessConfig)
      .toPromise()
      .then(response => response.json() as PolitenessConfig)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}


