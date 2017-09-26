import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrawlHostGroupConfig} from './crawlhostgroupconfig.model';
import {CrudService} from '../../commons/crud.service';

@Injectable()
export class CrawlHostGroupConfigService extends CrudService<CrawlHostGroupConfig> {

  static readonly URL: string = `${environment.API_URL}/crawlhostgroupconfig`;

  constructor(protected http: HttpClient) {
    super(http, CrawlHostGroupConfigService.URL);
  }
}

