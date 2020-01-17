import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Level, levels} from '../../../shared/models';

@Injectable()
export class LogResolver implements Resolve<Level[]> {

  resolve(route: ActivatedRouteSnapshot): Observable<Level[]> | Promise<Level[]> | Level[] {
    return levels;
  }
}
