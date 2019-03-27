import {NgModule} from '@angular/core';

import {CommonsModule} from '../commons/commons.module';
import {DetailDirective} from './directives/detail.directive';
import {SearchComponent} from './containers';
import {ConfigurationsComponent, LoglevelComponent} from './containers';
import {DataService, OptionsResolver} from './services';
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
  EntityDetailsComponent,
  EntityDetailsMultiComponent,
  PolitenessConfigDetailsComponent,
  PolitenessConfigDetailsMultiComponent,
  RoleMappingDetailsComponent,
  RoleMappingDetailsMultiComponent,
  RoleMappingListComponent,
  ScheduleDetailsComponent,
  ScheduleDetailsMultiComponent,
  SearchListComponent,
  SeedDetailComponent,
  SeedDetailMultiComponent
} from './components';

@NgModule({
  declarations: [
    SearchComponent,
    SeedDetailComponent,
    SeedDetailMultiComponent,
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
    EntityDetailsComponent,
    EntityDetailsMultiComponent,
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
  ],
  entryComponents: [
    CrawljobDetailsMultiComponent,
    EntityDetailsMultiComponent,
    SeedDetailMultiComponent,
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
  ],
  providers: [
    OptionsResolver,
    DataService
  ]
})
export class ConfigurationsModule {
}
