import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';

import {ReportService} from '../../core/services/report/report.service';
import {ConfigObject} from '../../commons/models/config';
import {JobExecutionStatus} from '../../commons/models/report';


@Pipe({
  name: 'getJobStatus'
})
export class JobStatusPipe implements PipeTransform {

  constructor(private reportService: ReportService) {
  }

  transform(configObject: ConfigObject): Observable<JobExecutionStatus> {
    return this.reportService.getLastJobStatus(configObject.id);
  }
}
