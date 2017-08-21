/**
 * Created by kristiana on 30.06.17.
 */
import {ActivityComponent} from "./activity/activity.component";
import {SeedsComponent, SeedDetailComponent, SeedSearchComponent} from "./seeds/";
import {CrawljobListComponent} from "./configurations/crawljobs/";
import {CrawlersComponent} from "./crawlers/crawlers.component";
import {DocumentationComponent} from "./documentation/documentation.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {ScheduleListComponent} from "./configurations/schedule/";
import {CrawlconfigListComponent} from "./configurations/crawlconfig/";
import {BrowserconfigListComponent} from "./configurations/browserconfig/";
import {PolitenessconfigListComponent} from "./configurations/politenessconfig/";
import {EntityListComponent, EntityDetailsComponent} from "./entities/";
import {BrowserscriptListComponent} from "./configurations/browserscript/";
import {LoglevelComponent} from "./configurations/logs/";


export const ROUTES = [
  {
    path: '',
    redirectTo: '/activity', pathMatch: 'full'
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
