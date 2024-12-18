import {NgModule} from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTreeModule} from '@angular/material/tree';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {
  DayjsDateAdapter,
  MAT_DAYJS_DATE_ADAPTER_OPTIONS,
  MAT_DAYJS_DATE_FORMATS,
  MatDayjsDateAdapterModule
} from '../dayjs-date-adapter';
import {LocaleService} from "../core/services";

const modules = [
  MatTabsModule,
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
  MatDayjsDateAdapterModule,
  MatButtonToggleModule,
  MatProgressBarModule,
  MatBadgeModule,
  MatDividerModule,
  MatAutocompleteModule,
  MatTreeModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    {
      provide: DateAdapter,
      useClass: DayjsDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_DAYJS_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DAYJS_DATE_ADAPTER_OPTIONS, useValue: {useUtc: false}},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'auto'}},
    {provide: MAT_DATE_FORMATS, useValue: MAT_DAYJS_DATE_FORMATS},
    {
      provide: MAT_DATE_LOCALE,
      useFactory: (localeService: LocaleService) => localeService.getLocale(),
      deps: [LocaleService]
    },
  ]
})
export class MaterialModule {
}
