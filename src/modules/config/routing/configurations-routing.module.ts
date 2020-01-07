import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ConfigurationsComponent, LoglevelComponent} from '../containers';
import {LogResolver, OptionsResolver} from '../services';
import {GuardService} from '../../core/services/auth';

const routes: Routes = [
  {
    path: 'logconfig',
    component: LoglevelComponent,
    resolve: {
      levels: LogResolver
    },
    canActivate: [GuardService]
  },
  {
    path: ':kind',
    component: ConfigurationsComponent,
    resolve: {
      options: OptionsResolver
    },
    canActivate: [GuardService]
  },
  {
    path: '',
    component: ConfigurationsComponent,
    resolve: {
      options: OptionsResolver
    },
    canActivate: [GuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule {
}
