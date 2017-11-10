import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ActivityComponent} from './activity';
import {DocumentationComponent} from './documentation/documentation.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {ScheduleListComponent} from './configurations/schedule/';
import {CrawlConfigListComponent} from './configurations/crawlconfig/';
import {BrowserConfigListComponent} from './configurations/browserconfig/';
import {PolitenessConfigListComponent} from './configurations/politenessconfig/';
import {BrowserscriptListComponent} from './configurations/browserscript/';
import {LoglevelComponent} from './configurations/logs/';
import {CrawlHostGroupConfigListComponent} from './configurations/crawlhostgroupconfig/';
import {SearchComponent} from './search/search.component';
import {CrawlJobsComponent} from './configurations/crawljobs/crawljobs-page.component';
import {SchedulePageComponent} from './configurations/schedule/schedule-page.component';
import {CrawlHostGroupConfigPageComponent} from './configurations/crawlhostgroupconfig/crawlhostgroupconfig-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/activity',
    pathMatch: 'full'
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
    //component: ScheduleListComponent
    component: SchedulePageComponent
  },
  {
    path: 'crawlconfig',
    component: CrawlConfigListComponent
  },
  {
    path: 'crawlhostgroupconfig',
    //component: CrawlHostGroupConfigListComponent
    component: CrawlHostGroupConfigPageComponent
  },
  {
    path: 'browserconfig',
    component: BrowserConfigListComponent
  },
  {
    path: 'browserscript',
    component: BrowserscriptListComponent
  },
  {
    path: 'politenessconfig',
    component: PolitenessConfigListComponent
  },
  {
    path: 'logconfig',
    component: LoglevelComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {}
