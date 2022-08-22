import {UntypedFormControl, ValidatorFn} from '@angular/forms';

export class CustomValidators {
  /**
   * Validator that requires controls to have a value greater than a number.
   */
  static max(max: number): ValidatorFn {
    return (control: UntypedFormControl): { [key: string]: boolean } | null => {

      const val: number = control.value;

      if (control.pristine || control.pristine) {
        return null;
      }
      if (val <= max) {
        return null;
      }
      return {max: true};
    };
  }

  static min(min: number): ValidatorFn {
    return (control: UntypedFormControl): { [key: string]: boolean } | null => {

      const val: number = control.value;

      if (control.pristine || control.pristine) {
        return null;
      }
      if (val >= min) {
        return null;
      }
      return {min: true};
    };
  }

  static nonEmpty(control: any) {
    if (!control.value || control.value.length === 0) {
      return {nonEmpty: true};
    } else {
      return null;
    }

  }
}
