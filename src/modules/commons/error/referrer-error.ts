import {CustomError} from './custom-error';

export class ReferrerError extends CustomError {
  constructor(options: any) {
    const {configObject, numConfigs, numDeleted, errorString} = options;
    if (numConfigs) {
      const notDeletedMsg = numConfigs - numDeleted + ' ble ikke slettet siden de brukes i andre konfigurasjoner ';
      const deletedMsg = numDeleted + '/' + numConfigs + ' konfigurasjoner  ble  slettet. ';

      super(deletedMsg + notDeletedMsg);
    } else {
      super(errorString + ': ' + 'Error deleting config ' + configObject.meta.name);
    }
  }
}
