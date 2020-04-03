import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GuardService} from '../../core/services/auth';
import {ReportComponent} from '../containers/report/report.component';
import {JobExecutionComponent} from '../components/job-execution/job-execution.component';
import {CrawlExecutionComponent} from '../components/crawl-execution/crawl-execution.component';
import {OptionsResolver} from '../services/options.resolver.service';
import {PageLogComponent} from '../components/pagelog/pagelog.component';
import {CrawlLogComponent} from '../components/crawl-log/crawl-log.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    canActivate: [GuardService],
    children: [
      {
        path: 'crawlexecution',
        component: CrawlExecutionComponent,
        resolve: {
          options: OptionsResolver
        },
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
        resolve: {
          options: OptionsResolver
        } ,
      },
      {
        path: 'crawllog',
        component: CrawlLogComponent,
        resolve: {
          options: OptionsResolver
        },
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
