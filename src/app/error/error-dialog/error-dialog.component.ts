import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  template: `<h1 mat-dialog-title>{{title}}</h1>
  <div mat-dialog-content>{{content}}</div>
  <div mat-dialog-actions>
    <button mat-raised-button color="warn" (click)="onOkClick()">Ok</button>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent {
  title: string;
  content: string;

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.error.name || 'Error';
    this.content = data.error.message || data.error.toString();
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
