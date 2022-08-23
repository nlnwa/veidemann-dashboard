import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from './material.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ActionDirective, ExtraDirective, FilterDirective, ShortcutDirective} from './directives';
import {NgxFilesizeModule} from 'ngx-filesize';
import {DurationFormatPipe} from './pipes/duration-format.pipe';
import {UrlFormatPipe} from './pipes/url-format.pipe';
import {AbilityModule} from '@casl/angular';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';


@NgModule({
  declarations: [
    ActionDirective,
    ExtraDirective,
    ShortcutDirective,
    FilterDirective,
    DurationFormatPipe,
    UrlFormatPipe,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule,
    NgxFilesizeModule,
    AbilityModule,
    KeyboardShortcutsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    ActionDirective,
    ExtraDirective,
    ShortcutDirective,
    FilterDirective,
    NgxFilesizeModule,
    DurationFormatPipe,
    UrlFormatPipe,
    AbilityModule,
    KeyboardShortcutsModule,
  ],
  providers: [
    DatePipe,
  ],
})
export class CommonsModule {
}
