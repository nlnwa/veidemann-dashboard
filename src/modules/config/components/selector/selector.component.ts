import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Label} from '../../../../shared/models';
import {LabelService} from '../../services/label.service';
import {LabelComponent} from '../label/label.component';


@Component({
  selector: 'app-selector',
  templateUrl: '../label/label.component.html',
  styleUrls: ['../label/label.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: SelectorComponent, multi: true}],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorComponent extends LabelComponent implements OnInit {

  constructor(protected fb: UntypedFormBuilder,
              protected cdr: ChangeDetectorRef,
              protected labelService: LabelService) {
    super(fb, cdr, labelService);
  }

  ngOnInit(): void {
    // prevent fetching label by not calling super();
  }

  protected save(value: string): void {
    let key = '';
    value = value.trim();

    if (value === '') {
      return;
    }

    const parts = value.split(':');
    if (parts.length > 1) {
      key = parts.shift();
      value = parts.join(':');
    } else {
      key = parts[0].trim();
      value = '';
    }

    if (this.findLabelIndex(key, value) > -1) {
      return;
    }

    this.labels.push(new Label({key, value}));
  }

  protected createForm(): void {
    this.labelForm = this.fb.group({
      key: '',
      value: ''
    });
    this.labelForm.disable();
  }
}
