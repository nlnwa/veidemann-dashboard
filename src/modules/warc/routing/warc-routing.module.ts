import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WarcStatusPageComponent} from '../containers/warcstatus-page.component';
import {GuardService} from '../../core/services/auth';

const routes: Routes = [
  {
    path: '',
    component: WarcStatusPageComponent,
    pathMatch: 'full',
    canActivate: [GuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarcRoutingModule {
}
