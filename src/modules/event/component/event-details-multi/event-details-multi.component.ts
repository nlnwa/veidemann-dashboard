import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {EventObject, Label} from '../../../commons/models';
import {AuthService} from '../../../core/services/auth';
import {State} from '../../../commons/models/event/event.model';
import {EventDetailsComponent} from '../event-details/event-details.component';

@Component({
  selector: 'app-event-details-multi',
  templateUrl: './event-details-multi.component.html',
  styleUrls: ['./event-details-multi.component.css']
})
export class EventDetailsMultiComponent extends EventDetailsComponent {

  constructor(protected fb: FormBuilder, protected authService: AuthService) {
    super(fb, authService);
  }

  protected createForm() {
    this.form = this.fb.group({
      assignee: '',
      severity: '',
      labelList: [],
      comment: ''
    });
  }

  protected updateForm() {
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

}
