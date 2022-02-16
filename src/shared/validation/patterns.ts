export const VALID_IP_PATTERN = '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';

export const VALID_CRON_MONTH_PATTERN = [
  '^[*]$|^([1-9]|1[0-2]|(jan)|(feb)|(mar)|(apr)|(may)|(jun)|(jul)|(aug)|(sep)|(oct)|(nov)|(dec))',
  '((,([1-9]|1[0-2]|(jan)|(feb)|(mar)|(apr)|(may)|(jun)|(jul)|(aug)|(sep)|(oct)|(nov)|(dec)))|(-([1-9]|1[0-2]|(jan)',
  '|(feb)|(mar)|(apr)|(may)|(jun)|(jul)|(aug)|(sep)|(oct)|(nov)|(dec))))*$'
].join('');

export const VALID_CRON_MINUTE_PATTERN = [
  /^[*]$|^(([*][\/])?([0-9]|[1-5]?[0-9]))$/,
  /|^([0-9]|[1-5]?[0-9])((,([0-9]|[1-5]?[0-9]))|(-([0-9]|[1-5]?[0-9])))*$/
].map(r => r.source).join('');

export const VALID_CRON_HOUR_PATTERN = [
  /^[*]$|^([0-9]|1[0-9]|2[0-3])/,
  /((,([0-9]|1[0-9]|2[0-3]))|(-([0-9]|1[0-9]|2[0-3])))*$/
].map(r => r.source).join('');

export const VALID_CRON_DOM_PATTERN = [
  /^[*]$|^([1-9]|1[0-9]|2[0-9]|3[0-1])/,
  /((,([1-9]|1[0-9]|2[0-9]|3[0-1]))|(-([1-9]|1[0-9]|2[0-9]|3[0-1])))*$/
].map(r => r.source).join('');

export const VALID_CRON_DOW_PATTERN = [
  /^[*]$|^([0-6]|(mon)|(tue)|(wed)|(thu)|(fri)|(sat)|(sun))/,
  /((,([0-6]|(mon)|(tue)|(wed)|(thu)|(fri)|(sat)|(sun)))|(-([0-6]|(mon)|(tue)|(wed)|(thu)|(fri)|(sat)|(sun))))*$/
].map(r => r.source).join('');

export const VALID_YEAR_PATTERN = /[2-9][0-9][0-9][0-9]/;

export const VALID_MONTH_PATTERN = /^0?[1-9]$|^1[0-2]$/;

export const VALID_DAY_PATTERN = /^0?[1-9]$|^1[0-9]$|^2[0-9]$|^3[0-1]$/;

export const NUMBER_OR_EMPTY_STRING = /^\s*\d*\s*$/;

export const ANY_DECIMAL_NUMBER_OR_EMPTY_STRING = /^-?((\d+\.?|\.(?=\d))?\d+)$/;

export const DECIMAL_NUMBER_OR_EMPTY_STRING = /^((\d+\.?|\.(?=\d))?\d+)$/;

export const NO_COLON = /^[^:]*$/;

export const VALID_URL = /^(([^:/?#]+):\/\/)?([^/?#]+)([^?#]*)(\?([^#]*))?(#(.*))?/;

export const VALID_SCHEME = /^https?$|^s?ftp$/;

export const VALID_AUTHORITY = /^(?:[\S]+\.)?[\S]+\.[\S][\S]+/;

export const SIMILAR_URL = /(?:https?:\/\/)?(?:www\.)?([^\t\n\f\r /]+)\S*/;

export const FILESIZE_PATTERN = [
  /^[0-9]*\.?[0-9]+\s*/,
  /(b|bit|bits|B|Byte|Bytes|bytes|Kb|k|K|kb|KB|KiB|Ki|ki|Mb|m|M|mb|MB|MiB|Mi|mi|Gb|g|G|gb|GB|GiB|Gi|gi|Tb|t|T|tb|TB|TiB|Ti|ti|)\s*$/
].map(r => r.source).join('');

// see https://stackoverflow.com/a/6969486 for explanation
export const escapeStringForUseInRegexp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const createSimilarDomainRegExpString = url => {
  const match = url.match(SIMILAR_URL);
  if (match) {
    const domain = match[1];
    return 'https?://(?:www\.)?' + escapeStringForUseInRegexp(domain) + '(/?$|/.*)';
  } else {
    return null;
  }
};

export function isValidUrl(url: string): boolean {
  const g = url.match(VALID_URL);
  if (g === null) {
    return false;
  }
  const scheme = g[2];
  const authority = g[3];
  const path = g[4];
  const query = g[6];
  const isValidQuery = query === undefined ? true : query.indexOf(' ') === -1;
  const isValidScheme = scheme !== undefined ? VALID_SCHEME.test(scheme) : true;
  const isValidAuthority = VALID_AUTHORITY.test(authority);
  const isValidPath = path !== '' ? path.charAt(0) === '/' : true;
  return isValidScheme && isValidAuthority && isValidPath && isValidQuery;
}
