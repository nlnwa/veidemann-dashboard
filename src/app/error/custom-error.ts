// tslint:disable:max-line-length
/**
 * Naively extending Error class does NOT allow one to do:
 *
 *   error instanceof MyCustomError // false
 *
 * or
 *
 *   switch (error.constructor) {
 *     case MyCustomError:
 *       // logic
 *     break;
 *     default:
 *       // this is where we get
 *   }
 *
 * TL;DR: extend this class when creating custom errors
 *
 * @see https://stackoverflow.com/questions/44108285/angular-4-custom-errorhandler-doesnt-recognize-custom-error
 * @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
 * @see https://github.com/Microsoft/TypeScript/issues/13965
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
 */
export class CustomError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
