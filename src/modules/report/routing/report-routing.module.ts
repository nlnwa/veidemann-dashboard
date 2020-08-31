import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GuardService} from '../../core/services/auth';
import {ReportComponent} from '../containers/report/report.component';
import {JobExecutionComponent} from '../containers/job-execution/job-execution.component';
import {CrawlExecutionComponent} from '../containers/crawl-execution/crawl-execution.component';
import {OptionsResolver} from '../services/options.resolver.service';
import {PageLogComponent} from '../containers/page-log/pagelog.component';
import {CrawlLogComponent} from '../containers/crawl-log/crawl-log.component';
import {ReportNavigationListComponent} from '../containers/report-navigation-list/report-navigation-list.component';
import {CrawlExecutionDetailComponent} from '../containers/crawl-execution-detail/crawl-execution-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ReportNavigationListComponent
  },
  {
    path: '',
    component: ReportComponent,
    canActivate: [GuardService],
    children: [
      {
        path: 'crawlexecution',
        component: CrawlExecutionComponent,
      },
      {
        path: 'crawlexecution/:id',
        component: CrawlExecutionDetailComponent,
      },
      {
        path: 'jobexecution',
        component: JobExecutionComponent,
        resolve: {
          options: OptionsResolver
        },
      },
      {
        path: 'pagelog',
        component: PageLogComponent,
      },
      {
        path: 'crawllog',
        component: CrawlLogComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {
}
