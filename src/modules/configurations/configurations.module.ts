import {NgModule} from '@angular/core';

import {CommonsModule} from '../commons/commons.module';
import {DetailDirective} from './directives/detail.directive';
import {ConfigurationsComponent, LoglevelComponent, SearchComponent} from './containers';
import {OptionsResolver} from './services';
import {ConfigurationsRoutingModule} from './routing/configurations-routing.module';
import {
  BrowserConfigDetailsComponent,
  BrowserConfigDetailsMultiComponent,
  BrowserScriptDetailsComponent,
  BrowserScriptDetailsMultiComponent,
  BrowserScriptDirective,
  CollectionDetailsComponent,
  CollectionListComponent,
  CrawlConfigDetailsComponent,
  CrawlConfigDetailsMultiComponent,
  CrawlHostGroupConfigDetailsComponent,
  CrawlHostGroupConfigDetailsMultiComponent,
  CrawljobDetailsComponent,
  CrawljobDetailsMultiComponent,
  DeleteDialogComponent,
  PolitenessConfigDetailsComponent,
  PolitenessConfigDetailsMultiComponent,
  RoleMappingDetailsComponent,
  RoleMappingDetailsMultiComponent,
  RoleMappingListComponent,
  ScheduleDetailsComponent,
  ScheduleDetailsMultiComponent,
  SearchListComponent,
} from './components';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {SeedConfigurationsComponent} from './containers/seed-configurations/seed-configurations.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    SearchComponent,
    ConfigurationsComponent,
    CrawljobDetailsComponent,
    CrawljobDetailsMultiComponent,
    ScheduleDetailsComponent,
    ScheduleDetailsMultiComponent,
    CrawlConfigDetailsComponent,
    CrawlConfigDetailsMultiComponent,
    BrowserConfigDetailsComponent,
    BrowserConfigDetailsMultiComponent,
    PolitenessConfigDetailsComponent,
    PolitenessConfigDetailsMultiComponent,
    BrowserScriptDetailsComponent,
    BrowserScriptDetailsMultiComponent,
    LoglevelComponent,
    CrawlHostGroupConfigDetailsComponent,
    CrawlHostGroupConfigDetailsMultiComponent,
    SearchListComponent,
    BrowserScriptDirective,
    RoleMappingListComponent,
    RoleMappingDetailsComponent,
    RoleMappingDetailsMultiComponent,
    DetailDirective,
    CollectionDetailsComponent,
    CollectionListComponent,
    DeleteDialogComponent,
    SeedConfigurationsComponent
  ],
  entryComponents: [
    CrawljobDetailsMultiComponent,
    BrowserConfigDetailsMultiComponent,
    CrawlHostGroupConfigDetailsMultiComponent,
    BrowserScriptDetailsMultiComponent,
    CrawlConfigDetailsMultiComponent,
    ScheduleDetailsMultiComponent,
    PolitenessConfigDetailsMultiComponent,
    RoleMappingDetailsMultiComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonsModule,
    ConfigurationsRoutingModule,
    DragDropModule,
  ],
  exports: [
    SearchComponent,
  ],
  providers: [
    OptionsResolver,
    {provide: MAT_DATE_LOCALE, useValue: 'nb-NO'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class ConfigurationsModule {
}
