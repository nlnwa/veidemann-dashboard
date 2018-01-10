import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../commons/crud.service';
import {Seed} from '../commons/models/config.model';

@Injectable()
export class SeedService extends CrudService<Seed> {

  private static readonly URL: string = `${environment.apiGateway}/seeds`;

  constructor(protected http: HttpClient) {
    super(http, SeedService.URL);
  }
}
