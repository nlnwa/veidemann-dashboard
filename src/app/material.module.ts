import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatPaginatorModule,
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatListModule,
  MatSidenavModule,
  MatIconModule,
  MatMenuModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatTableModule,
  MatRadioModule,
  MatChipsModule,
  MatTooltipModule,
  MatDialogModule,
  MatPaginatorModule,
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
