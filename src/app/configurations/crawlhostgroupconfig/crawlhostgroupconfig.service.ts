import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../shared/crud.service';
import {CrawlHostGroupConfig} from '../../commons/models/config.model';

@Injectable()
export class CrawlHostGroupConfigService extends CrudService<CrawlHostGroupConfig> {

  protected readonly url: string = `${environment.apiGateway}/control/crawlhostgroupconfigs`;

  constructor(protected http: HttpClient) {
    super(http);
  }
}
