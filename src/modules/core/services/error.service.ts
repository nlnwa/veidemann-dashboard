import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class ErrorService {

  private errorSubject: Subject<Error> = new Subject<Error>();
  public error$: Observable<Error> = this.errorSubject.asObservable();

  public dispatch(error: Error): void {
    this.errorSubject.next(error);
  }
}
