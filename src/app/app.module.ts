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
import {SeedsComponent} from "./seeds/seeds.component";
import {CrawlersComponent} from "./crawlers/crawlers.component";
import {StatisticsService} from "./statistics/statistics.service";
import {SeedsService} from "./seeds/seeds.service";
import {ModalComponent} from "./extras/modal.components";
import {SeedDetailComponent} from "./seeds/seed-details/seed-details.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown/angular2-multiselect-dropdown";
import {MdlModule} from "angular2-mdl";
import {Collapse} from "./extras/collapse.component";
import {CrawljobDetailsComponent} from "./crawljob/crawljob-details/crawljob-details.component";
import {CrawljobListComponent} from "./crawljob/crawljob-list/crawljob-list.component";
import {CrawljobService} from "./crawljob/crawljob.service";
import {ScheduleComponent} from "./crawljob/schedule/schedule-list/schedule.component";
import {ScheduleDetailsComponent} from "./crawljob/schedule/schedule-details/schedule-details.component";
import {CrawlconfigListComponent} from "./crawljob/crawlconfig/crawlconfig-list/crawlconfig-list.component";
import {CrawlconfigDetailsComponent} from "./crawljob/crawlconfig/crawlconfig-details/crawlconfig-details.component";
import {BrowserconfigDetailsComponent} from "./crawljob/browserconfig/browserconfig-details/browserconfig-details.component";
import {BrowserconfigListComponent} from "./crawljob/browserconfig/browserconfig-list/browserconfig-list.component";
import {PolitenessconfigDetailsComponent} from "./crawljob/politenessconfig/politenessconfig-details/politenessconfig-details.component";
import {PolitenessconfigListComponent} from "./crawljob/politenessconfig/politenessconfig-list/politenessconfig-list.component";


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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
