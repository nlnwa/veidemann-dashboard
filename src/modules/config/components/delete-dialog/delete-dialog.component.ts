import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';
import {ConfigObject, Kind} from '../../../../shared/models/config';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: 'delete-dialog.component.html'
})
export class DeleteDialogComponent {
  readonly Kind = Kind;
  @Output()
  delete = new EventEmitter();

  configObject: ConfigObject;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.configObject = data.configObject;
  }

  get roleMapping(): string {
    if (this.configObject.roleMapping.group) {
      return this.configObject.roleMapping.group;
    } else {
      return this.configObject.roleMapping.email;
    }
  }
}
