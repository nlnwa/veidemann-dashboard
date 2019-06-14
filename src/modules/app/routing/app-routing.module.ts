import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {GuardService} from '../../core/services/auth';

const routes: Routes = [
  {
    path: 'activity',
    loadChildren: () => import('../../event/event.module').then(m => m.EventModule),
  },
  {
    path: 'config',
    loadChildren: () => import('../../configurations/configurations.module').then(m => m.ConfigurationsModule),
    canLoad: [GuardService]
  },
  {
    path: 'validator',
    loadChildren: () => import('../../warc/warc.module').then(m => m.WarcModule),
    canLoad: [GuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
