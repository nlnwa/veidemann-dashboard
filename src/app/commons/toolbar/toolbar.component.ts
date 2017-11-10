import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar>
      <h1 i18n="@@searchEntityToolbarHeader"><ng-content select=".toolbar--title"></ng-content></h1>
      <span class="fill-space"></span>
      <ng-content></ng-content>
    </mat-toolbar>
  `,
  styleUrls: [],
})
export class ToolbarComponent {
  @Input()
  title: string;
}
