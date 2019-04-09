import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfigurationsComponent, LoglevelComponent, SearchComponent} from '../containers';
import {OptionsResolver} from '../services/options.resolver.service';
import {GuardService} from '../../core/services/auth';
import {Kind} from '../../commons/models';

const routes: Routes = [
  {
    path: 'search',
    component: SearchComponent,
    pathMatch: 'full',
    data: {
      kind: Kind.CRAWLENTITY
    },
    resolve: {
      options: OptionsResolver
    },
    canActivate: [GuardService]
  },
  {
    path: 'logconfig',
    component: LoglevelComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule {
}