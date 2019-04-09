import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EventObject, Label} from '../../../commons/models';
import {AuthService} from '../../../core/services/auth';
import {Severity, State} from '../../../commons/models/event/event.model';

@Component({
  selector: 'app-event-details-multi',
  templateUrl: './event-details-multi.component.html',
  styleUrls: ['./event-details-multi.component.css']
})
export class EventDetailsMultiComponent implements OnInit, OnChanges {
  readonly Severity = Severity;

  @Input()
  eventObject: EventObject;

  @Input()
  assigneeList: [];

  @Output()
  update = new EventEmitter<EventObject>();

  @Output()
  delete = new EventEmitter<EventObject>();

  form: FormGroup;
  shouldAddLabel = undefined;
  severities: Severity[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm();
  }

  get canEdit() {
    return this.authService.isAdmin() || this.authService.isCurator();
  }

  get canUpdate(): boolean {
    return this.form.valid && (
      this.form.dirty
      || (this.shouldAddLabel !== undefined && this.labelList.value.length)
    );
  }

  get canRevert(): boolean {
    return this.form.dirty
      || (this.shouldAddLabel !== undefined);
  }

  get labelList() {
    return this.form.get('labelList');
  }

  get assignee() {
    return this.form.get('assignee');
  }

  get severity() {
    return this.form.get('severity');
  }

  get comment() {
    return this.form.get('comment');
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
        this.updateForm();
      }
    }
  }

  onToggleShouldAddLabels(value: boolean) {
    this.shouldAddLabel = value;
    if (value !== undefined) {
      this.labelList.enable();
    }
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

  private createForm() {
    this.form = this.fb.group({
      assignee: '',
      severity: '',
      labelList: '',
      comment: ''
    });
  }

  updateForm() {
    this.form.setValue({
      assignee: this.eventObject.assignee,
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
      updateTemplate.state = State.OPEN;
      paths.push('assignee', 'state');
    }

    if (this.severity.dirty) {
      updateTemplate.severity = formModel.severity;
      paths.push('severity');
    }

    if (this.comment.dirty) {
      comment = formModel.comment;
    }

    if (this.labelList.value.length && this.shouldAddLabel !== undefined) {
      updateTemplate.labelList = formModel.labelList.map(label => label.key + ':' + label.value);
      if (this.shouldAddLabel) {
        paths.push('label+');
      } else {
        paths.push('label-');
      }
    }
    return {updateTemplate, paths, comment};
  }


  assignToCurrentUser() {
    this.form.patchValue({
      assignee: this.authService.email
    });
    this.assignee.markAsDirty();
  }

}
