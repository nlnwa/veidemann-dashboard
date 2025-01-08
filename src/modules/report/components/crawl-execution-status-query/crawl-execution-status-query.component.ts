import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {CrawlExecutionStatusQuery} from '../../services';
import {QueryComponent} from '../../../commons/components';
import {ConfigObject} from '../../../../shared/models/config';
import {CrawlExecutionState, crawlExecutionStates} from '../../../../shared/models/report';

@Component({
    selector: 'app-crawl-execution-status-query',
    templateUrl: './crawl-execution-status-query.component.html',
    styleUrls: ['./crawl-execution-status-query.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CrawlExecutionStatusQueryComponent extends QueryComponent<CrawlExecutionStatusQuery> {
  readonly crawlExecutionStates = crawlExecutionStates;
  readonly CrawlExecutionState = CrawlExecutionState;

  @Input()
  crawlJobOptions: ConfigObject[];

  constructor(protected fb: UntypedFormBuilder) {
    super(fb);
  }

  protected createForm(): void {
    this.form = this.fb.group({
      stateList: null,
      seedId: '',
      jobId: '',
      jobExecutionId: '',
      startTimeFrom: '',
      startTimeTo: '',
      hasError: null,
      watch: null,
    });
  }
}
