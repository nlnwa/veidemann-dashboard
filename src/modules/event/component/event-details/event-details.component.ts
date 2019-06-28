import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../../core/services';
import {Data, EventObject, Severity, State} from '../../../commons/models/event/event.model';
import {ConfigObject, Label} from '../../../commons/models';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsComponent implements OnChanges, OnInit {
  readonly Severity = Severity;

  @Input()
  eventObject: EventObject;

  @Input()
  assigneeList: string[];

  @Output()
  update = new EventEmitter<any>();

  @Output()
  delete = new EventEmitter<EventObject>();

  form: FormGroup;
  showInfo = false;
  severities: Severity[] = [];
  shouldAddLabel = undefined;


  constructor(protected fb: FormBuilder,
              protected authService: AuthService) {
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

  get activityList(): AbstractControl {
    return this.form.get('activityList');
  }

  get assignee(): AbstractControl {
    return this.form.get('assignee');
  }

  get severity(): AbstractControl {
    return this.form.get('severity');
  }

  get state(): AbstractControl {
    return this.form.get('state');
  }

  get dataList(): AbstractControl {
    return this.form.get('dataList');
  }

  get comment(): AbstractControl {
    return this.form.get('comment');
  }

  get labelList(): AbstractControl {
    return this.form.get('labelList');
  }

  get type(): AbstractControl {
    return this.form.get('type');
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

  getType(): string {
    return this.eventObject ? this.eventObject.type : '';
  }

  getState(): string {
    return this.eventObject ? State[this.eventObject.state] : '';
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

  onAssignToCurrentUser() {
    this.assignee.setValue(this.authService.email);
    this.form.get('assignee').markAsDirty();
  }

  onShowInfoToggle() {
    this.showInfo = !this.showInfo;
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

    this.dataList.setValue([...this.dataList.value, seedData, entityData]);
    this.dataList.markAsDirty();
  }

  protected createForm() {
    this.form = this.fb.group({
      id: '',
      type: {value: '', disabled: true},
      source: {value: '', disabled: true},
      state: '',
      assignee: '',
      activityList: [],
      dataList: [],
      severity: '',
      labelList: [],
      comment: ''
    });
  }

  protected updateForm() {
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
      labelList: this.eventObject.labelList.map(label => {
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

    if (this.assignee.value === '') {
      updateTemplate.assignee = this.authService.email;
      paths.push('assignee');
    } else if (formModel.assignee !== this.eventObject.assignee) {
      updateTemplate.assignee = formModel.assignee;
      paths.push('assignee');
    }

    if (this.dataList.dirty) {
      updateTemplate.dataList = formModel.dataList;
      paths.push('data+');
    }

    if (formModel.state === State[State.NEW] || formModel.state === State[State.OPEN]) {
      if (formModel.dataList.findIndex(data => data.key === 'seed') !== -1
        && formModel.dataList.findIndex(data => data.key === 'entity') !== -1) {
        updateTemplate.state = State.CLOSED;
      } else if (formModel.state === State[State.NEW]) {
        updateTemplate.state = State.OPEN;
      }
      paths.push('state');
    }

    if (formModel.severity !== this.eventObject.severity) {
      updateTemplate.severity = formModel.severity;
      paths.push('severity');
    }

    if (this.labelList.value.length && this.shouldAddLabel !== undefined) {
      updateTemplate.labelList = formModel.labelList.map(label => label.key + ':' + label.value);
      if (this.shouldAddLabel) {
        paths.push('label+');
      } else {
        paths.push('label-');
      }
    }

    if (formModel.comment) {
      comment = formModel.comment;
    }

    const id = [formModel.id];

    return {updateTemplate, paths, id, comment};
  }

}
