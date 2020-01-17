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

  transform(configObject: ConfigObject): Observable<CrawlExecutionStatus> {
    return this.reportService.getLastSeedStatus(configObject.id);
  }
}
