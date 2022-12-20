import {Component, Inject} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';

export interface DeleteDialogData {
  numberOfConfigs: number;
}

@Component({
  selector: 'app-delete-multi-dialog',
  styleUrls: ['delete-multi-dialog.component.scss'],
  templateUrl: 'delete-multi-dialog.component.html'
})
export class DeleteMultiDialogComponent {

  numberOfConfigs: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) {
  }
}
