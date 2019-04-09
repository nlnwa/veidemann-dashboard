import {NgModule} from '@angular/core';
import {EventRoutingModule} from './routing/event-routing.module';
import {EventService} from './services/event.service';
import {EventListComponent} from './component/event-list/event-list.component';
import {EventDetailsComponent} from './component/event-details/event-details.component';
import {EventPageComponent} from './containers/event-page.component';
import {EventNewSeedComponent} from './component/event-new-seed/event-new-seed.component';
import {EventWarcErrorComponent} from './component/event-warc-error/event-warc-error.component';
import {EventDetailsMultiComponent} from './component/event-details-multi/event-details-multi.component';
import {CommonsModule} from '../commons/commons.module';
import {ConfigurationsModule} from '../configurations/configurations.module';
import {EventSearchComponent} from './containers/event-search/event-search.component';

@NgModule({
  declarations: [
    EventListComponent,
    EventDetailsComponent,
    EventPageComponent,
    EventNewSeedComponent,
    EventWarcErrorComponent,
    EventDetailsMultiComponent,
    EventSearchComponent,
  ],
  imports: [
    CommonsModule,
    EventRoutingModule,
    ConfigurationsModule,
  ],
  providers: [
    EventService
  ]
})
export class EventModule { }
