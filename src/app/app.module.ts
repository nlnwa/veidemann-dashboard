import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {UserService} from "./users/users.service";
import {ROUTES} from "./routes";
import {UserComponent} from "./users/user-list/user-list.component";
import {UserDetailsComponent} from "./users/user-details/user-details.component";
import {DocumentationComponent} from "./documentation/documentation.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {SeedSearchComponent} from "./seeds/seedsearch/seedsearch.component";
import {ActivityComponent} from "./activity/activity.component";
import {SeedsComponent} from "./seeds/create-seed/seeds.component";
import {CrawlersComponent} from "./crawlers/crawlers.component";
import {StatisticsService} from "./statistics/statistics.service";
import {SeedService} from "./seeds/seeds.service";
import {ModalComponent} from "./commons/components/modal.components";
import {DateTime} from "./commons/components/datetime";
import {ErrorHandlerService} from "./commons/components/errorhandlerservice";
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
import {RouterModule} from "@angular/router";
import {ScheduleSidebarComponent} from "./configurations/schedule/schedule-sidebar/schedule-sidebar.component";
import {ScheduleService} from "./configurations/schedule/schedule.service";
import {BrowserscriptListComponent} from "./configurations/browserscript/browserscript-list/browserscript-list.component";
import {BrowserscriptDetailsComponent} from "./configurations/browserscript/browserscript-details/browserscript-details.component";
import {EntityDetailsComponent} from "./entities/entity-details/entity-details.component";
import {EntityListComponent} from "./entities/entity-list/entity-list.component";
import {EntityService} from "./entities/entity.service";
import {BrowserscriptService} from "./configurations/browserscript/browserscript.service";
import { LoglevelComponent } from './configurations/logs/logconfig/loglevel.component';
import {LogService} from "./configurations/logs/log.service";


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
    ScheduleSidebarComponent,
    BrowserscriptListComponent,
    BrowserscriptDetailsComponent,
    EntityDetailsComponent,
    EntityListComponent,
    LoglevelComponent,

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
    SeedService,
    CrawljobService,
    CrawlconfigService,
    PolitenessconfigService,
    BrowserconfigService,
    DateTime,
    ErrorHandlerService,
    ScheduleService,
    EntityService,
    BrowserscriptService,
    LogService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
