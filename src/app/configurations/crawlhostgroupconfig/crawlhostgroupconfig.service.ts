import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../../commons/crud.service';
import {CrawlHostGroupConfig} from '../../commons/models/config.model';

@Injectable()
export class CrawlHostGroupConfigService extends CrudService<CrawlHostGroupConfig> {

  static readonly URL: string = `${environment.apiGateway}/crawlhostgroupconfigs`;

  constructor(protected http: HttpClient) {
    super(http, CrawlHostGroupConfigService.URL);
  }
}

