export class UrlHelper {
  public static readonly URL_PATTERN =
    '(http|https)(://)([w]{3}[.]{1})([a-z0-9-]+[.]{1}[A-z]+)' +
    '|(http|https)(://)([^www.][a-z0-9-]+[.]{1}[A-z]+.+)';
}
