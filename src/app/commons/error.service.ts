import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ErrorService {

  private errorSubject: Subject<Error> = new Subject<Error>();
  public error$: Observable<Error> = this.errorSubject.asObservable();

  public dispatch(error: any): void {
    this.errorSubject.next(error);
  }
}
