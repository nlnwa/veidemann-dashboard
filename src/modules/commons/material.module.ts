import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatBadgeModule
} from '@angular/material';

import {MatMomentDateModule} from '@angular/material-moment-adapter';

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
  MatSortModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatButtonToggleModule,
  MatProgressBarModule,
  MatBadgeModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {
}
