import {ErrorHandler, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RunCrawlRequest} from '../../../api/controller/v1/controller_pb';
import {ControllerApiService} from './api/controller-api.service';
import {handleError} from '../../../shared/func';

@Injectable({providedIn: 'root'})
export class ControllerService {

  constructor(private api: ControllerApiService,
              private errorHandler: ErrorHandler) {
  }

  /**
   * @param jobId
   * @param seedId
   * @returns jobExecutionId
   */
  runCrawl(jobId: string, seedId: string): Observable<string> {
    const req = new RunCrawlRequest();
    req.setJobId(jobId);
    req.setSeedId(seedId);
    return this.api.runCrawl(req).pipe(handleError(this.errorHandler, ''));
  }
}
