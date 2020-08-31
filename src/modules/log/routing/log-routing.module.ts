import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LogResolver} from '../services';
import {GuardService} from '../../core/services/auth';
import {LoglevelComponent} from '../containers';

const routes: Routes = [
  {
    path: '',
    component: LoglevelComponent,
    resolve: {
      levels: LogResolver
    },
    canActivate: [GuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule {
}
