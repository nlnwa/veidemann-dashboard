import {NgModule} from '@angular/core';

import {CommonsModule} from '../commons';
import {ConfigService} from '../commons/services';
import {ReportRoutingModule} from './routing';
import {
  CrawlExecutionComponent,
  CrawlLogComponent,
  JobExecutionComponent,
  PageLogComponent,
  ReportComponent,
  ReportNavigationListComponent,
} from './containers';
import {CrawlExecutionService, CrawlLogService, JobExecutionService, OptionsResolver, PageLogService} from './services';
import {
  CrawlExecutionDetailComponent,
  CrawlExecutionStatusComponent,
  CrawlExecutionStatusListComponent,
  CrawlExecutionStatusQueryComponent,
  CrawlLogListComponent,
  CrawlLogStatusComponent,
  JobExecutionStatusQueryComponent,
  JobExecutionStatusComponent,
  JobExecutionStatusListComponent,
  PageLogListComponent,
  PageLogStatusComponent,
  ResourceComponent,
} from './components';
import {JobNamePipe, SeedNamePipe} from './pipe';
import {QueryCrawlExecutionStatusDirective} from './directives';
import {QueryCrawlLogDirective} from './directives/query-crawl-log.directive';
import {CrawlLogQueryComponent} from './components/crawl-log-query/crawl-log-query.component';
import {CrawlLogDetailComponent} from './containers/crawl-log-detail/crawl-log-detail.component';
import {QueryJobExecutionStatusDirective} from './directives/query-job-execution-status.directive';
import { PageLogQueryComponent } from './components/page-log-query/page-log-query.component';
import {QueryPageLogDirective} from './directives/query-page-log.directive';

@NgModule({
  declarations: [
    ReportComponent,
    ReportNavigationListComponent,
    JobExecutionComponent,
    JobExecutionStatusComponent,
    JobExecutionStatusListComponent,
    CrawlExecutionStatusComponent,
    CrawlExecutionStatusListComponent,
    CrawlExecutionComponent,
    CrawlExecutionDetailComponent,
    PageLogListComponent,
    PageLogComponent,
    PageLogStatusComponent,
    ResourceComponent,
    CrawlLogComponent,
    CrawlLogListComponent,
    CrawlLogStatusComponent,
    JobExecutionStatusQueryComponent,
    CrawlExecutionStatusQueryComponent,
    QueryCrawlExecutionStatusDirective,
    QueryCrawlLogDirective,
    CrawlLogQueryComponent,
    CrawlLogDetailComponent,
    QueryJobExecutionStatusDirective,
    JobNamePipe,
    SeedNamePipe,
    PageLogQueryComponent,
    QueryPageLogDirective,
  ],
  imports: [
    CommonsModule,
    ReportRoutingModule
  ],
  exports: [
    JobNamePipe
  ],
  providers: [
    JobExecutionService,
    CrawlExecutionService,
    OptionsResolver,
    ConfigService,
    PageLogService,
    CrawlLogService,
  ]
})
export class ReportModule {
}
