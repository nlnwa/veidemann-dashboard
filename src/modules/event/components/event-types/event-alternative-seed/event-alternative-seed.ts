import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ConfigObject, EventObject} from '../../../../../shared/models';
import {ConfigService} from '../../../../commons/services';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-event-alternative-seed',
  templateUrl: './event-alternative-seed.html',
  styleUrls: ['./event-alternative-seed.css']
})

export class EventAlternativeSeedComponent implements OnInit, OnDestroy {

  @Input() eventObject: EventObject;
  @Input() configObject: ConfigObject;

  private ngUnsubscribe = new Subject();

  constructor(protected configService: ConfigService) {
  }

  get seedId(): string {
    return this.eventObject.dataList.find(data => data.key === 'SeedId').value;
  }

  get eventAltSeed(): string {
    return this.eventObject.dataList.find(data => data.key === 'Alternative Url').value;
  }

  get discoveryPath(): string {
    return this.eventObject.dataList.find(data => data.key === 'Discovery path').value;
  }

  get seedAltSeedAnnotation() {
    return this.configObject.meta.annotationList.find(({key}) => key === 'scope_altSeed');
  }

  annotationExistsInList() {
    const eventAltSeed = this.eventAltSeed;
    const seedAltSeedAnnotations = this.seedAltSeedAnnotation !== undefined
      ? this.seedAltSeedAnnotation.value.split(' ') : [''];
    return seedAltSeedAnnotations.find(url => eventAltSeed === url) !== undefined ? true : false;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
