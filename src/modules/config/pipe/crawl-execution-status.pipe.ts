import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';

import {ReportApiService} from '../../core/services/api/report-api.service';
import {ConfigObject} from '../../../shared/models/config';
import {CrawlExecutionStatus} from '../../../shared/models/report';


@Pipe({
  name: 'getCrawlExecutionStatus'
})
export class CrawlExecutionStatusPipe implements PipeTransform {

  constructor(private reportService: ReportApiService) {
  }

  transform(configObject: ConfigObject, pageSize?: number): Observable<CrawlExecutionStatus> {
    if (configObject && pageSize) {
      return this.reportService.getLastSeedStatus(configObject.id, pageSize);
    } else if (configObject && !pageSize) {
      return this.reportService.getLastSeedStatus(configObject.id);
    }
  }
}
