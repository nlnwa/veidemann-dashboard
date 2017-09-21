import {NgModule} from '@angular/core';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdExpansionModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdRadioModule,
  MdSelectModule,
  MdSidenavModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTableModule,
  MdToolbarModule,
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