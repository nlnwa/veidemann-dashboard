import {NgModule} from '@angular/core';
import {EventRoutingModule} from './routing/event-routing.module';
import {EventService} from './services/event.service';
import {EventListComponent} from './component/event-list/event-list.component';
import {EventDetailsComponent} from './component/event-details/event-details.component';
import {EventPageComponent} from './containers/event-page.component';
import {EventNewSeedComponent} from './component/event-new-seed/event-new-seed.component';
import {EventWarcErrorComponent} from './component/event-warc-error/event-warc-error.component';
import {EventMultiUpdateComponent} from './component/event-multi-update/event-multi-update.component';
import {CommonsModule} from '../commons/commons.module';

@NgModule({
  declarations: [
    EventListComponent,
    EventDetailsComponent,
    EventPageComponent,
    EventNewSeedComponent,
    EventWarcErrorComponent,
    EventMultiUpdateComponent,
  ],
  imports: [
    CommonsModule,
    EventRoutingModule,
  ],
  providers: [
    EventService
  ]
})
export class EventModule { }
