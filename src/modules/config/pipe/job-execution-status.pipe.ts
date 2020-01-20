import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';

import {ReportApiService} from '../../core/services/api/report-api.service';
import {ConfigObject} from '../../../shared/models/config';
import {JobExecutionStatus} from '../../../shared/models/report';


@Pipe({
  name: 'getJobStatus'
})
export class JobExecutionStatusPipe implements PipeTransform {

  constructor(private reportService: ReportApiService) {
  }

  transform(configObject: ConfigObject): Observable<JobExecutionStatus> {
    return this.reportService.getLastJobStatus(configObject.id);
  }
}
