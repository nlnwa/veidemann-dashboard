import { Component, OnInit } from '@angular/core';
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
  //
  //
  // ngAfterViewInit(): void {
  //   this.form.valueChanges.subscribe(value => {
  //     const queryParams = {
  //       uri: value.uri || null,
  //       job_execution_id: value.jobExecutionId || null,
  //       execution_id: value.executionId || null,
  //     };
  //     this.list.reset();
  //     this.router.navigate([], {
  //       relativeTo: this.route,
  //       queryParamsHandling: 'merge',
  //       queryParams: {...queryParams, id: null}
  //     }).catch(error => this.errorService.dispatch(error));
  //   });
  // }
}
