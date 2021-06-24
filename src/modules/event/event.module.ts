import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventRoutingModule} from './routing/event.routing.module';
import {EventListComponent} from './components/event-list/event-list.component';
import {CommonsModule} from '../commons';
import {EventQueryComponent} from './components/event-query/event-query.component';
import {QueryEventDirective} from './directives/query-event.directive';
import {EventPreviewComponent} from './components/event-preview/event-preview.component';
import {EventChangeComponent} from './components/event-change/event-change.component';
import {EventActivityComponent} from './components/event-activity/event-activity.component';
import {EventDetailsComponent} from './components/event-details/event-details.component';
import {EventDialogComponent} from './components/event-dialog/event-dialog.component';
import {EventAlternativeSeedComponent} from './components/event-types/event-alternative-seed/event-alternative-seed';
import {ConfigService} from '../commons/services';
import {ConfigurationsModule} from '../config/configurations.module';
import { EventShortcutsComponent } from './components/event-shortcuts/event-shortcuts.component';
import { EventActionShortcutsComponent } from './components/event-shortcuts/event-action-shortcuts/event-action-shortcuts.component';
import { EventFilterShortcutsComponent } from './components/event-shortcuts/event-filter-shortcuts/event-filter-shortcuts.component';
import { EventAlternativeSeedDialogComponent } from './components/event-types/event-alternative-seed/event-alternative-seed-dialog/event-alternative-seed-dialog.component';
import { EventsComponent } from './containers/events/events.component';
import { EventComponent } from './containers/event/event.component';
import { EventCountPipe } from './pipe/event-count.pipe';


@NgModule({
  declarations: [
    EventListComponent,
    EventQueryComponent,
    QueryEventDirective,
    EventPreviewComponent,
    EventChangeComponent,
    EventActivityComponent,
    EventDetailsComponent,
    EventDialogComponent,
    EventAlternativeSeedComponent,
    EventShortcutsComponent,
    EventActionShortcutsComponent,
    EventFilterShortcutsComponent,
    EventAlternativeSeedDialogComponent,
    EventsComponent,
    EventComponent,
    EventCountPipe,
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    CommonsModule,
    ConfigurationsModule
  ],
  exports: [
    EventCountPipe
  ],
  providers: [ConfigService]
})
export class EventModule {
}
