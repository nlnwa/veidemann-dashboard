import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {Kind} from '../../../../shared/models';
import {ConfigQuery} from '../../../../shared/func';
import {ConfigOptions} from '../../func';
import {QueryComponent} from '../../../commons/components';


@Component({
  selector: 'app-config-query',
  styleUrls: ['config-query.component.scss'],
  templateUrl: './config-query.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigQueryComponent extends QueryComponent<ConfigQuery> implements OnChanges, AfterViewInit {
  readonly Kind = Kind;

  term: string;

  @Input()
  options: ConfigOptions;

  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  onQuery(query: ConfigQuery) {
    super.onQuery({term: this.term, ...query});
  }

  onSearch(term: string) {
    this.onQuery({...this.form.value, term});
  }

  protected createForm(): void {
    this.form = this.fb.group({
      entityId: '',
      scheduleId: '',
      crawlConfigId: '',
      collectionId: '',
      browserConfigId: '',
      politenessId: '',
      crawlJobIdList: {value: []},
      scriptIdList: {value: []},
      disabled: false,
    });
  }

  protected updateForm(): void {
    this.term = this.query.term;
    super.updateForm();
  }
}
