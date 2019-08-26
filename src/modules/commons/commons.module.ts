import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from './material.module';
import {
  BaseListComponent,
  EntityDetailsComponent,
  EntityDetailsMultiComponent,
  LabelsComponent,
  MetaComponent,
  SeedDetailComponent,
  SeedDetailMultiComponent,
  ToolbarComponent
} from './components';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SeedMetaComponent} from './components/seed-meta/seed-meta.component';
import { SeedBaseListComponent } from './components/seed-base-list/seed-base-list.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    LabelsComponent,
    MetaComponent,
    SeedMetaComponent,
    BaseListComponent,
    EntityDetailsComponent,
    EntityDetailsMultiComponent,
    SeedDetailComponent,
    SeedDetailMultiComponent,
    SeedBaseListComponent,
  ],
  entryComponents: [
    EntityDetailsMultiComponent,
    SeedDetailMultiComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule,
  ],
  exports: [
    ToolbarComponent,
    LabelsComponent,
    MetaComponent,
    BaseListComponent,
    SeedBaseListComponent,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    SeedDetailComponent,
    SeedDetailMultiComponent,
    EntityDetailsComponent,
    EntityDetailsMultiComponent,
  ],
  providers: [DatePipe],
})
export class CommonsModule {
}
