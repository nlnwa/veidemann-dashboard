import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {StatusCode} from 'grpc-web';

import {ErrorService} from './error.service';
import {ReferrerError} from '../../commons/error';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private errorService: ErrorService) {
    super();
  }

  handleError(error: any): void {
    if (error.code) {
      this.handleGrpcError(error);
      return;
    }
    switch (error.constructor) {
      case HttpErrorResponse:
        this.errorService.dispatch(error);
        break;
      case ReferrerError:
        this.errorService.dispatch(error);
        break;
      default:
        console.error(error);
        break;
    }
  }

  handleGrpcError(error) {
    switch (error.code) {
      case StatusCode.NOT_FOUND:
        console.error('NOT FOUND', error.message);
        break;
      case StatusCode.UNAUTHENTICATED:
        console.error('UNAUTHENTICATED', error.message);
        break;
    }
  }
}

