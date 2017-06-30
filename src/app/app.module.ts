import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {UserService} from "./users/users.service";
import {UserComponent} from "./users/user-list/user-list.component";
import {UserDetailsComponent} from "./users/user-details/user-details.component";
import {DocumentationComponent} from "./documentation/documentation.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {SeedSearchComponent} from "./seeds/seedsearch/seedsearch.component";
import {ActivityComponent} from "./activity/activity.component";
import {SeedsComponent} from "./seeds/create-seed/seeds.component";
import {CrawlersComponent} from "./crawlers/crawlers.component";
import {StatisticsService} from "./statistics/statistics.service";
import {SeedsService} from "./seeds/seeds.service";
import {ModalComponent} from "./commons/components/modal.components";
import {SeedDetailComponent} from "./seeds/seed-details/seed-details.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularMultiSelectModule} from "./angular2-multiselect-dropdown/angular2-multiselect-dropdown";
import {MdlModule} from "angular2-mdl";
import {Collapse} from "./commons/components/collapse.component";
import {CrawljobDetailsComponent} from "./configurations/crawljobs/crawljob-details/crawljob-details.component";
import {CrawljobListComponent} from "./configurations/crawljobs/crawljob-list/crawljob-list.component";
import {CrawljobService} from "./configurations/crawljobs/crawljob.service";
import {ScheduleComponent} from "./configurations/schedule/schedule-list/schedule-list.component";
import {ScheduleDetailsComponent} from "./configurations/schedule/schedule-details/schedule-details.component";
import {CrawlconfigListComponent} from "./configurations/crawlconfig/crawlconfig-list/crawlconfig-list.component";
import {CrawlconfigDetailsComponent} from "./configurations/crawlconfig/crawlconfig-details/crawlconfig-details.component";
import {CrawlconfigService} from "./configurations/crawlconfig/crawlconfig.service";
import {BrowserconfigDetailsComponent} from "./configurations/browserconfig/browserconfig-details/browserconfig-details.component";
import {BrowserconfigListComponent} from "./configurations/browserconfig/browserconfig-list/browserconfig-list.component";
import {BrowserconfigService} from "./configurations/browserconfig/browserconfig.service";
import {PolitenessconfigDetailsComponent} from "./configurations/politenessconfig/politenessconfig-details/politenessconfig-details.component";
import {PolitenessconfigListComponent} from "./configurations/politenessconfig/politenessconfig-list/politenessconfig-list.component";
import {PolitenessconfigService} from "./configurations/politenessconfig/politenessconfig.service";


const ROUTES = [
  {
    path: '',
    redirectTo: '/activity', pathMatch: 'full'
  },
  {
    path: 'activity',
    component: ActivityComponent
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

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailsComponent,
    DocumentationComponent,
    StatisticsComponent,
    SeedSearchComponent,
    ActivityComponent,
    SeedsComponent,
    CrawlersComponent,
    ModalComponent,
    SeedDetailComponent,
    Collapse,
    CrawljobDetailsComponent,
    CrawljobListComponent,
    ScheduleComponent,
    ScheduleDetailsComponent,
    CrawlconfigListComponent,
    CrawlconfigDetailsComponent,
    BrowserconfigDetailsComponent,
    BrowserconfigListComponent,
    PolitenessconfigDetailsComponent,
    PolitenessconfigListComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    NgbModule.forRoot(),
    AngularMultiSelectModule,
    MdlModule,
  ],
  providers: [
    UserService,
    StatisticsService,
    SeedsService,
    CrawljobService,
    CrawlconfigService,
    PolitenessconfigService,
    BrowserconfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
