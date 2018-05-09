import {StatisticsComponent} from './statistics/statistics.component';
import {ActivityComponent} from './activity';
import {CommonsModule} from '../commons/commons.module';
import {NgModule} from '@angular/core';
import {DocumentationComponent} from './documentation/documentation.component';

@NgModule({
  declarations: [
    DocumentationComponent,
    StatisticsComponent,
    ActivityComponent,
  ],
  imports: [
    CommonsModule,
  ],
  exports: [
    ActivityComponent,
    DocumentationComponent,
    StatisticsComponent,
  ],
})
export class CoreModule {
}
