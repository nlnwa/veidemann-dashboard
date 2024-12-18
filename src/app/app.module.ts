import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonsModule,
    CoreModule,
    FullCalendarModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class AppModule {
}
