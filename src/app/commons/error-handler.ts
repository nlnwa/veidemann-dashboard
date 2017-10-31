import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorService} from './error.service';


@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private errorService: ErrorService) {
    super();
  }

  handleError(error: any): void {
    switch (error.constructor) {
      case HttpErrorResponse:
        this.errorService.dispatch(error);
        break;
      default:
        console.error(error);
        break;
    }
  }
}

