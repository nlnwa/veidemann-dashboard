import {Component, Input, OnInit} from '@angular/core';
import {ConfigObject, ConfigRef, EventObject, Kind} from '../../../../shared/models';
import {Severity, State, ChangeType} from 'src/shared/models/event/event.model';
import {ConfigService} from '../../../commons/services';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.css']
})
export class EventPreviewComponent implements OnInit {
  readonly Severity = Severity;
  readonly State = State;
  readonly ChangeType = ChangeType;

  @Input()
  eventObject: EventObject;

  seed: ConfigObject;

  constructor(protected configService: ConfigService) {
  }

  ngOnInit(): void {
    // if (this.eventObject.type === 'Alternative seed') {
    //   console.log('got type alternative seed, should fetch seed');
    //   const seedId = this.eventObject.dataList.find(eventData => eventData.key === 'SeedId').value;
    //   this.configService.get(new ConfigRef({kind: Kind.SEED, id: seedId}))
    //     .subscribe(seedObj => {
    //       console.log('funnet seed i details: ', seedObj);
    //       this.seed = seedObj;
    //       console.log('this.seed: ', this.seed);
    //     });
    // }
  }

  getConfigRef(): ConfigRef {
    const seedId = this.eventObject.dataList.find(eventData => eventData.key === 'SeedId').value;
    return new ConfigRef({kind: Kind.SEED, id: seedId});
  }
}
