import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from './material.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ActionDirective, ExtraDirective} from './directives';
import {NgxFilesizeModule} from 'ngx-filesize';


@NgModule({
  declarations: [
    ActionDirective,
    ExtraDirective,
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
    NgxFilesizeModule,
  ],
  providers: [DatePipe],
})
export class CommonsModule {
}
