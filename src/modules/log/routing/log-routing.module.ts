import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LogResolver} from '../services';
import {LoglevelComponent} from '../containers';

const routes: Routes = [
  {
    path: '',
    component: LoglevelComponent,
    resolve: {
      levels: LogResolver
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule {
}
