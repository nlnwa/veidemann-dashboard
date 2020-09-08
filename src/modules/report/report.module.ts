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
  JobExecutionStatusComponent,
  JobExecutionStatusListComponent,
  JobExecutionStatusQueryComponent,
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
import {PageLogQueryComponent} from './components/page-log-query/page-log-query.component';
import {QueryPageLogDirective} from './directives/query-page-log.directive';
import {JobExecutionDetailComponent} from './containers/job-execution-detail/job-execution-detail.component';
import {SedPipe} from './pipe/sed.pipe';
import {AbortCrawlDialogComponent} from './components/abort-crawl-dialog/abort-crawl-dialog.component';

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
    SedPipe,
    PageLogQueryComponent,
    QueryPageLogDirective,
    JobExecutionDetailComponent,
    AbortCrawlDialogComponent,
  ],
  imports: [
    CommonsModule,
    ReportRoutingModule
  ],
  exports: [
    JobNamePipe,
    SeedNamePipe
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
