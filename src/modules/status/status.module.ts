import {NgModule} from '@angular/core';
import {StatisticsComponent} from './statistics/statistics.component';
import {CommonsModule} from '../commons/commons.module';
import {StatusRoutingModule} from './routing/status-routing.module';

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonsModule,
    StatusRoutingModule,
  ]
})
export class StatusModule {
}
