import {Injectable} from '@angular/core';
import {LogLevels} from './';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/of';

@Injectable()
export class LogService {

  private logConfigUrl = `${environment.API_URL}/logconfig`;

  constructor(private http: HttpClient) {}

  getLevels(): Observable<string[]> {
    return Observable.of(['ALL', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL', 'OFF']);
  }

  getLogConfig(): Observable<LogLevels> {
    return this.http.get<LogLevels>(this.logConfigUrl);
  }

  updateLogConfig(logConfig: LogLevels): Observable<LogLevels> {
    return this.http.put<LogLevels>(this.logConfigUrl, logConfig);
  }
}
