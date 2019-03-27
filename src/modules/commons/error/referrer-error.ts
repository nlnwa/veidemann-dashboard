import {CustomError} from './custom-error';

export class ReferrerError extends CustomError {
  constructor(message?: string) {
    super(message);
  }
}
