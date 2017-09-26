import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ActivityComponent} from './activity';
import {SeedDetailComponent, SeedsComponent, SeedSearchComponent} from './seeds/';
import {CrawlJobListComponent} from './configurations/crawljobs/';
import {DocumentationComponent} from './documentation/documentation.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {ScheduleListComponent} from './configurations/schedule/';
import {CrawlConfigListComponent} from './configurations/crawlconfig/';
import {BrowserConfigListComponent} from './configurations/browserconfig/';
import {PolitenessConfigListComponent} from './configurations/politenessconfig/';
import {EntityDetailsComponent, EntityListComponent} from './entities/';
import {BrowserscriptListComponent} from './configurations/browserscript/';
import {LoglevelComponent} from './configurations/logs/';
import {CrawlHostGroupConfigListComponent} from './configurations/crawlhostgroupconfig/';

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
    path: 'entities',
    component: EntityListComponent
  },
  {
    path: 'entities/:entity',
    component: EntityDetailsComponent
  },
  {
    path: 'seeds',
    component: SeedsComponent
  },
  {
    path: 'crawljobs',
    component: CrawlJobListComponent
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
    path: 'seedsearch',
    component: SeedSearchComponent
  },
  {
    path: 'seeds/:seed',
    component: SeedDetailComponent
  },
  {
    path: 'schedule',
    component: ScheduleListComponent
  },
  {
    path: 'crawlconfig',
    component: CrawlConfigListComponent
  },
  {
    path: 'crawlhostgroupconfig',
    component: CrawlHostGroupConfigListComponent
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
