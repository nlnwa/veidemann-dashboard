import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MaterialModule} from './material.module';
import {BaseListComponent, LabelsComponent, MetaComponent, ToolbarComponent} from './components';


@NgModule({
  declarations: [
    ToolbarComponent,
    LabelsComponent,
    MetaComponent,
    BaseListComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    ToolbarComponent,
    LabelsComponent,
    MetaComponent,
    BaseListComponent,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
})
export class CommonsModule {
}
