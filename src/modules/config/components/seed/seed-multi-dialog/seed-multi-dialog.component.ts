import {Component, Inject, OnInit} from '@angular/core';
import {SeedDetailMultiComponent} from '..';
import {FormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ConfigDialogData} from '../../../func';
import {ConfigObject} from '../../../../../shared/models/config';

@Component({
  selector: 'app-seed-multi-dialog',
  templateUrl: './seed-multi-dialog.component.html',
  styleUrls: ['./seed-multi-dialog.component.css']
})
export class SeedMultiDialogComponent extends SeedDetailMultiComponent implements OnInit {

  constructor(protected fb: FormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: ConfigDialogData,
              public dialogRef: MatDialogRef<SeedMultiDialogComponent>) {
    super(fb, authService);
    this.createForm();
    this.configObject = this.data.configObject;
    this.crawlJobs = this.data.options.crawlJobs;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDialogClose(): { updateTemplate: ConfigObject, pathList: string[] } {
    return this.prepareSave();
  }

}
