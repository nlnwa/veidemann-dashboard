import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {SedPipe} from '../../report/pipe/sed.pipe';

@Pipe({
  name: 'urlFormat'
})
export class UrlFormatPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(url: string, stripQueryParams?: boolean): SafeHtml {
    let anchor = ``;

    if (stripQueryParams) {
      const urlStripped = new SedPipe().transform(url);
      anchor = `<a href="${url}" target="_blank">${urlStripped}</a> `;
    } else {
      anchor = `<a href="${url}" target="_blank">${url}</a> `;
    }
    return this.domSanitizer.bypassSecurityTrustHtml(anchor);
  }

  private stylize(text: string): string {
    let stylizedText = '';
    if (text && text.length > 0) {
      stylizedText += `<a href="${text}" target="_blank">${text}</a> `;
    }
    return stylizedText;
  }
}
