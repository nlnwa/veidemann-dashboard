import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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
}
