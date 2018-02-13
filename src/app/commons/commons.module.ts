import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../material.module';

import {SnackBarService} from './snack-bar/snack-bar.service';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {LabelsComponent} from './labels/labels.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    LabelsComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ToolbarComponent,
    LabelsComponent,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CommonsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CommonsModule,
      providers: [
        SnackBarService,
      ],
    };
  }
}
