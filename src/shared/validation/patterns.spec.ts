import {waitForAsync} from '@angular/core/testing';
import {createSimilarDomainRegExpString, isValidUrl, MULTI_VALID_URL, SIMILAR_URL} from './patterns';

// valid and invalid urls taken from https://gist.github.com/j3j5/8336b0224167636bed462950400ff2df
const validUrls = [
  'foo.com/blah_blah',
  'ftp://download.us/file',
  'sftp://link.me/home',
  'http://foo.com/blah_blah',
  'http://foo.com/blah_blah/',
  'http://foo.com/blah_blah_(wikipedia)',
  'http://foo.com/blah_blah_(wikipedia)_(again)',
  'http://www.example.com/wpstyle/?p=364',
  'https://www.example.com/foo/?bar=baz&inga=42&quux',
  'http://✪df.ws/123',
  'http://userid:password@example.com:8080',
  'http://userid:password@example.com:8080/',
  'http://userid@example.com',
  'http://userid@example.com/',
  'http://userid@example.com:8080',
  'http://userid@example.com:8080/',
  'http://userid:password@example.com',
  'http://userid:password@example.com/',
  'http://142.42.1.1/',
  'http://142.42.1.1:8080/',
  'http://➡.ws/䨹',
  'http://⌘.ws',
  'http://⌘.ws/',
  'http://foo.com/blah_(wikipedia)#cite-1',
  'http://foo.com/blah_(wikipedia)_blah#cite-1',
  'http://foo.com/unicode_(✪)_in_parens',
  'http://foo.com/(something)?after=parens',
  'http://☺.damowmow.com/',
  'http://code.google.com/events/#&product=browser',
  'http://j.mp',
  'http://foo.bar/?q=Test%20URL-encoded%20stuff',
  'http://مثال.إختبار',
  'http://例子.测试',
  'http://उदाहरण.परीक्षा',
  'http://-.~_!$&\'()*+,;=:%40:80%2f::::::@example.com',
  'http://1337.net',
  'http://a.b-c.de',
  'http://223.255.255.254'
];

const invalidUrls = [
  'gdpr://fin.url/hei',
  'http://',
  'http://.',
  'http://..',
  'http://../',
  'http://?',
  'http://??',
  'http://??/',
  'http://#',
  'http://##',
  'http://##/',
  'http://foo.bar?q=Spaces should be encoded',
  '//',
  '//a',
  '///a',
  '///',
  'http:///a',
  'rdar://1234',
  'h://test',
  'http:// shouldfail.com',
  ':// should fail',
  'ftps://foo.bar/',
  'http://3628126748',
];

fdescribe('Regular expression patterns', () => {

  describe('isValidURL', () => {
    it('should match valid urls', () => {
      validUrls.forEach(url => expect(isValidUrl(url)).toBeTruthy());
    });

    it('should fail invalid urls', () => {
      invalidUrls.forEach(url => expect(isValidUrl(url)).toBeFalsy());
    });
  });

  describe('MULTI_VALID_URL', () => {
    it('should match valid urls', () => {
      console.log(validUrls.join(' ').match(MULTI_VALID_URL));
    });
  });

  describe('SIMILAR_URL', () => {

    it('should catch domain group', waitForAsync(() => {
      const url = 'https://www.behave.properly/with/a/path?and=query';
      const url1 = 'https://not.behave.properly/with/a/path?and=query';

      const expected = 'behave.properly';
      const actual = url.match(SIMILAR_URL)[1];

      expect(actual).toBe(expected);

      const expected1 = 'not.behave.properly';
      const actual1 = url1.match(SIMILAR_URL)[1];

      expect(actual1).toBe(expected1);
    }));
  });

  describe('createSimilarUrlRegExpString', () => {

    it('should create a regular expression that matches on similar domains', () => {
      const urlFromDatabase = 'https://behave.properly/with/a/path?and=query';
      const url = 'https://www.behave.properly/with/a/path?and=query';

      const regexp = new RegExp(createSimilarDomainRegExpString(url));

      expect(urlFromDatabase).toMatch(regexp);
    });
  });

});
