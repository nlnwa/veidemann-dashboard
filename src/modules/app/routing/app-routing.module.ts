import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {GuardService} from '../../core/services/auth';

const routes: Routes = [
  {
    path: 'activity',
    loadChildren: '../../event/event.module#EventModule',
  },
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
