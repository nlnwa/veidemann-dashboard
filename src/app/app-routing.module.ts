import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {ActivityComponent} from './core/activity';
import {DocumentationComponent} from './core/documentation/documentation.component';
import {StatisticsComponent} from './core/statistics/statistics.component';
import {LoglevelComponent} from './configurations/logs/';
import {SearchComponent} from './configurations/search';
import {CrawlJobsComponent} from './configurations/crawljobs';
import {SchedulePageComponent} from './configurations/schedule';
import {CrawlHostGroupConfigPageComponent} from './configurations/crawlhostgroupconfig';
import {PolitenessConfigPageComponent} from './configurations/politenessconfig';
import {BrowserConfigPageComponent} from './configurations/browserconfig';
import {BrowserScriptPageComponent} from './configurations/browserscript';
import {CrawlConfigPageComponent} from './configurations/crawlconfig/';
import {RoleMappingPageComponent} from './configurations/rolemapping';
import {GuardService} from './auth/guard.service';
import {Role} from './commons/models/config.model';


const routes: Routes = [
  {
    path: '',
    children: [
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
        path: 'search',
        component: SearchComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'crawljobs',
        component: CrawlJobsComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'crawljobs/:id',
        component: CrawlJobsComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'schedule',
        component: SchedulePageComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'schedule/:id',
        component: SchedulePageComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'crawlconfig',
        component: CrawlConfigPageComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'crawlconfig/:id',
        component: CrawlConfigPageComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'crawlhostgroupconfig',
        component: CrawlHostGroupConfigPageComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'browserconfig',
        component: BrowserConfigPageComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'browserconfig/:id',
        component: BrowserConfigPageComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'browserscript',
        component: BrowserScriptPageComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'browserscript/:id',
        component: BrowserScriptPageComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN]
        },
      },
      {
        path: 'politenessconfig',
        component: PolitenessConfigPageComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'politenessconfig/:id',
        component: PolitenessConfigPageComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'logconfig',
        component: LoglevelComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'rolemapping',
        component: RoleMappingPageComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.ADMIN],
        },
      },
    ]
  }
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
