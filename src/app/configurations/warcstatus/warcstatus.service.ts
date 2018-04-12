import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WarcStatusService {

  private readonly URL: string = '/validator/api';

  constructor(private http: HttpClient) {
  }

  getValidationErrors(): Observable <any[]> {
    return this.http.get<any[]>(this.URL);
  }

}
