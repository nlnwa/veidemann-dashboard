import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {SnackBarService} from './snack-bar/snack-bar.service';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {LabelsComponent} from './labels/labels.component';
import {MetaComponent} from './meta/meta.component';
import {RouterModule} from '@angular/router';
import {SelectionBaseListComponent} from './list/selection-base-list/selection-base-list';
import {BaseListComponent} from './list';
import {ConfigRefComponent} from './configref/configref.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    LabelsComponent,
    MetaComponent,
    SelectionBaseListComponent,
    BaseListComponent,
    ConfigRefComponent
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
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SelectionBaseListComponent,
    BaseListComponent,
    ConfigRefComponent
  ],
  providers: [DatePipe],
})
export class CommonsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonsModule,
      providers: [
        DatePipe,
        SnackBarService,
      ],
    };
  }
}
