import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {ActivityComponent} from './core/activity';
import {DocumentationComponent} from './core/documentation/documentation.component';
import {StatisticsComponent} from './core/statistics/statistics.component';
import {LoglevelComponent} from './configurations/logs/';

import {GuardService} from './auth/';
import {WarcStatusPageComponent} from './configurations/warcstatus/';
import {ConfigurationsComponent} from './configurations/configurations.component';
import {SearchComponent} from './configurations/search';
import {Kind} from './commons/models';
import {OptionsResolver} from './configurations/options.resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'activity',
    pathMatch: 'full',
  },
  {
    path: 'activity',
    component: ActivityComponent
  },
  {
    path: 'documentation',
    component: DocumentationComponent
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },
  {
    path: 'config/:kind',
    component: ConfigurationsComponent,
     resolve: {
       options: OptionsResolver
     },
    canActivate: [GuardService],
  },
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
  },
  {
    path: 'logconfig',
    component: LoglevelComponent,
    canActivate: [GuardService],
  },
  {
    path: 'validator',
    component: WarcStatusPageComponent,
    canActivate: [GuardService],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
