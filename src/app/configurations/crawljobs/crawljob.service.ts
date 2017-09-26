import {Injectable} from '@angular/core';
import {CrawlJob} from './';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../../commons/crud.service';

@Injectable()
export class CrawlJobService extends CrudService<CrawlJob> {

  static readonly URL: string = `${environment.API_URL}/crawljob`;

  constructor(protected http: HttpClient) {
    super(http, CrawlJobService.URL);
  }
}
