import {Component, EventEmitter, Inject, Output} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: 'delete-dialog.component.html'
})
export class DeleteDialogComponent {
  @Output()
  delete = new EventEmitter();

  form: FormGroup;
  numberOfConfigs: number;


  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.numberOfConfigs = data.numberOfConfigs;
    this.form = this.fb.group({
      count: ''
    });
  }

  onDelete(): void {
    const confirmationInput = this.form.get('count').value;
    this.dialogRef.close(confirmationInput === this.numberOfConfigs);
  }
}
