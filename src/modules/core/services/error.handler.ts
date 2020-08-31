import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

import {StatusCode} from 'grpc-web';

import {ErrorService} from './error.service';
import {ReferrerError} from '../../../shared/error';
import {ConfigObject} from '../../../shared/models/config';

@Injectable({
  providedIn: 'root'
})
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private errorService: ErrorService) {
    super();
  }

  handleError(error: any): void {
    console.warn('error handler', error);
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
      default:
        console.error('gRPC code:', error.code, 'message:', error.message);
        break;
    }
  }

  handleDeleteError(error: Error, configObject: ConfigObject): void {
    if (error.message) {
      const errorString = error.message.split(':')[1];
      const deleteError = /(?=.*delete)(?=.*there are)/gm;
      if (deleteError.test(errorString)) {
        this.errorService.dispatch(new ReferrerError({errorString, configObject}));
      }
    }
  }
}

