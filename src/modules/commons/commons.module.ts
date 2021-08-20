import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from './material.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ActionDirective, ExtraDirective, FilterDirective, HighlightDirective, ShortcutDirective} from './directives';
import {NgxFilesizeModule} from 'ngx-filesize';
import {DurationFormatPipe} from './pipes/duration-format.pipe';
import {UrlFormatPipe} from './pipes/url-format.pipe';
import {AbilityModule} from '@casl/angular';
import {EventCountPipe} from './pipes/event-count.pipe';


@NgModule({
  declarations: [
    ActionDirective,
    ExtraDirective,
    ShortcutDirective,
    FilterDirective,
    DurationFormatPipe,
    HighlightDirective,
    UrlFormatPipe,
    EventCountPipe,
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
    HighlightDirective,
    UrlFormatPipe,
    AbilityModule,
    EventCountPipe,
  ],
  providers: [
    DatePipe,
  ],
})
export class CommonsModule {
}
