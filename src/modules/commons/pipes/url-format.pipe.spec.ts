import {UrlFormatPipe} from './url-format.pipe';
import {TestBed} from '@angular/core/testing';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

describe('UrlFormatPipe', () => {

  let pipe: UrlFormatPipe;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
      declarations: [UrlFormatPipe],
      providers: [
        UrlFormatPipe
      ]
    });
  }));

  it('should create an instance', () => {
    pipe = TestBed.inject(UrlFormatPipe);
    expect(pipe).toBeTruthy();
  });

  const testcase = {
    url: 'http://example.com?test=1', formattedUrl: 'http://example.com/'
  };

  it('should return a link without stripping queryparams', () => {
    const domSanitizer = TestBed.get(DomSanitizer);
    const pipe = new UrlFormatPipe(domSanitizer);
    const safeResourceUrl = pipe.transform(testcase.url, false);
    // TODO: Runs, but too fragile locator. Does not have access to DOM
    const expected = domSanitizer.bypassSecurityTrustHtml('<a class="formattedUri" href="' + testcase.url + '" target="_blank">' + testcase.url + '</a> ');
    expect(safeResourceUrl).toEqual(expected);
  });

  it('should return a link with stripping queryparams', () => {
    const domSanitizer = TestBed.get(DomSanitizer);
    const pipe = new UrlFormatPipe(domSanitizer);
    const safeResourceUrl = pipe.transform(testcase.url, true);
    const expected = domSanitizer.bypassSecurityTrustHtml('<a class="formattedUri" href="' + testcase.url + '" target="_blank">' + testcase.formattedUrl + '</a> ');
    expect(safeResourceUrl).toEqual(expected);
  });

});
