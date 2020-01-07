import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ConfigObject, Label} from '../../../../commons/models';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EntityViewComponent {

  @Input()
  configObject: ConfigObject;

  constructor() {
  }

  get id(): string {
    return this.configObject.id;
  }

  get labels(): Label[] {
    return this.configObject.meta.labelList;
  }

  get name(): string {
    return this.configObject.meta.name;
  }

  get description(): string {
    return this.configObject.meta.description;
  }
}
