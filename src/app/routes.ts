/**
 * Created by kristiana on 30.06.17.
 */
import {ActivityComponent} from "./activity/activity.component";
import {SeedsComponent} from "./seeds/create-seed/seeds.component";
import {CrawljobListComponent} from "./configurations/crawljobs/crawljob-list/crawljob-list.component";
import {CrawlersComponent} from "./crawlers/crawlers.component";
import {DocumentationComponent} from "./documentation/documentation.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {SeedSearchComponent} from "./seeds/seedsearch/seedsearch.component";
import {UserComponent} from "./users/user-list/user-list.component";
import {SeedDetailComponent} from "./seeds/seed-details/seed-details.component";
import {ScheduleComponent} from "./configurations/schedule/schedule-list/schedule-list.component";
import {CrawlconfigListComponent} from "./configurations/crawlconfig/crawlconfig-list/crawlconfig-list.component";
import {BrowserconfigListComponent} from "./configurations/browserconfig/browserconfig-list/browserconfig-list.component";
import {PolitenessconfigListComponent} from "./configurations/politenessconfig/politenessconfig-list/politenessconfig-list.component";
import {EntityListComponent} from "./entities/entity-list/entity-list.component";
import {EntityDetailsComponent} from "./entities/entity-details/entity-details.component";


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
    path: 'users',
    component: UserComponent
  },
  {
    path: 'seeds/:seed',
    component: SeedDetailComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
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
    path: 'politenessconfig',
    component: PolitenessconfigListComponent
  },

];
