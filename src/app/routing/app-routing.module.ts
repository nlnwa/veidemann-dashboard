import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';
import {GuardService} from '../../modules/core/services/auth';
import {HomeComponent} from '../components/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'config',
    loadChildren: () => import('../../modules/config/configurations.module').then(m => m.ConfigurationsModule),
    canActivate: [GuardService],
  },
  {
    path: 'report',
    loadChildren: () => import('../../modules/report/report.module').then(m => m.ReportModule),
    canActivate: [GuardService],
  },
  {
    path: 'logconfig',
    loadChildren: () => import('../../modules/log/log.module').then(m => m.LogModule),
    canActivate: [GuardService],
  },
  {
    path: 'event',
    loadChildren: () => import('../../event/event.module').then(m => m.EventModule),
    canActivate: [GuardService]
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

