import {Component} from '@angular/core';
import {QueryComponent} from '../../../commons/components';
import {PageLogQuery} from '../../services';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-page-log-query',
  templateUrl: './page-log-query.component.html',
  styleUrls: ['./page-log-query.component.css']
})
export class PageLogQueryComponent extends QueryComponent<PageLogQuery> {

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  protected createForm(): void {
    this.form = this.fb.group({
      jobExecutionId: '',
      executionId: '',
      uri: '',
      watch: null,
    });
  }
}
