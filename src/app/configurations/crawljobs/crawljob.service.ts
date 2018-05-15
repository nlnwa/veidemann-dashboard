import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../shared/crud.service';
import {CrawlJob} from '../../commons/models/config.model';

@Injectable()
export class CrawlJobService extends CrudService<CrawlJob> {

  protected readonly url: string = `${environment.apiGateway}/control/crawljobs`;

  constructor(protected http: HttpClient) {
    super(http);
  }
}
