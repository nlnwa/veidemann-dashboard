import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../shared/crud.service';
import {CrawlConfig} from '../../commons/models/config.model';

@Injectable()
export class CrawlConfigService extends CrudService<CrawlConfig> {

  static readonly URL: string = `${environment.apiGateway}/crawlconfigs`;

  constructor(protected http: HttpClient) {
    super(http, CrawlConfigService.URL);
  }
}
