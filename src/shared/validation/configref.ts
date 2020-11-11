import {AbstractControl, ValidationErrors} from '@angular/forms';

export const configRefIdRequired = (control: AbstractControl): ValidationErrors => {
  const id = control.get('id')?.value;
  return id === '' ? {required: true} : null;
};
