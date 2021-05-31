import {Component, Inject, OnInit} from '@angular/core';
import {EventAlternativeSeedComponent} from '../event-alternative-seed';
import {ConfigService} from '../../../../../commons/services';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EventDialogData} from '../../../event-dialog/event-dialog.component';
import {Annotation, ConfigObject} from '../../../../../../shared/models';
import {SeedConfigPipe} from '../../../../../config/pipe';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-event-alternative-seed-dialog',
  templateUrl: './event-alternative-seed-dialog.component.html',
  styleUrls: ['./event-alternative-seed-dialog.component.css'],
  providers: [SeedConfigPipe]


})
export class EventAlternativeSeedDialogComponent extends EventAlternativeSeedComponent implements OnInit {
  configObject$: BehaviorSubject<ConfigObject>;
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
    console.log('this.eventObject: ', this.eventObject);
  }

  get eventAltSeed() {
    return this.eventObject.dataList.find(({key}) => key === 'Alternative Url');
  }

  get existingAltSeedAnnotation() {
    return this.configObject.meta.annotationList.find(
      ({key}) => key === 'scope_altSeed');
  }

  get annotationInList() {
    const eventAnnotation = this.eventAltSeed.value;
    const seedAnnotations = this.existingAltSeedAnnotation.value.split(' ');
    if (seedAnnotations !== undefined) {
      return seedAnnotations.find(value => eventAnnotation === value);
    } else {
      return true;
    }
  }

  getAltSeedAnnotationChange() {
    let annotation: Annotation;
    const altSeedAnnotation = this.existingAltSeedAnnotation;
    const eventAltSeedAnnotation = this.eventAltSeed;

    if (altSeedAnnotation) {
      annotation = {
        key: 'scope_altSeed',
        value: altSeedAnnotation + ' ' + eventAltSeedAnnotation.value
      };
      return annotation;
    } else {
      annotation = {
        key: 'scope_altSeed',
        value: eventAltSeedAnnotation.value
      };
      return annotation;
    }
  }

  onAdd(closeEvent: boolean): any {
    const annotation = this.getAltSeedAnnotationChange();
    this.dialogRef.close({closeEvent, annotation});
  }

  onCloseEvent() {
    this.dialogRef.close({closeEvent: true});
  }

}
