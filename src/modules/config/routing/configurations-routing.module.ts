import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ConfigurationComponent, ConfigurationsComponent} from '../containers';
import {OptionsResolver} from '../services';
import {GuardService} from '../../core/services/auth';
import {ConfigComponent} from '../containers';
import {ConfigNavListComponent} from '../containers/config-nav-list/config-nav-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ConfigNavListComponent,
  },
  {
    path: ':kind',
    component: ConfigComponent,
    resolve: {
      options: OptionsResolver
    },
    canActivate: [GuardService],
    children: [
      {
        path: '',
        component: ConfigurationsComponent,
      },
      {
        path: ':id',
        component: ConfigurationComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule {
}
