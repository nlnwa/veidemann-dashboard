import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Level} from '../../commons/models';

@Injectable()
export class LogResolver implements Resolve<string[]> {

  private readonly levels: string[];

  constructor() {
    this.levels = [];
    for (const level in Level) {
      if (isNaN(parseInt(level, 10)) && Level.hasOwnProperty(level)) {
        this.levels.push(level);
      }
    }
  }

  resolve(route: ActivatedRouteSnapshot): Observable<string[]> | Promise<string[]> | string[] {
    return this.levels;
  }
}
