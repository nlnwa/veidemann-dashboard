import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfigObject, Kind} from '../../../commons/models';
import {ConfigOptions} from '../../containers';

@Component({
  selector: 'app-detail-multi',
  templateUrl: './detail-multi.component.html',
  styleUrls: ['./detail-multi.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailMultiComponent {
  readonly Kind = Kind;

  @Input()
  configObject: ConfigObject;

  @Input()
  options: ConfigOptions;

  @Output()
  update: EventEmitter<{ updateTemplate: ConfigObject, pathList: string[] }>;

  constructor() {
    this.update = new EventEmitter();
  }

  onUpdateConfig(event) {
    this.update.emit(event);
  }
}
