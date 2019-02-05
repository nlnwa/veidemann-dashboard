import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {ActivityComponent} from './core/activity';
import {DocumentationComponent} from './core/documentation/documentation.component';
import {StatisticsComponent} from './core/statistics/statistics.component';
import {LoglevelComponent} from './configurations/logs/';
import {SearchComponent} from './configurations/search';

import {GuardService} from './auth/guard.service';
import {Kind} from './commons/models/kind.model';
import {WarcStatusPageComponent} from './configurations/warcstatus/warcstatus-page.component';
import {Role} from './commons/models/configs/rolemapping.model';
import {ConfigurationsComponent} from './configurations/configurations.component';

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
    path: 'search',
    component: SearchComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.CRAWLENTITY,
      roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
    },
  },
  {
    path: 'crawljobs',
    component: ConfigurationsComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.CRAWLJOB,
      roles: [Role.CURATOR, Role.ADMIN],
    },
  },
  {
    path: 'crawljobs/:id',
    component: ConfigurationsComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.CRAWLJOB,
      roles: [Role.CURATOR, Role.ADMIN],
    },
  },
  {
    path: 'schedule',
    component: ConfigurationsComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.CRAWLSCHEDULECONFIG,
      roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
    },
  },
  {
    path: 'schedule/:id',
    component: ConfigurationsComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.CRAWLSCHEDULECONFIG,
      roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
    },
  },
  {
    path: 'crawlconfig',
    component: ConfigurationsComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.CRAWLCONFIG,
      roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
    },
  },
  {
    path: 'crawlconfig/:id',
    component: ConfigurationsComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.CRAWLCONFIG,
      roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
    },
  },
  {
    path: 'crawlhostgroupconfig',
    component: ConfigurationsComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.CRAWLHOSTGROUPCONFIG,
      roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
    },
  },
  {
    path: 'browserconfig',
    component: ConfigurationsComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.BROWSERCONFIG,
      roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
    },
  },
  {
    path: 'browserconfig/:id',
    component: ConfigurationsComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.BROWSERCONFIG,
      roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
    },
  },
  {
    path: 'browserscript',
    component: ConfigurationsComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.BROWSERSCRIPT,
      roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
    },
  },
  {
    path: 'browserscript/:id',
    component: ConfigurationsComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.BROWSERSCRIPT,
      roles: [Role.READONLY, Role.CURATOR, Role.ADMIN]
    },
  },
  {
    path: 'politenessconfig',
    component: ConfigurationsComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.POLITENESSCONFIG,
      roles: [Role.READONLY, Role.CURATOR, Role.ADMIN],
    },
  },
  {
    path: 'politenessconfig/:id',
    component: ConfigurationsComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.POLITENESSCONFIG,
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
    component: ConfigurationsComponent,
    // component: BrowserConfigPageComponent,
    canActivate: [GuardService],
    data: {
      kind: Kind.ROLEMAPPING,
      roles: [Role.ADMIN],
    },
  },
  {
    path: 'validator',
    component: WarcStatusPageComponent,
    canActivate: [GuardService],
    data: {
      roles: [Role.CURATOR, Role.ADMIN],
    },
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
