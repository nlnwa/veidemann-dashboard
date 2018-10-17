import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[detail-host]',
})
export class DetailDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
