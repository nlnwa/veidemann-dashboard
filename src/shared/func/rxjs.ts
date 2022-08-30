import {catchError, distinctUntilChanged} from 'rxjs/operators';
import {MonoTypeOperatorFunction, of, OperatorFunction} from 'rxjs';
import {ErrorHandler} from '@angular/core';

export function distinctUntilArrayChanged<T>(comparator?: (previous: T, current: T) => boolean): MonoTypeOperatorFunction<T[]> {
  return distinctUntilChanged<T[]>((as, bs) =>
    as.length === bs.length ? as.every(a => bs.some(b => a === b)) : false);
}


export function handleError(errorHandler: ErrorHandler, v: any): OperatorFunction<any, any> {
  return catchError(error => {
    errorHandler.handleError(error);
    return of(v);
  });
}
