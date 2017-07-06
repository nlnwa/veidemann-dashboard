/**
 * Created by kristiana on 06.07.17.
 */

export class ErrorHandlerService {


  handleError(error: any) {

    if (error.status === 405) {
      return "not_allowed"
    }
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}
