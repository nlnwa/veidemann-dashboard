import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Level, LogLevels} from '../../commons/models/';

@Injectable()
export class LogService {

  private readonly url = `${environment.apiGateway}/control/logconfig`;

  constructor(private http: HttpClient) {
  }

  getLevels(): Observable<string[]> {
    const levels: string[] = [];
    for (const level in Level) {
      if (isNaN(parseInt(level, 10)) && Level.hasOwnProperty(level)) {
        levels.push(level);
      }
    }
    return of(levels);
  }

  getLogConfig(): Observable<LogLevels> {
    return this.http.get<LogLevels>(this.url);
  }

  saveLogConfig(logLevels: LogLevels): Observable<LogLevels> {
    return this.http.post<LogLevels>(this.url, logLevels);
  }
}
