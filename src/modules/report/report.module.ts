import {NgModule} from '@angular/core';

import {CommonsModule} from '../commons/commons.module';

import {ReportComponent} from './containers/report/report.component';
import {ReportRoutingModule} from './routing/report-routing.module';
import {CrawlExecutionService, JobExecutionService, OptionsResolver} from './services';
import {JobExecutionComponent} from './components/job-execution/job-execution.component';
import {JobExecutionStatusComponent} from './components/job-execution-status/job-execution-status.component';
import {JobExecutionStatusListComponent} from './components/job-execution-status-list/job-execution-status-list.component';
import {JobNamePipe} from './pipe/job-name.pipe';
import {ConfigService} from '../core/services/config.service';
import {CrawlExecutionStatusComponent} from './components/crawl-execution-status/crawl-execution-status.component';
import {CrawlExecutionStatusListComponent} from './components/crawl-execution-status-list/crawl-execution-status-list.component';
import {SeedNamePipe} from './pipe/seed-name.pipe';
import {CrawlExecutionComponent} from './components/crawl-execution/crawl-execution.component';
import {PageLogListComponent} from './components/pagelog-list/pagelog-list.component';
import {PageLogComponent} from './components/pagelog/pagelog.component';
import {PageLogService} from './services/pagelog.service';
import { PageLogStatusComponent } from './components//pagelog-status/pagelog-status.component';
import { ResourceComponent } from './components/resource/resource.component';


@NgModule({
  declarations: [
    ReportComponent,
    JobExecutionComponent,
    JobExecutionStatusComponent,
    JobExecutionStatusListComponent,
    JobNamePipe,
    SeedNamePipe,
    CrawlExecutionStatusComponent,
    CrawlExecutionStatusListComponent,
    CrawlExecutionComponent,
    PageLogListComponent,
    PageLogComponent,
    PageLogStatusComponent,
    ResourceComponent
  ],
  imports: [
    CommonsModule,
    ReportRoutingModule
  ],
  providers: [
    JobExecutionService,
    CrawlExecutionService,
    OptionsResolver,
    ConfigService,
    PageLogService
  ]
})
export class ReportModule {
}
