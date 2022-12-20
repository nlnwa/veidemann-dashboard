import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth';
import {ConfigObject} from '../../../../../shared/models';
import {SeedDetailsComponent} from '..';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import {ConfigDialogData} from '../../../func';

@Component({
  selector: 'app-entity-dialog',
  templateUrl: './seed-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeedDialogComponent extends SeedDetailsComponent implements OnInit {
  crawlJobs: ConfigObject[];

  constructor(protected fb: UntypedFormBuilder,
              protected authService: AuthService,
              @Inject(MAT_DIALOG_DATA) private data: ConfigDialogData,
              public dialogRef: MatDialogRef<SeedDialogComponent>) {
    super(fb, authService);
    this.createForm();
    this.crawlJobs = data.options.crawlJobs;
    this.configObject = data.configObject;
  }

  ngOnInit(): void {
    this.updateForm();
  }

  onDialogClose(): ConfigObject | ConfigObject[] {
    return this.isMultipleSeed()
      ? this.prepareSaveMultiple()
      : this.prepareSave();
  }
}
