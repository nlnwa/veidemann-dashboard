import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './routing/app-routing.module';
import {CommonsModule} from '../commons';
import {CoreModule} from '../core/core.module';
import {
  AboutDialogComponent,
  AppComponent,
  CrawlerStatusComponent,
  CrawlerStatusDialogComponent,
  DialogComponent,
  ErrorDialogComponent,
  TimeComponent,
} from './components';
import {AbilityModule} from '@casl/angular';
import {Ability, PureAbility} from '@casl/ability';
import {HomeComponent} from './components/home/home.component';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';
import {ScheduleOverviewComponent} from './components/schedule-overview/schedule-overview.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ScheduleEventDialogComponent } from './components/schedule-event-dialog/schedule-event-dialog.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    DialogComponent,
    TimeComponent,
    CrawlerStatusDialogComponent,
    CrawlerStatusComponent,
    AboutDialogComponent,
    HomeComponent,
    ScheduleOverviewComponent,
    ScheduleEventDialogComponent,
  ],
  entryComponents: [ErrorDialogComponent, CrawlerStatusDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonsModule,
    CoreModule,
    AbilityModule,
    FullCalendarModule,
    KeyboardShortcutsModule.forRoot()
  ],
  providers: [
    {provide: Ability, useValue: new Ability()},
    {provide: PureAbility, useExisting: Ability}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
