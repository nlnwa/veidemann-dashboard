import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialModule} from '../material.module';

import {SnackBarService} from './snack-bar/snack-bar.service';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {LabelsComponent} from './labels/labels.component';
import {MetaComponent} from './meta/meta.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    ToolbarComponent,
    LabelsComponent,
    MetaComponent,
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
