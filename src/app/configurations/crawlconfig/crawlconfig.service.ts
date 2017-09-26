import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrawlConfig} from './crawlconfig.model';
import {CrudService} from '../../commons/crud.service';

@Injectable()
export class CrawlConfigService extends CrudService<CrawlConfig> {

  static readonly URL: string = `${environment.API_URL}/crawlconfig`;

  constructor(protected http: HttpClient) {
    super(http, CrawlConfigService.URL);
  }
}
