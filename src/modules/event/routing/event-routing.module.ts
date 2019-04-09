import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventPageComponent} from '../containers/event-page.component';
import {OptionsResolver} from '../../configurations/services';

const routes: Routes = [
  {
    path: '',
    component: EventPageComponent,
    pathMatch: 'full',
    resolve: {
      options: OptionsResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
