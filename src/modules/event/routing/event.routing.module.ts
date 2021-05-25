import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EventsComponent} from '../containers/events/events.component';
import {EventComponent} from '../containers/event/event.component';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  },
  {
    path: ':id',
    component: EventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EventRoutingModule {
}
