export const VALID_URL_PATTERN = [
  '(http|https)(://)([w]{3}[.]{1})([a-z0-9-]+[.]{1}[A-z]+)',
  '|(http|https)(://)([^www.][a-z0-9-]+[.]{1}[A-z]+.+)'
].join('');

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

export const DECIMAL_NUMBER_OR_EMPTY_STRING = /^((\d+\.?|\.(?=\d))?\d+)$/;

export const NO_COLON = /^[^:]*$/;

export const VALID_URL = /^https?:\/\/(?:[\S]+\.)?(?:[\S]+)\.[\S][\S]+$/;

export const MULTI_VALID_URL = /\S*(https?:\/\/(?:[\S]+\.)?(?:[\S]+)\.[\S][\S]+$)+\S*/;

export const SIMILAR_URL = /https?:\/\/(?:www\.)?([^\t\n\f\r /]+)\S*/;

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
