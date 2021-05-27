import {Component, Inject, OnInit} from '@angular/core';
import {EventAlternativeSeedComponent} from '../event-alternative-seed';
import {ConfigService} from '../../../../../commons/services';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EventDialogData} from '../../../event-dialog/event-dialog.component';
import {Annotation, ConfigObject} from '../../../../../../shared/models';

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
  }

  ngOnInit(): void {
    console.log('seedId: ', this.seedId);
  }

  get altSeedAnnotation(): string {
    return this.SeedAnnotations.find(data => data.key === 'scope_altSeed').value;
  }

  existingAltSeedAnnotation(configObject: ConfigObject): any {
    return configObject.meta.annotationList.find(
      ({key}) => key === 'scope_altSeed');
  }

  onAddAnnotation(closeEvent: boolean): any {
    return {closeEvent};
  }

}
