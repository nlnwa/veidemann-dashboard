import {NgModule} from '@angular/core';
import {LoglevelComponent} from './containers';
import {CommonsModule} from '../commons/commons.module';
import {LogResolver, LogService} from './services';
import {LogRoutingModule} from './routing/log-routing.module';


@NgModule({
  declarations: [
    LoglevelComponent
  ],
  imports: [
    CommonsModule,
    LogRoutingModule
  ],
  providers: [
    LogResolver,
    LogService,
  ]
})
export class LogModule {
}
