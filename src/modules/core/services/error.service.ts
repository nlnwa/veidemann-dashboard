import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ReferrerError} from '../../commons/error';
import {ConfigObject} from '../../commons/models/config';

@Injectable()
export class ErrorService {

  private error: Subject<Error> = new Subject<Error>();
  public error$: Observable<Error> = this.error.asObservable();

  constructor() {
    this.error = new Subject<Error>();
    this.error$ = this.error.asObservable();

  }

  public dispatch(error: Error): void {
    this.error.next(error);
  }

  public delete(error: Error, configObject: ConfigObject): void {
    if (error.message) {
      const errorString = error.message.split(':')[1];
      const deleteError = /(?=.*delete)(?=.*there are)/gm;
      if (deleteError.test(errorString)) {
        this.dispatch(new ReferrerError({errorString, configObject}));
      }
    }
  }
}
