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
import { HomeComponent } from './components/home/home.component';
import {HealthCheckComponent} from './components/health-check/health-check.component';
import {HealthCheckStatusComponent} from './components/health-check/health-check-status/health-check-status.component';
import {KeyboardShortcutsModule} from 'ng-keyboard-shortcuts';


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
    HealthCheckComponent,
    HealthCheckStatusComponent,
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
        KeyboardShortcutsModule.forRoot()
    ],
  providers: [
    {provide: Ability, useValue: new Ability()},
    {provide: PureAbility, useExisting: Ability}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
