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
        component: CrawlJobsComponent
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
        component: SearchComponent
      },
      {
        path: 'schedule',
        component: SchedulePageComponent
      },
      {
        path: 'crawlconfig',
        component: CrawlConfigPageComponent
      },
      {
        path: 'crawlhostgroupconfig',
        component: CrawlHostGroupConfigPageComponent
      },
      {
        path: 'browserconfig',
        component: BrowserConfigPageComponent
      },
      {
        path: 'browserscript',
        component: BrowserScriptPageComponent
      },
      {
        path: 'politenessconfig',
        component: PolitenessConfigPageComponent
      },
      {
        path: 'logconfig',
        component: LoglevelComponent
      },
      {
        path: 'rolemapping',
        component: RoleMappingPageComponent
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
