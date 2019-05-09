import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EventObject} from '../../../commons/models';

@Component({
  selector: 'app-event-warc-error',
  templateUrl: './event-warc-error.component.html',
  styleUrls: ['./event-warc-error.component.css']
})
export class EventWarcErrorComponent implements OnChanges {



  @Input()
  eventObject: EventObject;

  form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.eventObject) {
      if (!this.eventObject) {
        this.form.reset();
      } else {
        this.updateForm();
      }
    }
  }


  private createForm() {
    this.form = this.fb.group({
      error: '',
      errorText: ''
    });
  }

  updateForm() {
    let error = '';
    let errorText = '';
    for (const data of this.eventObject.dataList) {
      if (data.key === 'INVALID_EXPECTED') {
        error = data.value;
      }
      if (data.key === 'Ikke-kompatibel warc ID') {
        errorText = data.value;
      }
    }
    this.form.patchValue({
      error: error,
      errorText: errorText
    });
  }
}
