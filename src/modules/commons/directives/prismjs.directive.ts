import {AfterViewChecked, Directive, ElementRef, NgZone} from '@angular/core';

import * as Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';

// import 'prismjs/plugins/match-braces/prism-match-braces';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements AfterViewChecked {
  private done = false;

  constructor(private elementRef: ElementRef, private zone: NgZone) {
  }

  /**
   * Straight out of
   * https://github.com/JayChase/angular2-highlight-js/blob/master/projects/angular-highlight-js/src/lib/content/content.directive.ts
   */
  ngAfterViewChecked() {
    if (!this.done) {
      const selector = 'code';

      if (this.elementRef.nativeElement.innerHTML && this.elementRef.nativeElement.querySelector) {
        const snippets = this.elementRef.nativeElement.querySelectorAll(
          selector
        );
        this.zone.runOutsideAngular(() => {
          for (const snippet of snippets) {
            Prism.highlightElement(snippet);
          }
        });

        this.done = true;
      }
    }
  }
}
