import {Component} from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {CrawlLogQuery} from '../../services';
import {QueryComponent} from '../../../commons/components';

@Component({
  selector: 'app-crawl-log-query',
  templateUrl: './crawl-log-query.component.html',
  styleUrls: ['./crawl-log-query.component.css']
})
export class CrawlLogQueryComponent extends QueryComponent<CrawlLogQuery> {

  constructor(protected fb: UntypedFormBuilder) {
    super(fb);
  }

  protected createForm(): void {
    this.form = this.fb.group({
      jobExecutionId: '',
      executionId: '',
      watch: null,
    });
  }
}
