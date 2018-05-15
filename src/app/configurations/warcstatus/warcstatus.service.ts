import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class WarcStatusService {

  private readonly url: string = '/validator/api';

  constructor(private http: HttpClient) {
  }

  getValidationErrors(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  getNumberOfInvalidWarcs(): Observable<any> {
    return this.http.get<any>(this.url + '/invalid/');
  }

  getNumberOfValidWarcs(): Observable<any> {
    return this.http.get<any>(this.url + '/valid/');
  }

}
