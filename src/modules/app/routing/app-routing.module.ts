import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {GuardService} from '../../core/services/auth';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'config',
    pathMatch: 'full'
  },
  {
    path: 'config',
    loadChildren: () => import('../../config/configurations.module').then(m => m.ConfigurationsModule),
    canLoad: [GuardService]
  },
  {
    path: 'report',
    loadChildren: () => import('../../report/report.module').then(m => m.ReportModule),
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
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
