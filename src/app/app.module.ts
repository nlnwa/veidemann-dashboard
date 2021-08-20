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
  ],
  entryComponents: [
    ErrorDialogComponent,
    CrawlerStatusDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonsModule,
    CoreModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
