import {NgModule} from '@angular/core';
import {NoPreloading, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {GuardService} from '../../core/services/auth';


const routes: Routes = [
  {
    path: 'config',
    loadChildren: () => import('../../config/configurations.module').then(m => m.ConfigurationsModule),
    canActivate: [GuardService],
  },
  {
    path: 'report',
    loadChildren: () => import('../../report/report.module').then(m => m.ReportModule),
    canActivate: [GuardService],
  },
  {
    path: 'validator',
    loadChildren: () => import('../../warc/warc.module').then(m => m.WarcModule),
    canActivate: [GuardService],
  },
  {
    path: 'logconfig',
    loadChildren: () => import('../../log/log.module').then(m => m.LogModule),
    canActivate: [GuardService],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: NoPreloading,
      relativeLinkResolution: 'corrected'
    }),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}

