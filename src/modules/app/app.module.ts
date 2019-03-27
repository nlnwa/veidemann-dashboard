import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './routing/app-routing.module';
import {CommonsModule} from '../commons/commons.module';
import {CoreModule} from '../core/core.module';
import {AppComponent, DialogComponent, ErrorDialogComponent, TimeComponent} from './components';


@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    DialogComponent,
    TimeComponent
  ],
  entryComponents: [ErrorDialogComponent],
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
