import {NgModule} from '@angular/core';
import {ActivityComponent} from './activity';
import {CommonsModule} from '../commons/commons.module';
import {ActivityRoutingModule} from './routing/activity-routing.module';

@NgModule({
  declarations: [
    ActivityComponent
  ],
  imports: [
    CommonsModule,
    ActivityRoutingModule
  ]
})
export class ActivityModule { }
