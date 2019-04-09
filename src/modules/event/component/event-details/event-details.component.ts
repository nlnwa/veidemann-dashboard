import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService, RoleService} from '../../../core/services';
import {EventObject, Severity} from '../../../commons/models/event/event.model';
import {ConfigObject, Label} from '../../../commons/models';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnChanges, OnInit {

  @Input()
  eventObject: EventObject;

  @Output()
  update = new EventEmitter<EventObject>();

  @Output()
    delete = new EventEmitter<EventObject>();

  form: FormGroup;
  showInfo = false;
  severities: Severity[] = [];


  constructor(private fb: FormBuilder, private roleService: RoleService, private authService: AuthService) {
    this.createForm();
  }

  get canEdit(): boolean {
    return this.roleService.isAdmin() || this.roleService.isCurator();
  }

  get canUpdate(): boolean {
    return (this.form.valid && this.form.dirty);
  }

  get canRevert(): boolean {
    return this.form.dirty;
  }

  get activityList() {
    return this.form.get('activityList').value;
  }

  get assignee() {
    return this.form.get('assignee');
  }

  ngOnInit() {
    for (const severity in Severity) {
      if (isNaN(Number(severity))) {
        this.severities.push(severity as any as Severity);
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

  onrevert() {
    this.updateForm();
  }

  private createForm() {
    this.form = this.fb.group({
      id: {value: '', disabled: true},
      type: {value: '', disabled: true},
      source: {value: '', disabled: true},
      state: {value: '', disabled: true},
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
      state: this.eventObject.state,
      assignee: this.eventObject.assignee,
      activityList: this.eventObject.activityList || [],
      dataList: this.eventObject.dataList || [],
      severity: this.eventObject.severity,
      // labelList: this.eventObject.labelList
      //   .map(selector => {
      //   const parts = selector.split(':', 2);
      //   const key = parts.shift();
      //   const value = parts.join(':');
      //   return new Label({key, value});
      // }),
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  prepareSave(): EventObject {
    const formModel = this.form.value;
    const eventObject = new EventObject();

    eventObject.id = this.eventObject.id;
    eventObject.assignee = formModel.assignee;
    eventObject.labelList = formModel.labelList.map(label => label.key + ':' + label.value);
    eventObject.severity = formModel.severity;

    return eventObject;
  }

  assignToCurrentUser() {
    this.form.patchValue({
      assignee: this.authService.name
    });
  }

  showInfoToggle() {
    if (this.showInfo) {
      this.showInfo = false;
    } else if (!this.showInfo) {
      this.showInfo = true;
    }
  }
}
