import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfigObject, EventObject} from '../../../commons/models';

@Component({
  selector: 'app-event-new-seed',
  templateUrl: './event-new-seed.component.html',
  styleUrls: ['./event-new-seed.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventNewSeedComponent implements OnChanges {

  @Input()
  eventObject: EventObject;

  @Output()
  seedAssigned = new EventEmitter<ConfigObject>();

  form: FormGroup;

  crawlEntityId: string = null;
  seedId: string = null;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  get uri() {
    return this.form.get('uri').value;
  }

  get refUri() {
    return this.form.get('refUri').value;
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

  onSeedCreated(seed: ConfigObject) {
    this.seedAssigned.emit(seed);
  }

  private createForm() {
    this.form = this.fb.group({
      uri: '',
      refUri: ''
    });
  }

  private updateForm() {
    let uri = '';
    let refUri = '';

    for (const data of this.eventObject.dataList) {
      if (data.key === 'uri') {
        uri = data.value;
      }
      if (data.key === 'referring uri') {
        refUri = data.value;
      }
      if (data.key === 'seed') {
        this.seedId = data.value;
      }
      if (data.key === 'entity') {
        this.crawlEntityId = data.value;
      }
    }
    this.form.patchValue({
      uri: uri,
      refUri: refUri,
    });
  }
}
