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

  // get eventAltSeed() {
  //   return this.eventObject.dataList.find(({key}) => key === 'Alternative Url');
  // }

  // get seedAltSeedAnnotation() {
  //   return this.configObject.meta.annotationList.find(({key}) => key === 'scope_altSeed');
  // }

  // get seedAnnotations() {
  //   return this.configObject.meta.annotationList;
  // }

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

  // existsInSeedAnnotationList() {
  //   const seedAltSeedAnnotation = this.seedAltSeedAnnotation !== undefined
  //     ? this.seedAltSeedAnnotation.value.split(' ') : [''];
  //   const eventAltSeed = this.eventAltSeed;
  //   return seedAltSeedAnnotation.find(url => eventAltSeed === url) !== undefined ? true : false;
  // }

  onAdd(closeEvent: boolean): any {
    const annotation = this.getAltSeedAnnotationChange();
    const id = this.configObject.id;
    this.dialogRef.close({closeEvent, annotation, id});
  }

  onCloseEvent() {
    this.dialogRef.close({closeEvent: true});
  }

}
