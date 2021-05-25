import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Annotation, ConfigObject, EventObject} from '../../../../../shared/models';
import {ConfigService} from '../../../../commons/services';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-event-alternative-seed',
  templateUrl: './event-alternative-seed.html',
  styleUrls: ['./event-alternative-seed.css']
})

export class EventAlternativeSeedComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  constructor(protected configService: ConfigService) {
  }

  @Input() eventObject: EventObject;
  @Input() configObject: ConfigObject;


  get seedId(): string {
    return this.eventObject.dataList.find(data => data.key === 'SeedId').value;
  }

  get alternativeSeed(): string {
    return this.eventObject.dataList.find(data => data.key === 'Alternative Url').value;
  }

  get discoveryPath(): string {
    return this.eventObject.dataList.find(data => data.key === 'Discovery path').value;
  }

  get SeedAnnotations(): Annotation[] {
    return this.configObject.meta.annotationList;
  }

  ngOnInit() {
    console.log('alternativeSeed component onInit configObject: ', this.configObject);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // onAddAlternativeSeed() {
  //   const altSeedAnnotation = new Annotation({key: 'scope_altSeed', value: this.alternativeSeed});
  //   const updateTemplate = new ConfigObject({kind: Kind.SEED});
  //   updateTemplate.meta.annotationList = [altSeedAnnotation];
  //   const pathList = ['meta.annotation+'];
  //
  //   const altSeedAnnotations = this.seed.meta.annotationList.find(annotation => annotation.key === 'scope_altSeed').value;
  //
  //   if (altSeedAnnotations) {
  //     const annotations = altSeedAnnotations.split(' ');
  //     if (annotations.indexOf(this.alternativeSeed) === -1) {
  //       this.configService.updateWithTemplate(updateTemplate, pathList, [this.seedId])
  //         .pipe(takeUntil(this.ngUnsubscribe))
  //         .subscribe(added => {
  //           alert('Annotations added');
  //         });
  //     }
  //   }
  // }

}
