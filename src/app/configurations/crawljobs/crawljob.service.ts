import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../../commons/crud.service';
import {CrawlJob} from '../../commons/models/config.model';

@Injectable()
export class CrawlJobService extends CrudService<CrawlJob> {

  static readonly URL: string = `${environment.apiGateway}/crawljobs`;

  constructor(protected http: HttpClient) {
    super(http, CrawlJobService.URL);
  }
}
