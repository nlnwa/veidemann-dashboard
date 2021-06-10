import {Component, Inject, OnInit} from '@angular/core';
import {EventAlternativeSeedComponent} from '../event-alternative-seed';
import {ConfigService} from '../../../../../commons/services';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EventDialogData} from '../../../event-dialog/event-dialog.component';
import {Annotation, ConfigObject} from '../../../../../../shared/models';
import {SeedConfigPipe} from '../../../../../config/pipe';

@Component({
  selector: 'app-event-alternative-seed-dialog',
  templateUrl: './event-alternative-seed-dialog.component.html',
  styleUrls: ['./event-alternative-seed-dialog.component.css'],
  providers: [SeedConfigPipe]


})
export class EventAlternativeSeedDialogComponent extends EventAlternativeSeedComponent implements OnInit {
  configObject: ConfigObject;

  constructor(protected configService: ConfigService,
              @Inject(MAT_DIALOG_DATA) public data: EventDialogData,
              public dialogRef: MatDialogRef<EventAlternativeSeedDialogComponent>,
              private seedPipe: SeedConfigPipe) {
    super(configService);
    this.eventObject = this.data.eventObject;
    seedPipe.transform(this.eventObject).subscribe(configObject => {
      this.configObject = configObject;
    });
  }

  ngOnInit(): void {
  }

  getAltSeedAnnotationChange() {
    let annotation: Annotation;
    const altSeedAnnotation = this.seedAltSeedAnnotation !== undefined ? this.seedAltSeedAnnotation.value : undefined;
    const eventAltSeedAnnotation = this.eventAltSeed;

    if (altSeedAnnotation !== undefined) {
      annotation = {
        key: 'scope_altSeed',
        value: altSeedAnnotation + ' ' + eventAltSeedAnnotation
      };
      return annotation;
    } else {
      annotation = {
        key: 'scope_altSeed',
        value: eventAltSeedAnnotation
      };
      return annotation;
    }
  }

  onAdd(closeEvent: boolean): any {
    const annotation = this.getAltSeedAnnotationChange();
    const configObject = this.configObject;

    const index = configObject.meta.annotationList.findIndex((a) => a.key === 'scope_altSeed');
    if (index !== -1) {
      configObject.meta.annotationList[index] = annotation;
    } else {
      configObject.meta.annotationList.push(annotation);
    }

    this.dialogRef.close({closeEvent, configObject});
  }

  onCloseEvent() {
    this.dialogRef.close({closeEvent: true});
  }

}
