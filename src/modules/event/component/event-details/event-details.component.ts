import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../core/services';
import {Data, EventObject, Severity, State} from '../../../commons/models/event/event.model';
import {ConfigObject, Label} from '../../../commons/models';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnChanges, OnInit {
  readonly Severity = Severity;

  @Input()
  eventObject: EventObject;

  @Input()
  assigneeList: string[];

  @Output()
  update = new EventEmitter<EventObject>();

  @Output()
  delete = new EventEmitter<EventObject>();

  form: FormGroup;
  showInfo = false;
  severities: Severity[] = [];
  shouldAddLabel = undefined;


  constructor(private fb: FormBuilder,
              private authService: AuthService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.authService.isAdmin() || this.authService.isCurator();
  }

  get canUpdate(): boolean {
    return this.form.valid && (
      this.form.dirty
    || (this.shouldAddLabel !== undefined && this.labelList.value.length));
  }

  get canRevert(): boolean {
    return this.form.dirty
      || (this.shouldAddLabel !== undefined);
  }

  get activityList() {
    return this.form.get('activityList').value;
  }

  get assignee() {
    return this.form.get('assignee');
  }

  get severity() {
    return this.form.get('severity');
  }

  get state() {
    return this.form.get('state');
  }

  get dataList() {
    return this.form.get('dataList');
  }

  get comment() {
    return this.form.get('comment');
  }

  get labelList(): AbstractControl {
    return this.form.get('labelList');
  }

  ngOnInit() {
    for (const severity in Severity) {
      if (!isNaN(Number(severity))) {
        this.severities.push(Number(severity));
      }
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.eventObject) {
      if (!this.eventObject) {
        this.form.reset();
      } else {
        this.showInfo = false;
        this.updateForm();
      }
    }
  }

  getType() {
    return this.eventObject.type;
  }

  onUpdate() {
    this.update.emit(this.prepareSave());
  }

  onDelete() {
    this.delete.emit(this.eventObject);
  }

  onRevert() {
    this.updateForm();
    this.shouldAddLabel = undefined;
  }

  onToggleShouldAddLabels(value: boolean) {
    this.shouldAddLabel = value;
    if (value !== undefined) {
      this.labelList.enable();
    }
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: ''},
      type: {value: '', disabled: true},
      source: {value: '', disabled: true},
      state: {value: ''},
      assignee: '',
      activityList: '',
      dataList: '',
      severity: '',
      labelList: '',
      comment: ''
    });
  }

  updateForm() {
    this.form.setValue({
      id: this.eventObject.id,
      type: this.eventObject.type,
      source: this.eventObject.source,
      state: State[this.eventObject.state],
      assignee: this.eventObject.assignee,
      activityList: this.eventObject.activityList || [],
      dataList: this.eventObject.dataList || [],
      severity: this.eventObject.severity,
      comment: '',
      labelList: this.eventObject.labelList
        .map(label => {
          const parts = label.split(':', 2);
          const key = parts.shift();
          const value = parts.join(':');
          return new Label({key, value});
        }),
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.labelList.disable();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  protected prepareSave(): any {
    const paths: string[] = [];
    let comment: string;
    const formModel = this.form.value;
    const updateTemplate = new EventObject();

    if (this.assignee.dirty) {
      updateTemplate.assignee = formModel.assignee;
      paths.push('assignee');

      if (formModel.state === State[State.NEW]) {
        updateTemplate.state = State.OPEN;
        paths.push('state');
      }
    }

    if (this.severity.dirty) {
      updateTemplate.severity = formModel.severity;
      paths.push('severity');
    }

    if (this.dataList.dirty) {
      updateTemplate.dataList = this.eventObject.dataList;
      paths.push('data+');
    }

    if (this.state.dirty) {
      updateTemplate.state = formModel.state;
      paths.push('state');
    }

    if (this.labelList.value.length && this.shouldAddLabel !== undefined) {
      updateTemplate.labelList = formModel.labelList.map(label => label.key + ':' + label.value);
      if (this.shouldAddLabel) {
        paths.push('label+');
      } else {
        paths.push('label-');
      }
    }

    if (this.comment.dirty) {
      comment = formModel.comment;
    }


    const id = [formModel.id];

    return {updateTemplate, paths, id, comment};
  }

  assignToCurrentUser() {
    this.form.patchValue({
      assignee: this.authService.email
    });
    this.form.get('assignee').markAsDirty();
  }

  showInfoToggle() {
    if (this.showInfo) {
      this.showInfo = false;
    } else if (!this.showInfo) {
      this.showInfo = true;
    }
  }

  onSeedAssigned(configObject: ConfigObject) {
    const seedData = new Data({
      key: 'seed',
      value: configObject.id
    });
    const entityData = new Data({
      key: 'entity',
      value: configObject.seed.entityRef.id
    });

    this.eventObject.dataList.push(seedData, entityData);
    this.form.get('dataList').markAsDirty();

    this.form.patchValue({
      state: State.CLOSED
    });
    this.form.get('state').markAsDirty();
  }
}
