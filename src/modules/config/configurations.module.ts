import {NgModule} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

import {CommonsModule} from '../commons/commons.module';
import {LogResolver, OptionsResolver} from './services';
import {ConfigurationsRoutingModule} from './routing/configurations-routing.module';
import {ConfigurationsComponent, LoglevelComponent} from './containers';
import {
  BrowserConfigDetailsComponent,
  BrowserConfigDetailsMultiComponent,
  BrowserScriptDetailsComponent,
  BrowserScriptDetailsMultiComponent,
  BrowserScriptDirective,
  CollectionDetailsComponent,
  ConfigListComponent,
  ConfigQueryComponent,
  CrawlConfigDetailsComponent,
  CrawlConfigDetailsMultiComponent,
  CrawlHostGroupConfigDetailsComponent,
  CrawlHostGroupConfigDetailsMultiComponent,
  CrawlJobDetailsComponent,
  CrawlJobDetailsMultiComponent,
  DeleteDialogComponent,
  DeleteMultiDialogComponent,
  DetailComponent,
  DetailMultiComponent,
  EntityDetailsComponent,
  EntityDetailsMultiComponent,
  EntityViewComponent,
  LabelComponent,
  MetaComponent,
  PolitenessConfigDetailsComponent,
  PolitenessConfigDetailsMultiComponent,
  RoleMappingDetailsComponent,
  RoleMappingDetailsMultiComponent,
  RoleMappingListComponent,
  ScheduleDetailsComponent,
  ScheduleDetailsMultiComponent,
  SeedDetailComponent,
  SeedDetailMultiComponent,
  SeedMetaComponent,
  SelectorComponent
} from './components';
import {ActionDirective, DetailDirective} from './directives';


@NgModule({
  declarations: [
    ConfigurationsComponent,
    CrawlJobDetailsComponent,
    CrawlJobDetailsMultiComponent,
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
    BrowserScriptDirective,
    RoleMappingListComponent,
    RoleMappingDetailsComponent,
    RoleMappingDetailsMultiComponent,
    DetailDirective,
    CollectionDetailsComponent,
    DeleteDialogComponent,
    DeleteMultiDialogComponent,
    ConfigQueryComponent,
    DetailComponent,
    DetailMultiComponent,
    ConfigListComponent,
    LabelComponent,
    SelectorComponent,
    MetaComponent,
    SeedMetaComponent,
    EntityDetailsComponent,
    EntityDetailsMultiComponent,
    SeedDetailComponent,
    SeedDetailMultiComponent,
    ActionDirective,
    EntityViewComponent,
  ],
  entryComponents: [
    DeleteMultiDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    CommonsModule,
    ConfigurationsRoutingModule,
  ],
  providers: [
    OptionsResolver,
    LogResolver,
    {provide: MAT_DATE_LOCALE, useValue: 'nb-NO'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class ConfigurationsModule {
}
