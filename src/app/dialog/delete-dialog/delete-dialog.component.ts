import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.component.html'
})

export class DeleteDialogComponent implements OnInit {
  @Output()
  delete = new EventEmitter();

  form: FormGroup
  numberOfConfigs: number;


  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.numberOfConfigs = data.numberOfConfigs;
  }


  ngOnInit() {
    this.form = this.fb.group({
      delete_confirmation: 0
    });
  }

  onDelete(): void {
    const confirmationInput =  this.form.get('delete_confirmation').value;
    if (confirmationInput === this.numberOfConfigs) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }

  private prepareSave() {
    return this.form.value.delete_conformation;
  }

}


