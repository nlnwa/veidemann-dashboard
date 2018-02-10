import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppConfig} from './app.config';
import {OAuthModule} from 'angular-oauth2-oidc';
import {AuthService, TokenInterceptor} from './auth';
import {ApplicationErrorHandler, ErrorService} from './error';
import {DialogComponent, ErrorDialogComponent} from './dialog';
import {ConfigurationsModule} from './configurations/configurations.module';
import {CommonsModule} from './commons/commons.module';
import {CoreModule} from './core/core.module';
import {TimeComponent} from './time/time.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    DialogComponent,
    TimeComponent,
  ],
  entryComponents: [ErrorDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    OAuthModule.forRoot(),
    CommonsModule.forRoot(),
    ConfigurationsModule.forRoot(),
    CoreModule,
  ],
  providers: [
    AppConfig,
    {provide: APP_INITIALIZER, useFactory: (appConfig: AppConfig) => () => appConfig.load(), deps: [AppConfig], multi: true},
    AuthService,
    ErrorService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ApplicationErrorHandler},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
