import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ActivityComponent} from './activity';
import {SeedDetailComponent, SeedsComponent, SeedSearchComponent} from './seeds/';
import {CrawljobListComponent} from './configurations/crawljobs/';
import {CrawlersComponent} from './crawlers';
import {DocumentationComponent} from './documentation';
import {StatisticsComponent} from './statistics';
import {ScheduleListComponent} from './configurations/schedule/';
import {CrawlconfigListComponent} from './configurations/crawlconfig/';
import {BrowserconfigListComponent} from './configurations/browserconfig/';
import {PolitenessconfigListComponent} from './configurations/politenessconfig/';
import {EntityDetailsComponent, EntityListComponent} from './entities/';
import {BrowserscriptListComponent} from './configurations/browserscript/';
import {LoglevelComponent} from './configurations/logs/';
import {CrawlhostgroupconfigListComponent} from "./configurations/crawlhostgroupconfig/crawlhostgroupconfig-list/crawlhostgroupconfig-list.component";

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
    component: CrawljobListComponent
  },
  {
    path: 'crawlers',
    component: CrawlersComponent
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
    component: CrawlconfigListComponent
  },
  {
    path: 'crawlhostgroupconfig',
    component: CrawlhostgroupconfigListComponent
  },
  {
    path: 'browserconfig',
    component: BrowserconfigListComponent
  },
  {
    path: 'browserscript',
    component: BrowserscriptListComponent
  },
  {
    path: 'politenessconfig',
    component: PolitenessconfigListComponent
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
