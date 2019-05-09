import {NgModule} from '@angular/core';
import {EventRoutingModule} from './routing/event-routing.module';
import {EventService} from '../core/services/event/event.service';
import {EventPageComponent} from './containers/event-page.component';
import {CommonsModule} from '../commons/commons.module';
import {ConfigurationsModule} from '../configurations/configurations.module';
import {EventSearchComponent} from './containers/event-search/event-search.component';
import {
  ChangelogComponent,
  EventDetailsComponent,
  EventDetailsMultiComponent,
  EventListComponent,
  EventNewSeedComponent,
  EventWarcErrorComponent
} from './component';

@NgModule({
  declarations: [
    EventListComponent,
    EventDetailsComponent,
    EventPageComponent,
    EventNewSeedComponent,
    EventWarcErrorComponent,
    EventDetailsMultiComponent,
    EventSearchComponent,
    ChangelogComponent,
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
export class EventModule {
}
