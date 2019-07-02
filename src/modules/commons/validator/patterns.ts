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

export const NO_COLON = /^[^:]*$/;

export const VALID_URL = /^\s*(?:https?:\/\/(?:[\S]{1,}\.)?(?:[\S]{1,})\.[\S]{2,}\s*)+$/;

export const SIMILAR_URL = /https?:\/\/(?:www\.)?([^\t\n\f\r /]+)\S*/;

// see https://stackoverflow.com/a/6969486 for explanation
export const escapeStringForUseInRegexp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const createSimilarDomainRegExpString = url => {
  try {
    const domain = url.match(SIMILAR_URL)[1];

    return 'https?://(?:www\.)?' + escapeStringForUseInRegexp(domain) + '(/?$|/.*)';
  } catch (error) {
    console.error(error);
    return 'that never a real world invalid pattern matches in scenario';
  }
};
