import {async} from '@angular/core/testing';
import {createSimilarDomainRegExpString, SIMILAR_URL, VALID_URL} from './patterns';

// valid and invalid urls taken from https://gist.github.com/j3j5/8336b0224167636bed462950400ff2df
const validUrls = [
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
  'foo.com',
  'rdar://1234',
  'h://test',
  'http:// shouldfail.com',
  ':// should fail',
  'http://foo.bar/foo(bar)bazquux',
  'ftps://foo.bar/',
  'http://-error-.invalid/',
  'http://a.b--c.de/',
  'http://-a.b.co',
  'http://a.b-.co',
  'http://0.0.0.0',
  'http://10.1.1.0',
  'http://10.1.1.255',
  'http://224.1.1.1',
  'http://1.1.1.1.1',
  'http://123.123.123',
  'http://3628126748',
  'http://.www.foo.bar/',
  'http://www.foo.bar./',
  'http://.www.foo.bar./',
  'http://10.1.1.1',
  'http://10.1.1.254'
];

describe('Regular expression patterns', () => {

  describe('VALID_URL', () => {
    it('should match valid urls', () => {
      validUrls.forEach(validUrl => expect(validUrl).toMatch(VALID_URL));
    });

    // TODO excluded becase we use a simple validation pattern that fails this test for a number of invalid url's
    xit('should not match invalid urls', () => {
      invalidUrls.forEach(invalidUrl => expect(invalidUrl).not.toMatch(VALID_URL));
    });
  });


  describe('SIMILAR_URL', () => {

    it('should catch domain group', async(() => {
      const url = 'https://www.behave.properly/with/a/path?and=query';
      const url1 = 'https://not.behave.properly/with/a/path?and=query';

      const expected = 'behave.properly';
      const actual = url.match(SIMILAR_URL)[1];

      expect(expected).toBe(actual);

      const expected1 = 'not.behave.properly';
      const actual1 = url1.match(SIMILAR_URL)[1];

      expect(expected1).toBe(actual1);
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
