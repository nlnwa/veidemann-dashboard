import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Schedule} from "../models/schedule";
import {Crawlconfig} from "../models/crawlconfig";
import {Browserconfig} from "../models/browserconfig";
import {Politenessconfig} from "../models/politenessconfig";
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
    const putUrl = this.crawljobUrl + '/' + putCrawljob.id;
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

  deleteCrawljob(delCrawljobId: String): Promise<String> {
    return this.http.delete(this.crawljobUrl + '/' + delCrawljobId)
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
      .map(res => res.json().value);
  }

  createPolitenessconfig(newPolitenessconfig: Politenessconfig): Promise<Politenessconfig> {
    return this.http.post(this.politenessconfigUrl, newPolitenessconfig)
      .toPromise()
      .then(response => response.json() as Politenessconfig)
      .catch(this.handleError);
  }

  deletePolitenessConfig(delPolitenessconfigId: String): Promise<String> {
    return this.http.delete(this.politenessconfigUrl + '/' + delPolitenessconfigId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  updatePolitenessConfig(putPolitenessconfig: Politenessconfig): Promise<Politenessconfig> {
    const putUrl = this.politenessconfigUrl + '/' + putPolitenessconfig.id;
    return this.http.put(putUrl, putPolitenessconfig)
      .toPromise()
      .then(response => response.json() as Politenessconfig)
      .catch(this.handleError);
  }

 createSchedule(newSchedule: Schedule): Promise<Schedule> {
    return this.http.post(this.scheduleUrl, newSchedule)
      .toPromise()
      .then(response => response.json() as Schedule)
      .catch(this.handleError);
  }

  deleteSchedule(delScheduleId: String): Promise<String> {
    return this.http.delete(this.scheduleUrl + '/' + delScheduleId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  updateSchedule(putSchedule: Schedule): Promise<Schedule> {
    const putUrl = this.scheduleUrl + '/' + putSchedule.id;
    return this.http.put(putUrl, putSchedule)
      .toPromise()
      .then(response => response.json() as Schedule)
      .catch(this.handleError);
  }

  createBrowserconfig(newBrowserconfig: Browserconfig): Promise<Browserconfig> {
    return this.http.post(this.browserconfigUrl, newBrowserconfig)
      .toPromise()
      .then(response => response.json() as Browserconfig)
      .catch(this.handleError);
  }

  deleteBrowserconfig(delBrowserconfigId: String): Promise<String> {
    return this.http.delete(this.browserconfigUrl + '/' + delBrowserconfigId)
      .toPromise()
      .then(response => response.json() as String)
      .catch(this.handleError);
  }

  // put("/api/entities/:id")
  updateBrowserconfig(putBrowserconfig: Browserconfig): Promise<Browserconfig> {
    const putUrl = this.browserconfigUrl + '/' + putBrowserconfig.id;
    return this.http.put(putUrl, putBrowserconfig)
      .toPromise()
      .then(response => response.json() as Browserconfig)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
