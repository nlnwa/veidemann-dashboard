import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../../commons/crud.service';
import {CrawlConfig} from '../../commons/models/config.model';

@Injectable()
export class CrawlConfigService extends CrudService<CrawlConfig> {

  static readonly URL: string = `${environment.API_URL}/crawlconfigs`;

  constructor(protected http: HttpClient) {
    super(http, CrawlConfigService.URL);
  }
}
