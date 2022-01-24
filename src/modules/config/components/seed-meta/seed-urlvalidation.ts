import {isValidUrl} from '../../../../shared/validation/patterns';
import {AbstractControl, ValidationErrors} from '@angular/forms';

export function validUrlValidator(control: AbstractControl): ValidationErrors | null {
  const input: string = control.value;
  // split input urls by whitespace
  const errors: string[] = [];
  const urls: string[] = input.split(/\s+/).filter(url => !!url);
  for (const url of urls) {
    if (!isValidUrl(url)) {
      errors.push(url);
    }
  }
  return errors.length > 0 ? {invalidUrl: errors} : null;
}
