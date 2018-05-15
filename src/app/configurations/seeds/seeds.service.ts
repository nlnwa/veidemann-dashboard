import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../shared/crud.service';
import {Seed} from '../../commons/models/config.model';

@Injectable()
export class SeedService extends CrudService<Seed> {

  protected readonly url: string = `${environment.apiGateway}/control/seeds`;

  constructor(protected http: HttpClient) {
    super(http);
  }
}
