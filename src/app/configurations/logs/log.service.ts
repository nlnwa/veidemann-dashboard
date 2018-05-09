import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {LogLevels} from '../../commons/models/config.model';

@Injectable()
export class LogService {

  private logConfigUrl = `${environment.apiGateway}/control/logconfig`;

  constructor(private http: HttpClient) {
  }

  getLevels(): Observable<string[]> {
    return of(['ALL', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL', 'OFF']);
  }

  getLogConfig(): Observable<LogLevels> {
    return this.http.get<LogLevels>(this.logConfigUrl);
  }

  saveLogConfig(logConfig: LogLevels): Observable<LogLevels> {
    return this.http.post<LogLevels>(this.logConfigUrl, logConfig);
  }
}
