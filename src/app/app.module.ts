import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {UserService} from "./users/users.service";
import {ROUTES} from "./routes";
import {UserComponent} from "./users/user-list/user-list.component";
import {UserDetailsComponent} from "./users/user-details/user-details.component";
import {DocumentationComponent} from "./documentation/documentation.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {ActivityComponent} from "./activity/activity.component";
import {CrawlersComponent} from "./crawlers/crawlers.component";
import {StatisticsService} from "./statistics/statistics.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MdlModule} from "angular2-mdl";
import {AngularMultiSelectModule} from "./angular2-multiselect-dropdown/angular2-multiselect-dropdown";

//Barrels - importing index.ts from components.
import {SeedSearchComponent, SeedService, SeedsComponent, SeedDetailComponent} from "./seeds";
import {BrowserconfigDetailsComponent, BrowserconfigListComponent, BrowserconfigService} from "./configurations/browserconfig";
import {BrowserscriptListComponent,BrowserscriptDetailsComponent,BrowserscriptService} from "./configurations/browserscript";
import {CrawlconfigListComponent, CrawlconfigDetailsComponent, CrawlconfigService} from "./configurations/crawlconfig";
import {CrawljobDetailsComponent, CrawljobListComponent, CrawljobService} from "./configurations/crawljobs";
import {PolitenessconfigDetailsComponent,PolitenessconfigListComponent,PolitenessconfigService} from "./configurations/politenessconfig";
import {ScheduleListComponent,ScheduleDetailsComponent,ScheduleSidebarComponent,ScheduleService} from "./configurations/schedule";
import {EntityDetailsComponent, EntityListComponent, EntityService} from "./entities";
import {ModalComponent, DateTime, ErrorHandlerService, Collapse} from "./commons";
import {LogService, LoglevelComponent} from "./configurations/logs/";



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
    ScheduleListComponent,
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
