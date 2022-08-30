import {NgModule} from '@angular/core';
import {LoglevelComponent} from './containers';
import {LogResolver} from './services';
import {LogRoutingModule} from './routing/log-routing.module';
import {CommonsModule} from '../commons';

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
  ]
})
export class LogModule {
}
