import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {GuardService} from '../../core/services/auth';

const routes: Routes = [
  /*{
    path: 'activity',
    loadChildren: '../modules/activity/activity.module#ActivityModule',
  },
  {
    path: 'status',
    loadChildren: '../modules/status/status.module#StatusModule',
  },
  */
  {
    path: 'config',
    loadChildren: '../../configurations/configurations.module#ConfigurationsModule',
    canLoad: [GuardService]
  },
  {
    path: 'validator',
    loadChildren: '../../warc/warc.module#WarcModule',
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
