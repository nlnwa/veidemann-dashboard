import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ActivityComponent} from './activity';
import {DocumentationComponent} from './documentation/documentation.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {LoglevelComponent} from './configurations/logs/';
import {SearchComponent} from './search/search.component';
import {CrawlJobsComponent} from './configurations/crawljobs/crawljobs-page.component';
import {SchedulePageComponent} from './configurations/schedule/schedule-page.component';
import {CrawlHostGroupConfigPageComponent} from './configurations/crawlhostgroupconfig/crawlhostgroupconfig-page.component';
import {PolitenessConfigPageComponent} from './configurations/politenessconfig/politenessconfig-page.component';
import {BrowserConfigPageComponent} from './configurations/browserconfig/browserconfig-page.component';
import {BrowserScriptPageComponent} from './configurations/browserscript/browserscript-page.component';
import {CrawlConfigPageComponent} from './configurations/crawlconfig/';
import {RoleMappingPageComponent} from './rolemapping/rolemapping-page.component';
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
        path: 'crawljobs',
        component: CrawlJobsComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.CURATOR, Role.ADMIN],
        },
      },
      {
        path: 'documentation',
        component: DocumentationComponent
      },
      {
        path: 'statistics',
        component: StatisticsComponent
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
        path: 'schedule',
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
        path: 'browserscript',
        component: BrowserScriptPageComponent,
        canActivate: [GuardService],
        data: {
          roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
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
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
