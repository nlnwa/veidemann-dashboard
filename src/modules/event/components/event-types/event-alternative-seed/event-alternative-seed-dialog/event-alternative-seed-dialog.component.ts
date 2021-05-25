import {Component, Inject, OnInit} from '@angular/core';
import {EventAlternativeSeedComponent} from '../event-alternative-seed';
import {ConfigService} from '../../../../../commons/services';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EventDialogData} from '../../../event-dialog/event-dialog.component';
import {Annotation} from '../../../../../../shared/models';

@Component({
  selector: 'app-event-alternative-seed-dialog',
  templateUrl: './event-alternative-seed-dialog.component.html',
  styleUrls: ['./event-alternative-seed-dialog.component.css']
})
export class EventAlternativeSeedDialogComponent extends EventAlternativeSeedComponent implements OnInit {

  constructor(protected configService: ConfigService,
              @Inject(MAT_DIALOG_DATA) public data: EventDialogData,
              public dialogRef: MatDialogRef<EventAlternativeSeedDialogComponent>) {
    super(configService);
    this.eventObject = this.data.eventObject;
    // this.configObject = this.data.configObject;

  }

  ngOnInit(): void {
    console.log('seedId: ', this.seedId);
  }

  get altSeedAnnotation(): string {
    return this.SeedAnnotations.find(data => data.key === 'scope_altSeed').value;
  }

  onAddAnnotation(closeEvent: boolean): any {
    return {closeEvent};
  }

}
