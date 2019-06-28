import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDetailHost]',
})
export class DetailDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
