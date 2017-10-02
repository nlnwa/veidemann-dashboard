import {Observable} from 'rxjs/Observable';

export class ErrorHandlerService {

  handleError(error: any) {

    if (error.status === 405) {
      return Promise.reject('not_allowed');
    }
    const errMsg = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    Observable.throw(error);
  }

}