import {NgModule} from '@angular/core';
import {CommonsModule} from '../commons/commons.module';
import {WarcStatusDetailsComponent, WarcStatusListComponent, WarcStatusSummaryComponent} from './components';
import {WarcStatusService} from './services/warcstatus.service';
import {WarcStatusPageComponent} from './containers/warcstatus-page.component';
import {WarcRoutingModule} from './routing/warc-routing.module';

@NgModule({
  declarations: [
    WarcStatusDetailsComponent,
    WarcStatusListComponent,
    WarcStatusPageComponent,
    WarcStatusSummaryComponent
  ],
  imports: [
    CommonsModule,
    WarcRoutingModule,
  ],
  providers: [
    WarcStatusService,
  ]
})
export class WarcModule {
}
