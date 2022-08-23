import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './routing/app-routing.module';
import {CommonsModule} from '../modules/commons';
import {CoreModule} from '../modules/core/core.module';
import {
  AboutDialogComponent,
  AppComponent,
  CrawlerStatusComponent,
  CrawlerStatusDialogComponent,
  DialogComponent,
  ErrorDialogComponent,
  TimeComponent,
} from './components';
import {HomeComponent} from './components/home/home.component';
import {ScheduleEventDialogComponent} from './components/schedule-event-dialog/schedule-event-dialog.component';
import {ScheduleOverviewComponent} from './components/schedule-overview/schedule-overview.component';
import {FullCalendarModule} from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

// register FullCalendar plugins
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
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
    ScheduleEventDialogComponent,
    ScheduleOverviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonsModule,
    CoreModule,
    FullCalendarModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
