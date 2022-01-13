import {UrlFormatPipe} from './url-format.pipe';
import {async, TestBed} from '@angular/core/testing';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

describe('UrlFormatPipe', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
      declarations: [UrlFormatPipe],
      providers: [
        UrlFormatPipe
      ]
    });
  }));

  it('should create an instance', () => {
    const domSanitizer = TestBed.get(DomSanitizer);
    const pipe = new UrlFormatPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });

  const testcase = {
    url: 'http://example.com?test=1', formattedUrl: 'http://example.com/'
  };

  it('should return a link without stripping queryparams', () => {
    const domSanitizer = TestBed.get(DomSanitizer);
    const pipe = new UrlFormatPipe(domSanitizer);
    const safeResourceUrl = pipe.transform(testcase.url, false);
    console.log('safe:', safeResourceUrl);
    // TODO: Runs, but too fragile locator. Does not have access to DOM
    const expected = domSanitizer.bypassSecurityTrustHtml('<a class="formattedUri" href="' + testcase.url + '" target="_blank">' + testcase.url + '</a> ');
    console.log('expected: ', expected);
    expect(safeResourceUrl).toEqual(expected);
  });

  it('should return a link with stripping queryparams', () => {
    const domSanitizer = TestBed.get(DomSanitizer);
    const pipe = new UrlFormatPipe(domSanitizer);
    const safeResourceUrl = pipe.transform(testcase.url, true);
    console.log('safe: ', safeResourceUrl);
    const expected = domSanitizer.bypassSecurityTrustHtml('<a class="formattedUri" href="' + testcase.url + '" target="_blank">' + testcase.formattedUrl + '</a> ');
    console.log('expected: ', expected);
    expect(safeResourceUrl).toEqual(expected);
  });

});
