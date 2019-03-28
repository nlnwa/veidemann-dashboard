import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EventObject} from '../../../commons/models';
import {AuthService} from '../../../core/services/auth';

@Component({
  selector: 'app-event-multi-update',
  templateUrl: './event-multi-update.component.html',
  styleUrls: ['./event-multi-update.component.css']
})
export class EventMultiUpdateComponent implements OnInit {

  @Input()
    eventObjects: EventObject[];

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm();
  }

  ngOnInit() {
  }


  assignToCurrentUser() {
    this.form.patchValue({
      assignee: this.authService.name
    });
  }

  private createForm() {
    this.form = this.fb.group({
      assignee: '',
      labelList: []
    });
  }
}
