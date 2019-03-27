import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityComponent} from '../activity';

const routes: Routes = [
  {
    path: '',
    component: ActivityComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule {}
