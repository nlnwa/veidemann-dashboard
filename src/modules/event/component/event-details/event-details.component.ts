import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService, RoleService} from '../../../core/services';
import {EventObject, Severity} from '../../../commons/models/event/event.model';

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

  form: FormGroup;
  showInfo = false;
  severities: Severity[] = [];


  constructor(private fb: FormBuilder, private roleService: RoleService, private authService: AuthService) {
    this.createForm();
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
      labelList: []
    });
  }

  updateForm() {
    this.form.patchValue({
      id: this.eventObject.id,
      type: this.eventObject.type,
      source: this.eventObject.source,
      state: this.eventObject.state,
      assignee: this.eventObject.assignee,
      activityList: this.eventObject.activityList || [],
      dataList: this.eventObject.dataList || [],
      severity: this.eventObject.severity,
      labelList: this.eventObject.labelList || []
    });
    this.form.markAsPristine();
    this.form.markAsUntouched();
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
