import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EventService} from '../../services/event.service';
import {EventObject} from '../../../commons/models';

@Component({
  selector: 'app-event-new-seed',
  templateUrl: './event-new-seed.component.html',
  styleUrls: ['./event-new-seed.component.css']
})
export class EventNewSeedComponent implements OnChanges {

  @Input()
  eventObject: EventObject;

  form: FormGroup;

  addSeedToEntity = false;
  createNewEntitySeed = false;


  constructor(private fb: FormBuilder, private eventService: EventService) {
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
      uri: '',
      refUri: '',
      entityName: '',
      seedUri: ''
    });
  }

  updateForm() {
    let uri = '';
    let refUri = '';
    for (const data of this.eventObject.dataList) {
      if (data.key === 'uri') {
        uri = data.value;
      }
      if (data.key === 'referring uri') {
        refUri = data.value;
      }
    }
    this.form.patchValue({
      uri: uri,
      refUri: refUri,
      seedUri: uri
    });
  }

  onToggleAddSeedToEntity() {
    this.createNewEntitySeed = false;
    if (this.addSeedToEntity) {
      this.addSeedToEntity = false;
    } else if (!this.addSeedToEntity) {
      this.addSeedToEntity = true;
    }
  }

  onToggleCreateEntitySeed() {
    this.addSeedToEntity = false;
    if (this.createNewEntitySeed) {
      this.createNewEntitySeed = false;
    } else if (!this.createNewEntitySeed) {
      this.createNewEntitySeed = true;
    }
  }
}
