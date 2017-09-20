import {NgModule} from '@angular/core';
import {
  MdSnackBarModule,
  MdSlideToggleModule,
  MdListModule,
  MdSidenavModule,
  MdToolbarModule,
  MdIconModule,
  MdMenuModule,
  MdButtonModule,
  MdInputModule,
  MdCardModule,
  MdSelectModule,
  MdExpansionModule,
  MdCheckboxModule,
  MdTableModule,
  MdRadioModule,
} from '@angular/material';

const modules = [
  MdButtonModule,
  MdToolbarModule,
  MdSnackBarModule,
  MdSlideToggleModule,
  MdListModule,
  MdSidenavModule,
  MdIconModule,
  MdMenuModule,
  MdInputModule,
  MdCardModule,
  MdSelectModule,
  MdExpansionModule,
  MdCheckboxModule,
  MdTableModule,
  MdRadioModule,
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
