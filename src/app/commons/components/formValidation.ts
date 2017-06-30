export class FormValidatorUtils {
  static nonEmpty(control: any) {
    if (!control.value || control.value.length === 0) {
      return {'noElements': true};
    }
    return null;
  }
}
